import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  const reply = "I hear you. Some thoughts only need a quiet place.";

  return NextResponse.json({ reply });
}
