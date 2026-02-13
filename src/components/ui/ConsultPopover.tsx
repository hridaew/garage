"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, X } from "@phosphor-icons/react";

export interface ConsultPayload {
  firstName: string;
  email: string;
  primaryGoal: string;
}

export interface ConsultPopoverProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  onSubmit: (payload: ConsultPayload) => Promise<void>;
  initialFocusField?: "firstName" | "email" | "primaryGoal";
}

export default function ConsultPopover({
  open,
  anchorRef,
  onClose,
  onSubmit,
  initialFocusField = "firstName",
}: ConsultPopoverProps) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const goalRef = useRef<HTMLTextAreaElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ConsultPayload>({
    firstName: "",
    email: "",
    primaryGoal: "",
  });
  const [errors, setErrors] = useState<{ email?: string; firstName?: string; primaryGoal?: string }>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle open/close with CSS transitions
  useEffect(() => {
    if (open) {
      setRendered(true);
      // Trigger enter transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      setSubmitted(false);
      setSubmitting(false);
      setErrors({});
    } else {
      setVisible(false);
      // Wait for exit transition to finish before unmounting
      const timer = setTimeout(() => setRendered(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const focusAnchorControl = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    anchor.querySelector<HTMLElement>("button, a")?.focus();
  }, [anchorRef]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget =
      initialFocusField === "email"
        ? emailRef.current
        : initialFocusField === "primaryGoal"
          ? goalRef.current
          : firstNameRef.current;

    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      window.setTimeout(() => focusAnchorControl(), 0);
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [focusAnchorControl, initialFocusField, onClose, open]);

  if (!isMounted || !rendered) return null;

  const validate = () => {
    const nextErrors: { email?: string; firstName?: string; primaryGoal?: string } = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!form.primaryGoal.trim()) {
      nextErrors.primaryGoal = "Please share your primary goal.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await onSubmit({
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      primaryGoal: form.primaryGoal.trim(),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const closeAndReturnFocus = () => {
    onClose();
    window.setTimeout(() => focusAnchorControl(), 0);
  };

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? "0ms" : "200ms";

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center px-4 py-6 md:px-6 md:py-10"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration} ease-out`,
      }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-label="Close consult popup"
        onClick={closeAndReturnFocus}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book your free consult"
        className="relative z-10 w-full max-w-[42rem] rounded-[1.45rem] border border-garage-border bg-white p-6 shadow-[0_28px_60px_rgba(14,16,32,0.24)] md:p-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)",
          transition: `opacity ${duration} ease-out, transform ${duration} ease-out`,
        }}
      >
        <div className="mb-4 grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2">
          <span aria-hidden className="h-11 w-11" />
          <h3 className="type-h2 text-center text-garage-black">Book your free consult</h3>
          <button
            type="button"
            onClick={closeAndReturnFocus}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-garage-border text-garage-gray transition-colors hover:text-garage-black"
            aria-label="Close consult popup"
          >
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <p className="mb-6 text-center type-body text-garage-gray">Share a few details and we&apos;ll reach out.</p>
        ) : null}

        {submitted ? (
          <div className="px-2 py-10 text-center">
            <CheckCircle size={46} weight="fill" className="mx-auto text-green-500" />
            <h4 className="mt-5 text-3xl font-bold text-garage-black">You&apos;re in.</h4>
            <p className="mt-2 type-body text-garage-gray">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-garage-gray">
                First Name
              </span>
              <input
                ref={firstNameRef}
                type="text"
                value={form.firstName}
                onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                className="h-14 w-full rounded-[1rem] border border-garage-border px-4 text-base text-garage-black outline-none transition-colors focus:border-garage-lilac"
              />
              {errors.firstName ? <span className="mt-1 block text-xs text-red-600">{errors.firstName}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-garage-gray">
                Email
              </span>
              <input
                ref={emailRef}
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="h-14 w-full rounded-[1rem] border border-garage-border px-4 text-base text-garage-black outline-none transition-colors focus:border-garage-lilac"
              />
              {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-garage-gray">
                Primary Goal
              </span>
              <textarea
                ref={goalRef}
                rows={4}
                value={form.primaryGoal}
                onChange={(event) => setForm((prev) => ({ ...prev, primaryGoal: event.target.value }))}
                className="w-full resize-none rounded-[1rem] border border-garage-border px-4 py-3 text-base text-garage-black outline-none transition-colors focus:border-garage-lilac"
                placeholder="Strength, confidence, consistency..."
              />
              {errors.primaryGoal ? (
                <span className="mt-1 block text-xs text-red-600">{errors.primaryGoal}</span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 h-14 w-full rounded-[1rem] border border-[#8f79dc] bg-[#9177e8] px-4 text-xl font-semibold text-white transition-colors hover:bg-[#7f67d9] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
