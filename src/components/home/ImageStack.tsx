"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const images = [
  { src: "/images/hero/hero-1.jpg", alt: "Training at Garage 1880" },
  { src: "/images/hero/hero-2.jpg", alt: "Personal training session" },
  { src: "/images/hero/hero-3.jpg", alt: "Garage 1880 trainer" },
];

export default function ImageStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovered = useRef(false);
  const isAnimating = useRef(false);

  // Mouse-tracking parallax
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  // Swipe tracking
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Smooth mouse-tracking loop
  useEffect(() => {
    if (reducedMotion) return;
    const el = stackRef.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const multipliers = [12, 8, -5]; // front moves most, back moves opposite

    const tick = () => {
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.08);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.08);

      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"));
      const active = activeIndex;
      cards.forEach((card, i) => {
        const position = (i - active + images.length) % images.length;
        const m = multipliers[position] ?? 0;
        const mx = mouseCurrent.current.x * m;
        const my = mouseCurrent.current.y * (m * 0.6);
        // Apply as CSS custom properties so GSAP transforms aren't overwritten
        card.style.setProperty("--mouse-x", `${mx}px`);
        card.style.setProperty("--mouse-y", `${my}px`);
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [reducedMotion, activeIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseTarget.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseTarget.current = { x: 0, y: 0 };
    isHovered.current = false;
  }, []);

  const rotateNext = useCallback(() => {
    if (isAnimating.current) return;
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (reducedMotion) return;

    const startTimer = () => {
      autoTimer.current = setInterval(() => {
        if (!isHovered.current) rotateNext();
      }, 4000);
    };

    startTimer();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [reducedMotion, rotateNext]);

  // Animate card positions when activeIndex changes
  useEffect(() => {
    const el = stackRef.current;
    if (!el || reducedMotion) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"));
    if (cards.length === 0) return;

    isAnimating.current = true;

    cards.forEach((card, i) => {
      // Position relative to active: 0 = front, 1 = middle, 2 = back
      const position = (i - activeIndex + images.length) % images.length;

      const configs = [
        { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 3 },
        { x: 40, y: 10, scale: 0.93, rotation: 3, opacity: 0.7, zIndex: 2 },
        { x: 70, y: 20, scale: 0.86, rotation: -2, opacity: 0.4, zIndex: 1 },
      ];

      const config = configs[position];

      gsap.to(card, {
        x: config.x,
        y: config.y,
        scale: config.scale,
        rotation: config.rotation,
        opacity: config.opacity,
        zIndex: config.zIndex,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          if (position === 0) isAnimating.current = false;
        },
      });
    });
  }, [activeIndex, reducedMotion]);

  // Initial card positioning (no animation for reduced motion)
  useEffect(() => {
    if (!reducedMotion) return;
    const el = stackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"));
    cards.forEach((card, i) => {
      const position = (i - activeIndex + images.length) % images.length;
      card.style.zIndex = String(3 - position);
      card.style.opacity = position === 0 ? "1" : position === 1 ? "0.7" : "0.4";
      card.style.transform = position === 0
        ? "none"
        : position === 1
          ? "translateX(40px) translateY(10px) scale(0.93)"
          : "translateX(70px) translateY(20px) scale(0.86)";
    });
  }, [activeIndex, reducedMotion]);

  return (
    <div
      ref={stackRef}
      className="relative hidden h-[520px] w-full cursor-pointer lg:block xl:h-[600px]"
      onClick={rotateNext}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={handleMouseLeave}
      onPointerDown={(e) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!pointerStart.current) return;
        const dx = e.clientX - pointerStart.current.x;
        if (Math.abs(dx) > 40) {
          rotateNext();
        }
        pointerStart.current = null;
      }}
      role="region"
      aria-label="Training photos carousel"
      aria-roledescription="carousel"
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          data-carousel-card
          className="absolute overflow-hidden border border-white/20"
          style={{
            width: "75%",
            height: "85%",
            top: "5%",
            left: "5%",
            translate: "var(--mouse-x, 0px) var(--mouse-y, 0px)",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 0px"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(i);
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
