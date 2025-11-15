export class ViatorError extends Error {
  status: number;
  body: any;

  constructor(message: string, status: number, body: any) {
    super(message);
    this.name = "ViatorError";
    this.status = status;
    this.body = body;
  }
}

export interface ViatorConfig {
  apiKey: string;
  partnerId?: string;
  baseUrl?: string;
}

export default class ViatorService {
  apiKey: string;
  partnerId?: string;
  baseUrl: string;

  constructor({ apiKey, partnerId = "", baseUrl = "https://api.sandbox.viator.com/partner" }: ViatorConfig) {
    if (!apiKey) throw new Error("Viator API Key is required");
    this.apiKey = apiKey;
    this.partnerId = partnerId;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private _headers() {
    return {
      "Content-Type": "application/json",
      "exp-api-key": this.apiKey,
      ...(this.partnerId ? { "exp-partner-id": this.partnerId } : {}),
    } as HeadersInit;
  }

  private async _request(
    path: string,
    options: { method?: string; query?: Record<string, any> | null; body?: any | null } = {}
  ) {
    const { method = "GET", query = null, body = null } = options;

    const url = new URL(`${this.baseUrl}${path}`);
    if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, String(v)));

    const fetchOptions: RequestInit = {
      method,
      headers: this._headers(),
    };

    if (body) fetchOptions.body = JSON.stringify(body);

    const res = await fetch(url.toString(), fetchOptions);
    const text = await res.text();

    let json: any;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = text;
    }

    if (!res.ok) throw new ViatorError("Viator API Error", res.status, json);
    return json;
  }

  searchProducts(payload: any) {
    return this._request("/products/search", { method: "POST", body: payload });
  }

  getProduct(code: string) {
    return this._request(`/products/${encodeURIComponent(code)}`);
  }

  checkAvailability(payload: any) {
    return this._request("/availability/check", { method: "POST", body: payload });
  }

  createBooking(payload: any) {
    return this._request("/bookings", { method: "POST", body: payload });
  }
}