"use client";

import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  InstagramLogo,
  FacebookLogo,
  CaretDown,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInUp from "@/components/ui/FadeInUp";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up to Wix Forms API or /api/contact route
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="pb-32">
      <Navbar />

      {/* Hero */}
      <div className="bg-garage-black text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeInUp>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Contact Us
            </h1>
          </FadeInUp>
          <FadeInUp delay={100}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your fitness journey? Get in touch and we&apos;ll
              help you take the first step.
            </p>
          </FadeInUp>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <FadeInUp>
              {submitted ? (
                <div className="bg-garage-light rounded-[2rem] p-12 text-center">
                  <CheckCircle
                    size={64}
                    weight="fill"
                    className="text-green-500 mx-auto mb-6"
                  />
                  <h3 className="text-2xl font-bold text-garage-black mb-3">
                    Request Sent!
                  </h3>
                  <p className="text-garage-gray">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-garage-light rounded-[2rem] p-8 md:p-10"
                >
                  <h2 className="text-2xl font-extrabold text-garage-black mb-2">
                    Start Your Journey
                  </h2>
                  <p className="text-garage-gray text-sm mb-8">
                    Tell us about your goals.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                        Interest
                      </label>
                      <div className="relative">
                        <select
                          name="interest"
                          className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none appearance-none cursor-pointer"
                        >
                          <option>Personal Training</option>
                          <option>Nutrition Coaching</option>
                          <option>General Inquiry</option>
                        </select>
                        <CaretDown
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-garage-gray pointer-events-none"
                          weight="bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full bg-white border-transparent focus:border-garage-blue focus:ring-0 rounded-2xl px-4 py-3 outline-none resize-none"
                        placeholder="Tell us about your goals..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-garage-black text-white font-bold rounded-2xl py-4 mt-2 hover:bg-garage-blue shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Request
                          <PaperPlaneTilt weight="bold" size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </FadeInUp>

            {/* Info */}
            <FadeInUp delay={150}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-garage-black mb-4 flex items-center gap-2">
                    <Phone weight="fill" className="text-garage-blue" />
                    Call Us
                  </h3>
                  <a
                    href="tel:7207456158"
                    className="text-lg text-garage-gray hover:text-garage-blue transition-colors"
                  >
                    (720) 745-6158
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-garage-black mb-4 flex items-center gap-2">
                    <MapPin weight="fill" className="text-garage-blue" />
                    Visit Us
                  </h3>
                  <address className="not-italic text-garage-gray leading-relaxed">
                    4255 Jason St Unit B
                    <br />
                    Sunnyside, Denver, CO 80211
                  </address>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-garage-black mb-4 flex items-center gap-2">
                    <Clock weight="fill" className="text-garage-blue" />
                    Hours
                  </h3>
                  <ul className="text-garage-gray space-y-1">
                    <li className="flex justify-between max-w-[200px]">
                      <span>Mon – Fri</span> <span>6am – 7pm</span>
                    </li>
                    <li className="flex justify-between max-w-[200px]">
                      <span>Saturday</span> <span>Closed</span>
                    </li>
                    <li className="flex justify-between max-w-[200px]">
                      <span>Sunday</span> <span>Closed</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-garage-black mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/garage1880_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-garage-light flex items-center justify-center text-garage-gray hover:bg-garage-blue hover:text-white transition-all"
                    >
                      <InstagramLogo weight="fill" size={22} />
                    </a>
                    <a
                      href="https://www.facebook.com/Garage1880"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-garage-light flex items-center justify-center text-garage-gray hover:bg-garage-blue hover:text-white transition-all"
                    >
                      <FacebookLogo weight="fill" size={22} />
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-soft h-64 bg-garage-light">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3!2d-105.01!3d39.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z4255+Jason+St+Unit+B+Denver+CO+80211!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Garage 1880 Location"
                  />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
