// auxiliary.ts
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
 * POST /search/freetext
 * Performs a free-text search.
 */
export async function searchFreetext(body: any) {
  const res = await fetch(`${API_BASE_URL}/search/freetext`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /locations/bulk
 * Gets bulk location information.
 */
export async function getBulkLocations(body: any) {
  const res = await fetch(`${API_BASE_URL}/locations/bulk`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /exchange-rates
 * Gets exchange rates.
 */
export async function getExchangeRates(body: any) {
  const res = await fetch(`${API_BASE_URL}/exchange-rates`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /reviews/product
 * Gets product reviews.
 */
export async function getProductReviews(body: any) {
  const res = await fetch(`${API_BASE_URL}/reviews/product`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

/**
 * POST /suppliers/search/product-codes
 * Searches for supplier product codes.
 */
export async function searchSupplierProductCodes(body: any) {
  const res = await fetch(`${API_BASE_URL}/suppliers/search/product-codes`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}