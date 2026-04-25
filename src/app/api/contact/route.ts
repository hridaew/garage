import { NextRequest, NextResponse } from "next/server";
import { submitContactForm } from "@/lib/wix-forms";

interface ContactBody {
  formType: "contact" | "consult" | "assessment";
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  primaryGoal?: string;
  website?: string;
  submittedAt?: number;
}

const MIN_SUBMIT_TIME_MS = 2500;

function isLikelySpam(body: ContactBody): boolean {
  if (body.website?.trim()) return true;

  if (!body.submittedAt || Date.now() - body.submittedAt < MIN_SUBMIT_TIME_MS) {
    return true;
  }

  const text = [
    body.firstName,
    body.lastName,
    body.email,
    body.phone,
    body.interest,
    body.message,
    body.primaryGoal,
  ]
    .filter(Boolean)
    .join(" ");

  const urlCount = (text.match(/https?:\/\//gi) ?? []).length;
  if (urlCount > 1) return true;

  return /(casino|crypto|loan|viagra|backlink|guest post|seo services|rank higher|rank on google|telegram|whatsapp)/i.test(
    text,
  );
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

    if (isLikelySpam(body)) {
      return NextResponse.json({ success: true });
    }

    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await submitContactForm(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
