
/*const PAYMENT_DATA_SUBMISSION_URL = process.env.VIATOR_PAYMENT_DATA_SUBMISSION_URL;
const API_KEY = process.env.API_KEY_VIATOR;

if (!PAYMENT_DATA_SUBMISSION_URL || !API_KEY) {
  throw new Error('Missing Viator payment data submission URL or API key in environment variables.');
}

type CustomHeaders = HeadersInit & { 'X-API-Key': string };

const defaultHeaders: CustomHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-API-Key': API_KEY,
};


export async function tokenizePaymentCard(body: any) {
  const res = await fetch(PAYMENT_DATA_SUBMISSION_URL, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Viator Tokenization Error: ${res.status} - ${error}`);
  }

  return res.json();
}*/
