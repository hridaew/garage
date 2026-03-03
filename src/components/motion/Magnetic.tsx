"use client";

import { useEffect, useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export default function Magnetic({
  children,
  className = "",
  strength = 0.18,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    let mounted = true;
    let gsapRef: (typeof import("gsap"))["gsap"] | null = null;

    import("gsap").then(({ gsap }) => {
      if (mounted) gsapRef = gsap;
    });

    const handleMove = (event: PointerEvent) => {
      if (!gsapRef) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      gsapRef.to(el, { x, y, duration: 0.25, ease: "power3.out", overwrite: true });
    };

    const handleLeave = () => {
      if (!gsapRef) return;
      gsapRef.to(el, { x: 0, y: 0, duration: 0.38, ease: "power3.out", overwrite: true });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      mounted = false;
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [disabled, strength]);

  return (
    <div className={`inline-block will-change-transform ${className}`} ref={ref}>
      {children}
    </div>
  );
}
