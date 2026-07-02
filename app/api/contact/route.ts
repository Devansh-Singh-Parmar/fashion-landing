import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  volume?: string;
  message?: string;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!payload.name || !payload.company || !payload.email || !payload.volume) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // TODO: wire to real CRM/email endpoint
  console.log("[fashion contact form submission]", payload);

  return NextResponse.json({ ok: true });
}
