import { NextResponse } from "next/server";
import { processChatRequest } from "@/lib/hera/chatServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await processChatRequest(body);
    return NextResponse.json(response);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Chat failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
