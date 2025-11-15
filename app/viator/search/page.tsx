"use client";

import { useState } from "react";

interface ProductItem {
  productCode: string;
  title: string;
}

export default function SearchPage() {
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("");

 const handleSearch = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/viator/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paging: { count: 10, start: 0 }, filtering: { destination } }),
    });

    const data = await res.json();
    setResults(data.products || []);
  } catch (err) {
    console.error(err);
    alert("Error fetching products");
  }
  setLoading(false);
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Viator Products</h1>

      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Destination ID (ex: 732)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="mt-6">
        {results.map((p) => (
          <div key={p.productCode} className="p-4 border rounded mb-3">
            <h2 className="font-bold">{p.title}</h2>
            <a
              className="text-blue-600"
              href={`/viator/product/${p.productCode}`}
            >
              View details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
