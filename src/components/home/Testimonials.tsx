"use client";

import { useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Jessica Minnen",
    role: "Personal Training Client",
    text: "The real progress can't be captured in a picture because it's a feeling. I have more energy and confidence. I am more myself than I have been in years.",
    image:
      "https://static.wixstatic.com/media/eefe7f_479f80a4ae694805847d2ec3fbe8e189~mv2.png",
  },
  {
    name: "Sarah Jenkins",
    role: "Personal Training",
    text: "Garage 1880 completely changed my perspective on fitness. The environment is so welcoming and the trainers really care about your long-term health.",
    image: "/images/testimonials/testimonial-2.avif",
  },
  {
    name: "Alex T.",
    role: "One-on-One Training",
    text: "The best investment I've made in myself this year. The facility is beautiful and the vibe is always positive.",
    image: "/images/testimonials/testimonial-3.avif",
  },
];

function Stars() {
  return (
    <div className="mb-4 flex text-garage-blue" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <Star key={i} weight="fill" size={16} />
      ))}
    </div>
  );
}

interface CardProps {
  testimonial: (typeof testimonials)[number];
  duplicate?: boolean;
}

function TestimonialCard({ testimonial, duplicate = false }: CardProps) {
  return (
    <article
      aria-label={testimonial.name}
      aria-hidden={duplicate ? "true" : undefined}
      className="w-[90vw] max-w-[850px] shrink-0 flex flex-col border border-garage-border bg-white md:flex-row md:w-[780px]"
    >
      {/* Photo */}
      <div className="relative w-full bg-garage-panel md:w-[40%] md:shrink-0">
        {testimonial.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-7 md:p-9 md:w-[60%] justify-center">
        <Stars />
        <p className="text-lg leading-relaxed text-garage-ink md:text-xl">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div className="mt-8">
          <div className="border-t border-garage-border/70 pt-5">
            <p className="text-base font-semibold text-garage-black">{testimonial.name}</p>
            <p className="text-sm text-garage-gray">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div role="region" aria-label="Testimonials" className="relative overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[rgb(var(--garage-canvas))] to-transparent md:w-52" />
      {/* Right fade */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[rgb(var(--garage-canvas))] to-transparent md:w-52" />

      {/* Marquee track */}
      <div
        className="flex gap-6 py-6"
        style={
          reducedMotion
            ? { flexWrap: "wrap" }
            : {
              width: "max-content",
              animation: "testimonials-scroll 48s linear infinite",
            }
        }
      >
        {/* Primary set — visible to screen readers */}
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}

        {/* Duplicate set for seamless loop — hidden from AT */}
        {!reducedMotion &&
          testimonials.map((t) => (
            <TestimonialCard key={`dup-${t.name}`} testimonial={t} duplicate />
          ))}
      </div>
    </div>
  );
}
