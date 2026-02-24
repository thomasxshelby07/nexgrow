
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HomePage from "@/lib/models/HomePage";

export async function GET() {
    await dbConnect();
    const config = await HomePage.findOne().lean();
    return NextResponse.json(config || {});
}

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();

    console.log("Saving Homepage Data (Atomic Replace):", JSON.stringify(data, null, 2));

    // Sanitization: Ensure services array items have correct types
    if (data.services && Array.isArray(data.services)) {
        data.services = data.services.map((s: any) => ({
            title: String(s.title || ""),
            link: String(s.link || ""),
            images: Array.isArray(s.images) ? s.images.map(String) : [],
            features: Array.isArray(s.features) ? s.features.map(String) : [],
        }));
    }

    if (data.industries && Array.isArray(data.industries)) {
        data.industries = data.industries.map((i: any) => ({
            title: String(i.title || ""),
            image: String(i.image || ""),
            link: String(i.link || ""),
        }));
    }

    // Use findOneAndReplace to ensure the DB perfectly matches the Admin UI
    // This removes any "ghost" data from previous schema iterations
    const config = await HomePage.findOneAndReplace({}, data, { upsert: true, new: true });

    return NextResponse.json({ success: true, config });
}
