"use client";

import { CaretDown, PaperPlaneTilt } from "@phosphor-icons/react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/info@garage1880.com"
      method="POST"
      className="surface-card p-7 md:p-9"
    >
      <h2 className="font-display text-3xl text-garage-black">Start Your Journey</h2>
      <p className="mt-2 text-sm text-garage-gray">Tell us about your goals.</p>

      {/* FormSubmit configurations */}
      <input type="hidden" name="_subject" value="New Lead from Garage 1880 Website!" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="box" />

      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label htmlFor="contact-firstName" className="space-y-1.5 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              First Name
            </span>
            <input
              id="contact-firstName"
              type="text"
              name="firstName"
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
              required
            />
          </label>
          <label htmlFor="contact-lastName" className="space-y-1.5 text-sm text-garage-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
              Last Name
            </span>
            <input
              id="contact-lastName"
              type="text"
              name="lastName"
              className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
              required
            />
          </label>
        </div>

        <label htmlFor="contact-email" className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Email
          </span>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
            required
          />
        </label>

        <label htmlFor="contact-phone" className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Phone (optional)
          </span>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            className="w-full rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
          />
        </label>

        <div className="space-y-1.5 text-sm text-garage-ink">
          <label htmlFor="contact-interest" className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Interest
          </label>
          <div className="relative">
            <select
              id="contact-interest"
              name="interest"
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
        </div>

        <label htmlFor="contact-message" className="space-y-1.5 text-sm text-garage-ink">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-garage-gray">
            Message
          </span>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-2xl border border-garage-border bg-white px-4 py-3 outline-none transition-colors focus:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
            placeholder="Tell us about your goals..."
          />
        </label>

        <PremiumButton
          type="submit"
          size="lg"
          className="w-full"
          icon={<PaperPlaneTilt weight="bold" size={18} />}
        >
          Send Request
        </PremiumButton>
      </div>
    </form>
  );
}
