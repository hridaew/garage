"use client";

import { useState } from "react";
import Link from "next/link";
import {
  List,
  X,
  CaretDown,
} from "@phosphor-icons/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto nav-enter">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-dock rounded-full p-2 pl-6 pr-2 flex items-center justify-between md:justify-start gap-4 md:gap-8 transition-all duration-300 hover:scale-[1.01] hover:bg-white/90">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-garage-black hover:text-garage-blue transition-colors whitespace-nowrap"
          >
            GARAGE 1880
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-garage-light/80 rounded-full px-2 py-1">
            <Link
              href="/personal-training"
              className="px-4 py-2 text-sm font-medium text-garage-gray hover:text-garage-black hover:bg-white rounded-full transition-all"
            >
              Services
            </Link>
            <Link
              href="/about-us"
              className="px-4 py-2 text-sm font-medium text-garage-gray hover:text-garage-black hover:bg-white rounded-full transition-all"
            >
              About
            </Link>
            <Link
              href="/contact-us-about-fitness"
              className="px-4 py-2 text-sm font-medium text-garage-gray hover:text-garage-black hover:bg-white rounded-full transition-all"
            >
              Contact
            </Link>
            <Link
              href="/fitnessblog"
              className="px-4 py-2 text-sm font-medium text-garage-gray hover:text-garage-black hover:bg-white rounded-full transition-all"
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPopoverOpen(!popoverOpen);
              }}
              className="px-6 py-3 bg-garage-black text-white text-sm font-bold rounded-full hover:bg-garage-blue hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book Now
            </button>

            {/* Popover */}
            <div
              className={`absolute bottom-full right-0 mb-6 origin-bottom-right transition-all duration-300 z-[60] ${
                popoverOpen
                  ? "opacity-100 pointer-events-auto scale-100"
                  : "opacity-0 pointer-events-none scale-95"
              }`}
            >
              <div className="bg-white w-80 md:w-96 rounded-[2rem] shadow-2xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-garage-black">
                      Quick Contact
                    </h3>
                    <p className="text-garage-gray text-xs mt-1">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setPopoverOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-garage-light text-garage-gray hover:bg-gray-200 hover:text-garage-black transition-colors"
                  >
                    <X weight="bold" />
                  </button>
                </div>
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPopoverOpen(false);
                    setModalOpen(true);
                  }}
                >
                  <input
                    type="email"
                    className="w-full bg-garage-light border-transparent focus:border-garage-blue focus:bg-white focus:ring-0 rounded-xl px-3 py-2 text-sm outline-none"
                    placeholder="Your Email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-garage-black text-white font-bold rounded-xl py-3 mt-2 hover:bg-garage-blue transition-colors text-sm"
                  >
                    Let&apos;s Talk
                  </button>
                </form>
              </div>
            </div>

            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-garage-light text-garage-black hover:bg-gray-200 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-10"
        }`}
      >
        <Link
          href="/personal-training"
          className="text-3xl font-bold text-garage-black hover:text-garage-blue"
          onClick={() => setMobileOpen(false)}
        >
          Services
        </Link>
        <Link
          href="/about-us"
          className="text-3xl font-bold text-garage-black hover:text-garage-blue"
          onClick={() => setMobileOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact-us-about-fitness"
          className="text-3xl font-bold text-garage-black hover:text-garage-blue"
          onClick={() => setMobileOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/fitnessblog"
          className="text-3xl font-bold text-garage-black hover:text-garage-blue"
          onClick={() => setMobileOpen(false)}
        >
          Blog
        </Link>
        <button
          className="text-garage-gray text-lg flex items-center gap-2 mt-8"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} /> Close
        </button>
      </div>

      {/* Contact Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
          modalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-garage-black/50 backdrop-blur-md"
          onClick={() => setModalOpen(false)}
        />
        <div
          className={`relative bg-white w-full max-w-lg mx-4 rounded-[2rem] shadow-2xl transition-all duration-300 p-8 md:p-10 ${
            modalOpen ? "scale-100" : "scale-95"
          }`}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-garage-light text-garage-gray hover:bg-gray-200 hover:text-garage-black transition-colors"
          >
            <X weight="bold" size={18} />
          </button>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-extrabold text-garage-black">
                Start Your Journey
              </h3>
              <p className="text-garage-gray mt-2 text-sm">
                Tell us about your goals. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Request Sent!");
                setModalOpen(false);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-garage-light border-transparent focus:border-garage-blue focus:bg-white focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-garage-light border-transparent focus:border-garage-blue focus:bg-white focus:ring-0 rounded-2xl px-4 py-3 outline-none"
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
                  className="w-full bg-garage-light border-transparent focus:border-garage-blue focus:bg-white focus:ring-0 rounded-2xl px-4 py-3 outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-garage-gray ml-1">
                  Interest
                </label>
                <div className="relative">
                  <select className="w-full bg-garage-light border-transparent focus:border-garage-blue focus:bg-white focus:ring-0 rounded-2xl px-4 py-3 outline-none appearance-none cursor-pointer">
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
              <button
                type="submit"
                className="w-full bg-garage-black text-white font-bold rounded-2xl py-4 mt-4 hover:bg-garage-blue shadow-lg transition-all duration-300"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
