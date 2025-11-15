// payments.ts
const PAYMENT_DATA_SUBMISSION_URL = process.env.NEXT_PUBLIC_VIATOR_PAYMENT_DATA_SUBMISSION_URL;
const API_KEY = process.env.API_KEY_VIATOR;

if (!PAYMENT_DATA_SUBMISSION_URL || !API_KEY) {
  throw new Error('Missing Viator payment data submission URL or API key in environment variables.');
}

type HeadersInit = HeadersInit & { 'X-API-Key': string };

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};

/**
 * POST Payment Card Tokenization
 * Submits payment card data for tokenization.
 */
export async function tokenizePaymentCard(body: any) {
  const res = await fetch(PAYMENT_DATA_SUBMISSION_URL, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}