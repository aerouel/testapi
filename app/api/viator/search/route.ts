import { NextApiRequest,NextApiResponse } from "next/server";
import { searchProducts } from '../../../services/products';

export async function POST(req: NextApiRequest,res: NextApiResponse) {
  if (req.method !== 'POST') {
        return req.status(405).json({ error: 'Method not allowed' });
    }
    const body = await req.json();
    const raw = JSON.stringify({
      "filtering": {
        "destination": "479",
        "tags": [
          21972
        ],
        "flags": [
          "LIKELY_TO_SELL_OUT"
        ],
        "highestPrice": 1000,
        "startDate": "2025-11-16",
        "endDate": "2025-12-31"
      },
      "sorting": {
        "sort": "PRICE",
        "order": "DESCENDING"
      },
      "pagination": {
        "start": 1,
        "count": 5
      },
      "currency": "EUR"
    });
    //const body = req.json();
    /*if (!body.filtering.destination || typeof body.filtering.destination !== 'string') {
        return res.status(400).json({ error: 'City name is required' });
    }*/

    //try {
        const data = await searchProducts(raw);
        res.status(200).json(data);
    /*} catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }*/
}

