import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "../../../services/products";

export async function POST(req: NextRequest) {
  try {
    // Read JSON body
    const body = await req.json();

    const raw = JSON.stringify({
      filtering: {
        destination: "479",
        tags: [21972],
        flags: ["LIKELY_TO_SELL_OUT"],
        highestPrice: 1000,
        startDate: "2025-11-16",
        endDate: "2025-12-31",
      },
      sorting: {
        sort: "PRICE",
        order: "DESCENDING",
      },
      pagination: {
        start: 1,
        count: 5,
      },
      currency: "EUR",
    });

    const data = await searchProducts(JSON.parse(raw));

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
