const API_BASE_URL = process.env.BASE_URL_VIATOR;
const API_KEY = process.env.API_KEY_VIATOR;

if (!API_BASE_URL || !API_KEY) {
  throw new Error('Missing Viator API base URL or API key in environment variables.');
}

// FIX: rename type to avoid conflict
type ViatorHeaders = HeadersInit & { 'X-API-Key': string };

const defaultHeaders: ViatorHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};

/**
 * POST /availability/check
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
 */
export async function getAvailabilitySchedule(productCode: string) {
  const res = await fetch(
    `${API_BASE_URL}/availability/schedules/${encodeURIComponent(productCode)}`,
    {
      method: 'GET',
      headers: defaultHeaders,
    }
  );
  return res.json();
}

/**
 * POST /availability/schedules/bulk
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
 */
export async function getModifiedAvailabilitySchedules(
  params?: { count?: number; modifiedSince?: string }
) {
  const url = new URL(
    `${API_BASE_URL}/availability/schedules/modified-since`
  );

  if (params?.count) url.searchParams.append('count', params.count.toString());
  if (params?.modifiedSince)
    url.searchParams.append('modified-since', params.modifiedSince);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });

  return res.json();
}
