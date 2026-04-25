"use client";

import { useRef, useState } from "react";
import { CaretDown, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "Personal Training",
    message: "",
    website: "",
  });
  const submittedAt = useRef(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", submittedAt: submittedAt.current, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="surface-card px-7 py-14 text-center md:px-9">
        <CheckCircle size={46} weight="fill" className="mx-auto text-green-500" />
        <h3 className="mt-5 font-display text-3xl text-garage-black">We&apos;ll be in touch!</h3>
        <p className="mt-2 text-sm text-garage-gray">
          Thanks for reaching out. We typically respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card p-7 md:p-9">
      <h2 className="font-display text-3xl text-garage-black">Start Your Journey</h2>
      <p className="mt-2 text-sm text-garage-gray">Tell us about your goals.</p>

      <div className="mt-8 space-y-6">
        <label className="sr-only" aria-hidden="true">
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </label>

        {/* Name group */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label htmlFor="contact-firstName" className="space-y-2 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              First Name
            </span>
            <input
              id="contact-firstName"
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={update("firstName")}
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
              required
            />
          </label>
          <label htmlFor="contact-lastName" className="space-y-2 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              Last Name
            </span>
            <input
              id="contact-lastName"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={update("lastName")}
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
              required
            />
          </label>
        </div>

        {/* Contact info group */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label htmlFor="contact-email" className="space-y-2 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              Email
            </span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={update("email")}
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
              required
            />
          </label>
          <label htmlFor="contact-phone" className="space-y-2 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              Phone (optional)
            </span>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={update("phone")}
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
            />
          </label>
        </div>

        {/* Details group */}
        <label htmlFor="contact-interest" className="block space-y-2 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Interest
          </span>
          <div className="relative">
            <select
              id="contact-interest"
              name="interest"
              value={form.interest}
              onChange={update("interest")}
              className="w-full appearance-none rounded-2xl border border-garage-border bg-white px-4 py-3 pr-10 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
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

        <label htmlFor="contact-message" className="block space-y-2 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Message
          </span>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={update("message")}
            className="w-full resize-none rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
            placeholder="Tell us about your goals..."
          />
        </label>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="pt-2">
          <PremiumButton
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting}
            icon={<PaperPlaneTilt weight="bold" size={18} />}
          >
            {submitting ? "Sending..." : "Send Request"}
          </PremiumButton>
        </div>
      </div>
    </form>
  );
}
