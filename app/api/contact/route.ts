import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  volume?: string;
  message?: string;
}

const CONTACT_INBOX = "info@zineps.com";

// Resend's shared sandbox sender, works immediately with no domain setup.
// Once the zineps.com domain is verified in Resend, switch this to something
// like "Zineps Website <notifications@zineps.com>" for better deliverability
// and to drop the resend.dev branding from the "from" address.
const FROM_ADDRESS = "Zineps Website <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const { name, company, email, volume, message } = payload;

  if (!name || !company || !email || !volume) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact form] RESEND_API_KEY is not set; cannot send email.");
    return NextResponse.json({ ok: false, error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company],
    ["Work email", email],
    ["Monthly order volume", volume],
    ["Message", message || "(not provided)"],
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_INBOX,
      replyTo: email,
      subject: `New demo request: ${company}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<table cellpadding="6" cellspacing="0">${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}</table>`,
    });

    if (error) {
      console.error("[contact form] Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact form] Unexpected error sending email:", err);
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
