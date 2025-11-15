// v1-endpoints.ts
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
 * POST /v1/taxonomy/attractions
 * Gets taxonomy attractions.
 */
export async function getTaxonomyAttractions(body: any) {
  const res = await fetch(`${API_BASE_URL}/v1/taxonomy/attractions`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * GET /v1/taxonomy/destinations
 * Gets taxonomy destinations.
 */
export async function getTaxonomyDestinations() {
  const res = await fetch(`${API_BASE_URL}/v1/taxonomy/destinations`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * GET /v1/product/photos
 * Gets product photos.
 * @param params Query parameters: code (string), showUnavailable (boolean), topX (string)
 */
export async function getProductPhotos(params: { code: string; showUnavailable?: boolean; topX?: string }) {
  const url = new URL(`${API_BASE_URL}/v1/product/photos`);
  url.searchParams.append('code', params.code);
  if (params.showUnavailable !== undefined) url.searchParams.append('showUnavailable', String(params.showUnavailable));
  if (params.topX) url.searchParams.append('topX', params.topX);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * POST /v1/search/attractions
 * Searches for attractions.
 */
export async function searchAttractions(body: any) {
  const res = await fetch(`${API_BASE_URL}/v1/search/attractions`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * GET /v1/attraction
 * Gets attraction details.
 * @param seoId The SEO ID of the attraction.
 */
export async function getAttraction(seoId: string) {
  const url = new URL(`${API_BASE_URL}/v1/attraction`);
  url.searchParams.append('seoId', seoId);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * GET /v1/attraction/products
 * Gets products for an attraction.
 * @param params Query parameters: seoId (string), topX (string), sortOrder (string)
 */
export async function getAttractionProducts(params: { seoId: string; topX?: string; sortOrder?: string }) {
  const url = new URL(`${API_BASE_URL}/v1/attraction/products`);
  url.searchParams.append('seoId', params.seoId);
  if (params.topX) url.searchParams.append('topX', params.topX);
  if (params.sortOrder) url.searchParams.append('sortOrder', params.sortOrder);
  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}

/**
 * GET /v1/support/customercare
 * Gets customer care support information.
 */
export async function getCustomerCareSupport() {
  const res = await fetch(`${API_BASE_URL}/v1/support/customercare`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  return res.json();
}