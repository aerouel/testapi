"use client";


import { useState } from "react";
import ViatorService from "../../lib/viator-service";


export default function AvailabilityPage() {
    const [code, setCode] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState<any>(null);


    const check = async () => {
        try {
            const api = new ViatorService({
                apiKey: process.env.NEXT_PUBLIC_VIATOR_KEY || "",
                partnerId: process.env.NEXT_PUBLIC_VIATOR_PARTNER,
            });


            const result = await api.checkAvailability({ productCode: code, travelDate: date });
            setData(result);
        } catch (err) {
            console.error(err);
            alert("Error checking availability");
        }
    };


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Check Availability</h1>


            <input
                className="border p-2 w-full mb-2"
                placeholder="Product code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />


            <input
                type="date"
                className="border p-2 w-full mb-4"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />


            <button onClick={check} className="bg-green-600 text-white px-4 py-2 rounded">
                Check
            </button>


            {data && (
                <pre className="bg-gray-100 p-4 mt-4 text-sm rounded">{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}