"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "@phosphor-icons/react";
import ContentContainer from "@/components/layout/ContentContainer";

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
    <div className="mb-4 flex text-garage-blue" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <Star key={i} weight="fill" size={16} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => setReducedMotion(motionMedia.matches);
    syncReducedMotion();
    motionMedia.addEventListener("change", syncReducedMotion);

    const track = trackRef.current;
    if (!track) return;

    let ticking = false;

    const updateActive = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      if (cards.length === 0) return;

      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < minDistance) {
          closest = index;
          minDistance = distance;
        }
      });

      setActiveIndex(closest);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      motionMedia.removeEventListener("change", syncReducedMotion);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const target = cards[index];
    if (!target) return;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handlePrev = () => {
    const next = Math.max(activeIndex - 1, 0);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = Math.min(activeIndex + 1, testimonials.length - 1);
    scrollToIndex(next);
  };

  return (
    <div className="relative">
      <ContentContainer className="px-0">
        <div
          ref={trackRef}
          className="hide-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              handlePrev();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              handleNext();
            }
          }}
          tabIndex={0}
          onPointerDown={(event) => {
            draggingRef.current = true;
            dragStartRef.current = {
              x: event.clientX,
              scrollLeft: trackRef.current?.scrollLeft || 0,
            };
          }}
          onPointerMove={(event) => {
            if (!draggingRef.current || !trackRef.current) return;
            const delta = event.clientX - dragStartRef.current.x;
            trackRef.current.scrollLeft = dragStartRef.current.scrollLeft - delta;
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerCancel={() => {
            draggingRef.current = false;
          }}
          onPointerLeave={() => {
            draggingRef.current = false;
          }}
        >
          {testimonials.map((testimonial, index) => {
            const active = activeIndex === index;
            return (
              <article
                key={testimonial.name}
                data-card
                className={`w-[90vw] max-w-[700px] snap-center rounded-none border border-garage-border bg-white transition-all duration-300 md:w-[620px] ${
                  reducedMotion
                    ? ""
                    : active
                      ? "scale-100"
                      : "scale-[0.97]"
                }`}
                aria-current={active ? "true" : undefined}
              >
                {/* Header image */}
                <div className="relative w-full overflow-hidden bg-garage-panel">
                  {testimonial.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full object-contain"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <div className="p-7 md:p-9">
                  <Stars />
                  <p className="text-lg leading-relaxed text-garage-ink">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-7 border-t border-garage-border/70 pt-5">
                    <p className="text-base font-semibold text-garage-black">{testimonial.name}</p>
                    <p className="text-sm text-garage-gray">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </ContentContainer>

    </div>
  );
}
