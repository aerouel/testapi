// availability.ts
const API_BASE_URL = process.env.BASE_URL_VIATOR;
const API_KEY = process.env.API_KEY_VIATOR;

if (!API_BASE_URL || !API_KEY) {
  throw new Error('Missing Viator API base URL or API key in environment variables.');
}

type HeadersInit = HeadersInit & { 'X-API-Key': string };

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};

/**
 * POST /availability/check
 * Checks availability for a product.
 */
export async function checkAvailability(body: any) {
  const res = await fetch(`${API_BASE_URL}/availability/check`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * GET /availability/schedules/{product-code}
 * Gets the availability schedule for a specific product.
 */
export async function getAvailabilitySchedule(productCode: string) {
  const res = await fetch(`${API_BASE_URL}/availability/schedules/${encodeURIComponent(productCode)}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * POST /availability/schedules/bulk
 * Gets bulk availability schedules.
 */
export async function getBulkAvailabilitySchedules(body: any) {
  const res = await fetch(`${API_BASE_URL}/availability/schedules/bulk`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * GET /availability/schedules/modified-since
 * Gets availability schedules modified since a certain time.
 */
export async function getModifiedAvailabilitySchedules(params?: { count?: number; modifiedSince?: string }) {
  const url = new URL(`${API_BASE_URL}/availability/schedules/modified-since`);
  if (params?.count) url.searchParams.append('count', params.count.toString());
  if (params?.modifiedSince) url.searchParams.append('modified-since', params.modifiedSince);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}