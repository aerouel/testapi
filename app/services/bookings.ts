const API_BASE_URL = process.env.BASE_URL_VIATOR;
const API_KEY = process.env.API_KEY_VIATOR;

if (!API_BASE_URL || !API_KEY) {
  throw new Error('Missing Viator API base URL or API key in environment variables.');
}

// FIX: rename type to avoid circular reference
type ViatorHeaders = HeadersInit & { 'X-API-Key': string };

const defaultHeaders: ViatorHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};

/**
 * POST /bookings/cart/hold
 */
export async function holdBookingCart(body: any) {
  const res = await fetch(`${API_BASE_URL}/bookings/cart/hold`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /bookings/cart/book
 */
export async function bookBookingCart(body: any) {
  const res = await fetch(`${API_BASE_URL}/bookings/cart/book`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /bookings/status
 */
export async function getBookingsStatus(body: any) {
  const res = await fetch(`${API_BASE_URL}/bookings/status`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * GET /bookings/cancel-reasons
 */
export async function getBookingCancelReasons() {
  const res = await fetch(`${API_BASE_URL}/bookings/cancel-reasons`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * GET /bookings/{booking-reference}/cancel-quote
 */
export async function getBookingCancelQuote(bookingReference: string) {
  const res = await fetch(
    `${API_BASE_URL}/bookings/${encodeURIComponent(bookingReference)}/cancel-quote`,
    {
      method: 'GET',
      headers: defaultHeaders,
    }
  );
  return res.json();
}

/**
 * POST /bookings/{booking-reference}/cancel
 */
export async function cancelBooking(bookingReference: string, body: any) {
  const res = await fetch(
    `${API_BASE_URL}/bookings/${encodeURIComponent(bookingReference)}/cancel`,
    {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

/**
 * GET /bookings/modified-since
 */
export async function getBookingsModifiedSince(
  count: number = 50,
  modifiedSince?: string
) {
  const url = new URL(`${API_BASE_URL}/bookings/modified-since`);
  url.searchParams.append('count', count.toString());
  if (modifiedSince) {
    url.searchParams.append('modified-since', modifiedSince);
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });

  return res.json();
}

/**
 * POST /bookings/modified-since/acknowledge
 */
export async function acknowledgeBookingsModifiedSince(body: any) {
  const res = await fetch(
    `${API_BASE_URL}/bookings/modified-since/acknowledge`,
    {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    }
  );
  return res.json();
}
