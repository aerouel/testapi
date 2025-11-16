// products.ts
// Services for Viator Partner API v2 - Products endpoints

const BASE_URL = "https://api.viator.com/partner";
//const API_KEY = "ef944b91-1a6c-449c-8f9b-e5b773e9b4cc";
const API_KEY = "10b85f9e-46eb-4d35-973c-79e4864babeb";

type FetchOptions = {
  method: string;
  headers?: Record<string, string>;
  body?: string;
};

async function viatorFetch<T>(
  endpoint: string,
  options: FetchOptions
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api-key': API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// --- Types (simplified, adjust as needed) ---

// /products/search
export interface ProductsSearchRequest {
  filtering: {
    destination?: string;
    tags?: number[];
    flags?: string[];
    highestPrice?: number;
    startDate?: string;
    endDate?: string;
  };
  sorting?: {
    sort?: string;
    order?: string;
  };
  pagination?: {
    start?: number;
    count?: number;
  };
  currency?: string;
}
export interface ProductsSearchResponse {
  products: any[]; // Replace with detailed product type if needed
  totalCount: number;
}

// /products/{product-code}
export interface ProductDetailResponse {
  // Define fields as per API response
  [key: string]: any;
}

// /products/modified-since
export interface ProductsModifiedSinceResponse {
  // Define fields as per API response
  [key: string]: any;
}

// /products/bulk
export interface ProductsBulkRequest {
  productCodes: string[];
}
export interface ProductsBulkResponse {
  // Define fields as per API response
  [key: string]: any;
}

// /products/tags/
export interface ProductsTagsResponse {
  // Define fields as per API response
  [key: string]: any;
}

// /products/booking-questions/
export interface ProductsBookingQuestionsRequest {
  productCodes: string[];
}
export interface ProductsBookingQuestionsResponse {
  // Define fields as per API response
  [key: string]: any;
}

// --- Services ---

// POST /products/search?campaign-value=JUNE
export async function searchProducts(
  body: ProductsSearchRequest
): Promise<ProductsSearchResponse> {

  console.log(JSON.stringify(body));

  return viatorFetch<ProductsSearchResponse>(
    `/products/search`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
}


// GET /products/{product-code}
export async function getProductDetail(
  productCode: string
): Promise<ProductDetailResponse> {
  return viatorFetch<ProductDetailResponse>(
    `/products/${encodeURIComponent(productCode)}`,
    { method: 'GET' }
  );
}

// GET /products/modified-since?count=5
export async function getProductsModifiedSince(
  count = 5
): Promise<ProductsModifiedSinceResponse> {
  return viatorFetch<ProductsModifiedSinceResponse>(
    `/products/modified-since?count=${count}`,
    { method: 'GET' }
  );
}

// POST /products/bulk
export async function getProductsBulk(
  body: ProductsBulkRequest
): Promise<ProductsBulkResponse> {
  return viatorFetch<ProductsBulkResponse>(
    `/products/bulk`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
}

// GET /products/tags/
export async function getProductsTags(): Promise<ProductsTagsResponse> {
  return viatorFetch<ProductsTagsResponse>(
    `/products/tags/`,
    { method: 'GET' }
  );
}

// GET /products/booking-questions/
export async function getProductsBookingQuestions(
  body: ProductsBookingQuestionsRequest
): Promise<ProductsBookingQuestionsResponse> {
  return viatorFetch<ProductsBookingQuestionsResponse>(
    `/products/booking-questions/`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
}