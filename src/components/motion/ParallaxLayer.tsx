"use client";

import { useEffect, useRef } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export default function ParallaxLayer({
  children,
  className = "",
  speed = 55,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.to(ref.current, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    run();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
