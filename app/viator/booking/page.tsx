'use client';

import { useState } from "react";
import ViatorService from "../../lib/viator-service";

export default function BookingPage() {
  const [payload, setPayload] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const book = async () => {
    try {
      const api = new ViatorService({
        apiKey: process.env.NEXT_PUBLIC_VIATOR_KEY || "",
        partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER || "",
      });

      const data = await api.createBooking(JSON.parse(payload));
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Booking Error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Booking (Full Access)</h1>

      <textarea
        className="border p-2 w-full h-40"
        placeholder="Paste full booking JSON payload here"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />

      <button
        onClick={book}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
      >
        Send Booking
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 mt-4 text-sm rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
