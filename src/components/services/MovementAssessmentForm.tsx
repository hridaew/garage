"use client";

import { useRef, useState } from "react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function MovementAssessmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittedAt = useRef(Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "assessment",
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          website: formData.get("website"),
          submittedAt: submittedAt.current,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
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
      <label className="sr-only" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

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

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-5">
        <PremiumButton type="submit" className="w-full justify-center" disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </PremiumButton>
      </div>
    </form>
  );
}
