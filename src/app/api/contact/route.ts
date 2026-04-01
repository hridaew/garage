import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECIPIENT = "info@garage1880.com";

interface ContactBody {
  formType: "contact" | "consult" | "assessment";
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  primaryGoal?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(body: ContactBody): { subject: string; html: string } {
  const rows: string[] = [];
  const add = (label: string, value: string | undefined) => {
    if (value?.trim()) {
      rows.push(`<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;color:#646C7E">${label}</td><td style="padding:6px 12px;color:#1C202C">${escapeHtml(value.trim())}</td></tr>`);
    }
  };

  let subject: string;

  switch (body.formType) {
    case "consult":
      subject = "[Garage 1880] Free Consult Request";
      add("Name", body.firstName);
      add("Phone", body.phone);
      add("Email", body.email);
      add("Primary Goal", body.primaryGoal);
      break;
    case "assessment":
      subject = "[Garage 1880] Movement Assessment Request";
      add("Name", [body.firstName, body.lastName].filter(Boolean).join(" "));
      add("Email", body.email);
      add("Phone", body.phone);
      add("Message", body.message);
      break;
    default:
      subject = "[Garage 1880] New Contact Form Submission";
      add("Name", [body.firstName, body.lastName].filter(Boolean).join(" "));
      add("Email", body.email);
      add("Phone", body.phone);
      add("Interest", body.interest);
      add("Message", body.message);
      break;
  }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#1C202C;margin-bottom:16px">${subject}</h2>
      <table style="border-collapse:collapse;width:100%">${rows.join("")}</table>
      <p style="margin-top:24px;font-size:13px;color:#646C7E">Sent from the Garage 1880 website</p>
    </div>
  `;

  return { subject, html };
}

function validate(body: ContactBody): string | null {
  if (!body.firstName?.trim()) return "First name is required.";
  if (!body.email?.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return "Enter a valid email address.";

  switch (body.formType) {
    case "contact":
      if (!body.lastName?.trim()) return "Last name is required.";
      break;
    case "consult":
      if (!body.phone?.trim()) return "Phone number is required.";
      if (!body.primaryGoal?.trim()) return "Please share your primary goal.";
      break;
    case "assessment":
      if (!body.lastName?.trim()) return "Last name is required.";
      break;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { subject, html } = buildEmailHtml(body);

    await transporter.sendMail({
      from: `"Garage 1880 Website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: body.email!.trim(),
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
