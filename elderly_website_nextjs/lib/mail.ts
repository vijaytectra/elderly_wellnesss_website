import nodemailer from "nodemailer";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function getMailConfig() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.MAIL_TO;

  if (!user || !pass || !from || !to) {
    throw new Error("Missing SMTP_USER, SMTP_PASS, SMTP_FROM, or MAIL_TO");
  }

  return { host, port, user, pass, from, to };
}

export async function sendEnquiryEmail(options: {
  subject: string;
  heading: string;
  fields: Record<string, string>;
}) {
  const { host, port, user, pass, from, to } = getMailConfig();

  const rows = Object.entries(options.fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;width:180px;vertical-align:top">${escapeHtml(key)}</td>
          <td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value).replaceAll("\n", "<br/>")}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a">
      <h2 style="margin:0 0 16px">${escapeHtml(options.heading)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>
    </div>
  `;

  const text = Object.entries(options.fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Elderly Wellness" <${from}>`,
    to,
    subject: options.subject,
    text,
    html,
  });
}
