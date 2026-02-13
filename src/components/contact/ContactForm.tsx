"use client";

import { useState } from "react";
import { CaretDown, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="surface-card p-10 text-center md:p-12">
        <CheckCircle size={62} weight="fill" className="mx-auto mb-6 text-green-500" />
        <h3 className="font-display text-3xl text-garage-black">Request Sent!</h3>
        <p className="mt-3 text-sm text-garage-gray md:text-base">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card p-7 md:p-9">
      <h2 className="font-display text-3xl text-garage-black">Start Your Journey</h2>
      <p className="mt-2 text-sm text-garage-gray">Tell us about your goals.</p>

      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-1.5 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              First Name
            </span>
            <input
              type="text"
              name="firstName"
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac"
              required
            />
          </label>
          <label className="space-y-1.5 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              Last Name
            </span>
            <input
              type="text"
              name="lastName"
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac"
              required
            />
          </label>
        </div>

        <label className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac"
            required
          />
        </label>

        <label className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Phone (optional)
          </span>
          <input
            type="tel"
            name="phone"
            className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac"
          />
        </label>

        <label className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Interest
          </span>
          <div className="relative">
            <select
              name="interest"
              className="w-full appearance-none rounded-2xl border border-garage-border bg-white px-4 py-3 pr-10 outline-none transition-colors focus:border-garage-lilac"
            >
              <option>Personal Training</option>
              <option>Nutrition Coaching</option>
              <option>General Inquiry</option>
            </select>
            <CaretDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-garage-gray"
              weight="bold"
            />
          </div>
        </label>

        <label className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            className="w-full resize-none rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac"
            placeholder="Tell us about your goals..."
          />
        </label>

        <PremiumButton
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
          icon={<PaperPlaneTilt weight="bold" size={18} />}
        >
          {loading ? "Sending..." : "Send Request"}
        </PremiumButton>
      </div>
    </form>
  );
}
