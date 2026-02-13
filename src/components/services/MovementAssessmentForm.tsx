"use client";

import { useState } from "react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function MovementAssessmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="surface-card px-6 py-10 text-center">
        <h3 className="type-h3 text-garage-black">Thanks for submitting!</h3>
        <p className="mt-3 type-body text-garage-gray">We will reach out shortly with next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card px-5 py-6 md:px-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block type-label text-garage-gray">First Name</span>
          <input
            type="text"
            name="firstName"
            required
            className="w-full rounded-[0.8rem] border border-garage-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-garage-lilac"
          />
        </label>
        <label className="block">
          <span className="mb-1 block type-label text-garage-gray">Last Name</span>
          <input
            type="text"
            name="lastName"
            required
            className="w-full rounded-[0.8rem] border border-garage-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-garage-lilac"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block type-label text-garage-gray">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-[0.8rem] border border-garage-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-garage-lilac"
          />
        </label>
        <label className="block">
          <span className="mb-1 block type-label text-garage-gray">Phone</span>
          <input
            type="tel"
            name="phone"
            className="w-full rounded-[0.8rem] border border-garage-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-garage-lilac"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block type-label text-garage-gray">Message</span>
        <textarea
          name="message"
          rows={4}
          className="w-full resize-none rounded-[0.8rem] border border-garage-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-garage-lilac"
          placeholder="Tell us about your goals."
        />
      </label>

      <div className="mt-5">
        <PremiumButton type="submit" className="w-full justify-center" disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </PremiumButton>
      </div>
    </form>
  );
}
