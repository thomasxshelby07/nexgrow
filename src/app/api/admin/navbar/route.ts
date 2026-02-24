
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Navbar from "@/lib/models/Navbar";

export async function GET() {
    await dbConnect();
    const config = await Navbar.findOne();
    return NextResponse.json(config?.items || []);
}

export async function POST(req: Request) {
    await dbConnect();
    const { items } = await req.json();

    const config = await Navbar.findOneAndUpdate({}, { items }, { new: true, upsert: true });

    return NextResponse.json({ success: true, config });
}
