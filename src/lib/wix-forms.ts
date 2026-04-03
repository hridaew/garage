import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { submissions } from "@wix/forms";

const wixFormsClient = createClient({
  modules: { submissions },
  auth: ApiKeyStrategy({
    siteId: process.env.WIX_SITE_ID!,
    apiKey: process.env.WIX_API_KEY!,
  }),
});

const FORM_ID = process.env.WIX_CONTACT_FORM_ID!;

// Field target keys from the Wix form definition
const FIELD = {
  firstName: "first_name_a9c8",
  lastName: "last_name_8987",
  email: "email_9ad1",
  phone: "phone_9185",
  interest: "interest",
  message: "message",
} as const;

interface FormData {
  formType: "contact" | "consult" | "assessment";
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  primaryGoal?: string;
}

export async function submitContactForm(data: FormData) {
  const fields: Record<string, string> = {};

  if (data.firstName) fields[FIELD.firstName] = data.firstName;
  if (data.lastName) fields[FIELD.lastName] = data.lastName;
  if (data.email) fields[FIELD.email] = data.email;
  if (data.phone) fields[FIELD.phone] = data.phone;

  // Map form-type-specific fields into interest/message
  switch (data.formType) {
    case "contact":
      if (data.interest) fields[FIELD.interest] = data.interest;
      if (data.message) fields[FIELD.message] = data.message;
      break;
    case "consult":
      fields[FIELD.interest] = "Free Consult Request";
      if (data.primaryGoal) fields[FIELD.message] = `Primary Goal: ${data.primaryGoal}`;
      break;
    case "assessment":
      fields[FIELD.interest] = "Movement Assessment Request";
      if (data.message) fields[FIELD.message] = data.message;
      break;
  }

  return await wixFormsClient.submissions.createSubmission({
    formId: FORM_ID,
    submissions: fields,
  });
}
