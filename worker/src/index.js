const DAY = 86400000;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function dateOnly(value) {
  return typeof value === "string" ? value.slice(0, 10) : "";
}

function formatDateRange(checkIn, checkOut) {
  if (!checkIn || !checkOut) return "Dates to be confirmed";
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${formatter.format(new Date(`${checkIn}T00:00:00Z`))} → ${formatter.format(new Date(`${checkOut}T00:00:00Z`))}`;
}

function partySummary(guests = {}) {
  const pieces = [];
  if (guests.adult_count) pieces.push(`${guests.adult_count} adult${guests.adult_count === 1 ? "" : "s"}`);
  if (guests.child_count) pieces.push(`${guests.child_count} child${guests.child_count === 1 ? "" : "ren"}`);
  if (guests.infant_count) pieces.push(`${guests.infant_count} infant${guests.infant_count === 1 ? "" : "s"}`);
  if (guests.pet_count) pieces.push(`${guests.pet_count} pet${guests.pet_count === 1 ? "" : "s"}`);
  return pieces.join(" · ") || "Guest details to be confirmed";
}

function emptyWorkflow() {
  return { done: [false, false, false, false, false, false], priming: [false, false, false, false], reviews: [false, false, false] };
}

function reservationFromHospitable(data, previous = {}) {
  const checkIn = dateOnly(data.check_in || data.arrival_date);
  const checkOut = dateOnly(data.check_out || data.departure_date);
  const nights = Number(data.nights) || 0;
  const workflow = emptyWorkflow();
  return {
    id: data.id || data.code,
    guest: data.guest?.first_name || "Guest",
    channel: data.platform || "Stay",
    checkIn,
    checkOut,
    dates: formatDateRange(checkIn, checkOut),
    nights: `${nights} night${nights === 1 ? "" : "s"}`,
    party: partySummary(data.guests),
    occasion: previous.occasion || "Stay details",
    mentioned: Array.isArray(previous.mentioned) ? previous.mentioned : [],
    prepItems: previous.prepItems || "",
    personalTouches: previous.personalTouches || "",
    done: Array.isArray(previous.done) ? previous.done : workflow.done,
    priming: Array.isArray(previous.priming) ? previous.priming : workflow.priming,
    reviews: Array.isArray(previous.reviews) ? previous.reviews : workflow.reviews,
  };
}

function allowedProperty(data, env) {
  if (!env.HOSPITABLE_PROPERTY_ID) return true;
  const ids = [data.property?.id, ...(data.properties || []).map((property) => property?.id)].filter(Boolean);
  return ids.includes(env.HOSPITABLE_PROPERTY_ID);
}

function isAuthorized(request, env) {
  return request.headers.get("Authorization") === `Bearer ${env.DASHBOARD_ACCESS_TOKEN}`;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function listValues(kv, prefix) {
  const listed = await kv.list({ prefix });
  return Promise.all(listed.keys.map((key) => kv.get(key.name, { type: "json" })));
}

function bookedNightsNextThirtyDays(stays) {
  const today = new Date();
  const start = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const end = start + (30 * DAY);
  const booked = stays.reduce((total, stay) => {
    const checkIn = Date.parse(`${stay.checkIn}T00:00:00Z`);
    const checkOut = Date.parse(`${stay.checkOut}T00:00:00Z`);
    if (!Number.isFinite(checkIn) || !Number.isFinite(checkOut)) return total;
    return total + Math.max(0, Math.min(checkOut, end) - Math.max(checkIn, start)) / DAY;
  }, 0);
  return Math.round((booked / 30) * 100);
}

function futureIso(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function priceLabsConfig(env) {
  const saved = await env.MISSION_CONTROL.get("settings:pricelabs", { type: "json" });
  if (!saved?.listingId || !saved?.pms) return null;
  return saved;
}

async function priceLabsListings(env) {
  if (!env.PRICELABS_API_KEY) return { error: "Add PRICELABS_API_KEY as a Cloudflare Secret first." };
  const response = await fetch("https://api.pricelabs.co/v1/listings", {
    headers: { "X-API-Key": env.PRICELABS_API_KEY },
  });
  if (!response.ok) return { error: "PriceLabs did not accept this private connection. Check the key in Cloudflare, then try again." };
  const body = await response.json();
  const items = Array.isArray(body) ? body : (body.listings || body.data || []);
  const listings = items.map((item) => ({
    id: String(item?.id || item?.listing_id || "").slice(0, 120),
    pms: String(item?.pms || "").slice(0, 120),
    name: String(item?.name || item?.listing_name || "Unnamed PriceLabs listing").slice(0, 160),
  })).filter((item) => item.id && item.pms);
  return { listings };
}

async function priceLabsMetrics(env) {
  if (!env.PRICELABS_API_KEY) {
    return { rate: "—", market: "—", rateCopy: "Add PriceLabs later (optional)", marketCopy: "no PriceLabs market context" };
  }
  const settings = await priceLabsConfig(env);
  if (!settings) return { rate: "—", market: "—", rateCopy: "Choose your PriceLabs listing below", marketCopy: "no PriceLabs market context" };

  const cached = await env.MISSION_CONTROL.get("pricelabs:summary", { type: "json" });
  if (cached?.savedAt && Date.now() - cached.savedAt < 23 * 60 * 60 * 1000) return cached.value;

  const response = await fetch("https://api.pricelabs.co/v1/listing_prices", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": env.PRICELABS_API_KEY },
    body: JSON.stringify({ listings: [{ id: settings.listingId, pms: settings.pms, dateFrom: futureIso(0), dateTo: futureIso(30) }] }),
  });
  if (!response.ok) return { rate: "—", market: "—", rateCopy: "PriceLabs connection needs attention", marketCopy: "check the private Worker logs" };

  const listing = (await response.json())[0];
  const prices = (listing?.data || []).map((entry) => Number(entry.price)).filter(Number.isFinite);
  const average = prices.length ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : null;
  const market = listing?.data?.find((entry) => entry?.reason?.listing_info?.nhood_occ)?.reason?.listing_info?.nhood_occ || "—";
  const value = {
    rate: average ? `${listing.currency === "USD" ? "$" : ""}${average}` : "—",
    market: String(market),
    rateCopy: average ? "average PriceLabs rate · next 30 days" : "no PriceLabs rate returned",
    marketCopy: market !== "—" ? "PriceLabs neighborhood context" : "no market context returned",
  };
  await env.MISSION_CONTROL.put("pricelabs:summary", JSON.stringify({ savedAt: Date.now(), value }), { expirationTtl: 86400 });
  return value;
}

async function dashboard(env) {
  const [stays, flags] = await Promise.all([
    listValues(env.MISSION_CONTROL, "reservation:"),
    listValues(env.MISSION_CONTROL, "flag:"),
  ]);
  const activeStays = stays.filter(Boolean).sort((a, b) => String(a.checkIn).localeCompare(String(b.checkIn)));
  const activeFlags = flags.filter(Boolean);
  const pricing = await priceLabsMetrics(env);
  return {
    businessName: env.BUSINESS_NAME || "My Stay Company",
    propertyName: env.PROPERTY_NAME || "My First Property",
    stays: activeStays,
    flags: activeFlags,
    metrics: { occupancy: bookedNightsNextThirtyDays(activeStays), ...pricing },
  };
}

async function saveHospitableEvent(request, env) {
  const url = new URL(request.url);
  if (!env.HOSPITABLE_WEBHOOK_SECRET || url.searchParams.get("key") !== env.HOSPITABLE_WEBHOOK_SECRET) {
    return json({ error: "Webhook key not accepted." }, 401);
  }
  const envelope = await readJson(request);
  if (!envelope?.id || !envelope?.action || !envelope?.data) return json({ error: "Expected a Hospitable webhook JSON body." }, 400);
  const duplicateKey = `event:${envelope.id}`;
  if (await env.MISSION_CONTROL.get(duplicateKey)) return json({ ok: true, duplicate: true });

  if ((envelope.action === "reservation.created" || envelope.action === "reservation.changed") && allowedProperty(envelope.data, env)) {
    const key = `reservation:${envelope.data.id || envelope.data.code}`;
    const previous = await env.MISSION_CONTROL.get(key, { type: "json" });
    await env.MISSION_CONTROL.put(key, JSON.stringify(reservationFromHospitable(envelope.data, previous || {})));
  }

  if (envelope.action === "review.created" && envelope.data?.public?.response == null) {
    const reviewId = envelope.data.id || envelope.id;
    await env.MISSION_CONTROL.put(`flag:review-${reviewId}`, JSON.stringify({
      id: `review-${reviewId}`,
      kind: "warm",
      label: "Review follow-up",
      title: "A guest review needs a response",
      detail: "Open your approved review tool to read and respond. No review text is stored in Mission Control.",
      resolved: false,
    }));
  }

  await env.MISSION_CONTROL.put(duplicateKey, "1", { expirationTtl: 604800 });
  return json({ ok: true });
}

async function saveMutation(request, env) {
  const mutation = await readJson(request);
  if (!mutation?.type) return json({ error: "The dashboard change was incomplete." }, 400);

  if (mutation.type === "workflow" || mutation.type === "note") {
    const key = `reservation:${mutation.stayId}`;
    const stay = await env.MISSION_CONTROL.get(key, { type: "json" });
    if (!stay) return json({ error: "That reservation is not in the private store yet." }, 404);
    if (mutation.type === "workflow") {
      if (!["done", "priming", "reviews"].includes(mutation.field) || !Number.isInteger(mutation.index)) return json({ error: "That workflow change was not valid." }, 400);
      stay[mutation.field][mutation.index] = Boolean(mutation.value);
    } else if (["prepItems", "personalTouches"].includes(mutation.field)) {
      stay[mutation.field] = String(mutation.value || "").slice(0, 500);
    } else return json({ error: "That note field is not available." }, 400);
    await env.MISSION_CONTROL.put(key, JSON.stringify(stay));
  }

  if (mutation.type === "flag-create") {
    const title = String(mutation.flag?.title || "").trim().slice(0, 120);
    if (!title) return json({ error: "A flag needs a short title." }, 400);
    const id = crypto.randomUUID();
    await env.MISSION_CONTROL.put(`flag:${id}`, JSON.stringify({ id, kind: "warm", label: "Manual flag", title, detail: "Private team flag.", resolved: false }));
  }

  if (mutation.type === "flag-resolve") {
    const key = `flag:${mutation.flagId}`;
    const flag = await env.MISSION_CONTROL.get(key, { type: "json" });
    if (flag) await env.MISSION_CONTROL.put(key, JSON.stringify({ ...flag, resolved: true }));
  }

  if (mutation.type === "pricing-listing") {
    const listingId = String(mutation.listingId || "").trim().slice(0, 120);
    const pms = String(mutation.pms || "").trim().slice(0, 120);
    if (!listingId || !pms) return json({ error: "Choose a valid PriceLabs listing first." }, 400);
    await env.MISSION_CONTROL.put("settings:pricelabs", JSON.stringify({ listingId, pms }));
    await env.MISSION_CONTROL.delete("pricelabs:summary");
  }

  return json(await dashboard(env));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") return json({ ok: true, service: "STR Mission Control private Worker" });
    if (request.method === "POST" && url.pathname === "/webhooks/hospitable") return saveHospitableEvent(request, env);

    if (url.pathname.startsWith("/api/")) {
      if (!isAuthorized(request, env)) return json({ error: "Private dashboard access was not accepted." }, 401);
      if (request.method === "GET" && url.pathname === "/api/dashboard") return json(await dashboard(env));
      if (request.method === "GET" && url.pathname === "/api/pricelabs-listings") {
        const result = await priceLabsListings(env);
        return result.error ? json(result, 400) : json(result);
      }
      if (request.method === "POST" && url.pathname === "/api/mutations") return saveMutation(request, env);
      return json({ error: "That private route does not exist." }, 404);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("STR Mission Control Worker is running. Deploy with static assets enabled.", { status: 200 });
  },
};
