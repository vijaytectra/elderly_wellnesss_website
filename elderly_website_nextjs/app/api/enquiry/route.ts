import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mail";

type EnquiryBody = {
  type?: string;
  subject?: string;
  heading?: string;
  fields?: Record<string, unknown>;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: EnquiryBody;
  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fieldsIn = body.fields ?? {};
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fieldsIn)) {
    const text = asString(value);
    if (text) fields[key] = text;
  }

  const type = asString(body.type) || "enquiry";
  const name = fields.Name || fields["Full Name"] || fields.name || "";
  const phone = fields.Phone || fields.phone || "";

  if (type === "callback") {
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }
  }

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "Empty form." }, { status: 400 });
  }

  const subject =
    asString(body.subject) ||
    `New website enquiry${name ? ` from ${name}` : ""}`;
  const heading = asString(body.heading) || "New website enquiry";

  try {
    await sendEnquiryEmail({ subject, heading, fields });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email failed:", error);
    return NextResponse.json(
      { error: "Could not send right now. Please call us or try WhatsApp." },
      { status: 500 },
    );
  }
}
