"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const logo = logoRef.current;
    const bar = barRef.current;
    if (!screen || !logo || !bar) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Animate progress bar from 0 → 100%
    if (!reducedMotion) {
      gsap.fromTo(
        logo,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power1.inOut" }
      );
    } else {
      logo.style.opacity = "1";
      bar.style.transform = "scaleX(1)";
    }

    const runExit = () => {
      if (!reducedMotion) {
        // Fade the logo slightly, then wipe the screen up
        gsap.to(logo, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        gsap.to(bar, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        gsap.to(screen, {
          yPercent: -100,
          duration: 0.5,
          delay: 0.2,
          ease: "power3.inOut",
          onComplete: () => setVisible(false),
        });
      } else {
        gsap.to(screen, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => setVisible(false),
        });
      }
    };

    const mountTime = Date.now();
    const MIN_DISPLAY_MS = 1000;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = Date.now() - mountTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      if (remaining > 0) {
        setTimeout(runExit, remaining);
      } else {
        runExit();
      }
    };

    if (document.readyState === "complete") {
      const t = setTimeout(dismiss, 300);
      return () => clearTimeout(t);
    } else {
      const onLoad = () => dismiss();
      window.addEventListener("load", onLoad);
      const timeout = setTimeout(dismiss, 2000);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[rgb(var(--garage-canvas))]"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logoRef}
        src="/images/brand/logo-text.jpg"
        alt=""
        className="w-48 max-w-[60vw] opacity-0"
      />

      {/* Progress bar */}
      <div className="mt-6 h-[2px] w-48 max-w-[60vw] overflow-hidden bg-garage-border">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-garage-lilac to-[#a28de8]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
