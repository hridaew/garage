"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { TrainerProfile } from "@/components/services/trainers-data";

interface TrainerModalProps {
  trainer: TrainerProfile | null;
  onClose: () => void;
}

export default function TrainerModal({ trainer, onClose }: TrainerModalProps) {
  const backdropRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isClosing = useRef(false);

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Entrance animation
  useEffect(() => {
    if (!trainer) {
      setMounted(false);
      return;
    }

    setMounted(true);
    isClosing.current = false;
    document.body.style.overflow = "hidden";

    if (reducedMotion) return;

    // Animate in on next frame
    requestAnimationFrame(() => {
      const backdrop = backdropRef.current;
      const card = cardRef.current;
      const image = imageRef.current;

      if (!backdrop || !card) return;

      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

      gsap.fromTo(
        card,
        { scale: 0.92, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
      );

      if (image) {
        gsap.fromTo(
          image,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.4)" }
        );
      }

      // Stagger text elements
      const textEls = [nameRef.current, roleRef.current, bioRef.current].filter(Boolean);
      if (textEls.length > 0) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, delay: 0.15, ease: "power2.out" }
        );
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [trainer, reducedMotion]);

  // Exit animation
  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    if (reducedMotion) {
      onClose();
      return;
    }

    const card = cardRef.current;
    const backdrop = backdropRef.current;

    if (card) {
      gsap.to(card, {
        scale: 0.95,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }

    if (backdrop) {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.2,
        delay: 0.05,
        onComplete: () => onClose(),
      });
    } else {
      onClose();
    }
  }, [onClose, reducedMotion]);

  useEffect(() => {
    if (!trainer) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose, trainer]);

  if (!trainer || !mounted) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8" role="dialog" aria-modal="true" aria-label={`${trainer.name} profile`}>
      <button
        ref={backdropRef}
        type="button"
        className="absolute inset-0 bg-black/48"
        aria-label="Close trainer profile"
        onClick={handleClose}
      />
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-2xl rounded-[1.15rem] border border-garage-border bg-white p-6 shadow-[0_26px_56px_rgba(12,14,25,0.24)] md:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[0.72rem] border border-garage-border text-garage-gray transition-colors hover:text-garage-black"
          aria-label="Close trainer profile"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-5 border-b border-garage-border pb-6 text-center md:flex-row md:items-start md:text-left">
          <div ref={imageRef} className="h-36 w-36 overflow-hidden rounded-full border border-garage-border bg-garage-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={trainer.image} alt={trainer.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 ref={nameRef} className="type-h2 text-garage-black">{trainer.name}</h3>
            <p ref={roleRef} className="mt-2 type-label text-garage-blue">{trainer.role}</p>
          </div>
        </div>

        <div ref={bioRef} className="mt-6 space-y-4 type-body text-garage-ink">
          <p>{trainer.bio}</p>
          <p className="text-garage-gray">
            <span className="font-semibold text-garage-black">Certs:</span> {trainer.certs}
          </p>
        </div>
      </div>
    </div>
  );
}
