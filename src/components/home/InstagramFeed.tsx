"use client";

import { useRef } from "react";
import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: "/images/instagram/1.jpg", alt: "Training session at Garage 1880" },
  { src: "/images/instagram/2.jpg", alt: "Mobility training" },
  { src: "/images/instagram/3.jpg", alt: "Gym equipment" },
  { src: "/images/instagram/4.jpg", alt: "Mountain climber exercise" },
  { src: "/images/instagram/5.jpg", alt: "Personal training" },
  { src: "/images/instagram/6.jpg", alt: "Garage 1880 trainer" },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const items = el.querySelectorAll("[data-ig-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <div className="mb-6 flex items-center gap-3">
        <InstagramLogo size={24} weight="bold" className="text-garage-ink" />
        <a
          href="https://www.instagram.com/garage1880_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-bold text-garage-black transition-colors hover:text-garage-lilac"
        >
          @garage1880_
        </a>
      </div>

      <div className="hide-scroll -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {photos.map((photo) => (
          <a
            key={photo.src}
            href="https://www.instagram.com/garage1880_/"
            target="_blank"
            rel="noopener noreferrer"
            data-ig-item
            className="group relative aspect-square w-[200px] shrink-0 snap-start overflow-hidden border border-garage-border md:w-[240px]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="240px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
              <InstagramLogo
                size={28}
                weight="bold"
                className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
