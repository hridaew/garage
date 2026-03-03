"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export type RevealPreset =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const PRESETS: Record<RevealPreset, { opacity: number; x?: number; y?: number; scale?: number }> = {
  "fade-up": { opacity: 0, y: 30 },
  fade: { opacity: 0 },
  "slide-left": { opacity: 0, x: 36 },
  "slide-right": { opacity: 0, x: -36 },
  scale: { opacity: 0, scale: 0.95, y: 12 },
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Reveal({
  children,
  className = "",
  preset = "fade-up",
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform,willChange" });
        el.dataset.revealed = "true";
        return;
      }

      const fromState = PRESETS[preset];
      const fromVars = {
        opacity: fromState.opacity,
        x: fromState.x ?? 0,
        y: fromState.y ?? 0,
        scale: fromState.scale ?? 1,
      };
      const triggerStart = Math.max(0, Math.min(100, Math.round((1 - threshold) * 100)));
      let revealTween: gsap.core.Tween | null = null;
      let resetTween: gsap.core.Tween | null = null;

      const runReveal = () => {
        if (once && el.dataset.revealed === "true") return;
        resetTween?.kill();
        revealTween?.kill();
        revealTween = gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          onStart: () => {
            el.style.willChange = "transform,opacity";
          },
          onComplete: () => {
            el.dataset.revealed = "true";
            gsap.set(el, { clearProps: "willChange" });
          },
        });
      };

      const resetReveal = () => {
        if (once) return;
        revealTween?.kill();
        resetTween?.kill();
        el.dataset.revealed = "false";
        resetTween = gsap.to(el, {
          ...fromVars,
          duration: Math.min(0.42, duration * 0.6),
          ease: "power1.out",
          overwrite: "auto",
          onStart: () => {
            el.style.willChange = "transform,opacity";
          },
          onComplete: () => {
            gsap.set(el, { clearProps: "willChange" });
          },
        });
      };

      if (el.dataset.revealed === "true") {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform,willChange" });
      } else {
        gsap.set(el, { ...fromVars, willChange: "transform,opacity" });
      }

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${triggerStart}%`,
        end: "bottom top",
        onEnter: runReveal,
        onEnterBack: runReveal,
        onLeaveBack: resetReveal,
      });

      const rect = el.getBoundingClientRect();
      const startLine = (window.innerHeight * triggerStart) / 100;
      if (rect.top <= startLine) {
        runReveal();
      }

      return () => {
        revealTween?.kill();
        resetTween?.kill();
        trigger.kill();
      };
    },
    {
      scope: ref,
      dependencies: [preset, delay, duration, once, threshold],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
