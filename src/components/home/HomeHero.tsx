"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";
import ConsultTrigger from "@/components/ui/ConsultTrigger";
import ImageStack from "@/components/home/ImageStack";

export default function HomeHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!root || !media || !content) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      frame = window.requestAnimationFrame(() => {
        media.style.transform = `translate3d(${targetX * 9}px, ${targetY * 7}px, 0) scale(1.06)`;
        content.style.transform = `translate3d(${targetX * 4}px, ${targetY * 3}px, 0)`;
        animate();
      });
    };

    const handleMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.55;
      targetY = y * 0.55;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    root.addEventListener("mousemove", handleMove);
    root.addEventListener("mouseleave", handleLeave);
    animate();

    return () => {
      root.removeEventListener("mousemove", handleMove);
      root.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={rootRef} className="relative isolate min-h-[95vh] overflow-hidden">
      {/* Video background */}
      <div ref={mediaRef} className="absolute inset-0 -z-20 will-change-transform">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full min-h-full min-w-full object-cover"
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[rgb(var(--garage-hero-dark))]/75" />
      </div>

      <ContentContainer>
        <div
          ref={contentRef}
          className="relative z-10 flex min-h-[95vh] items-center will-change-transform"
        >
          <div className="grid w-full gap-10 py-28 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
            {/* Left — text */}
            <div className="max-w-xl">
              <Reveal preset="fade">
                <h1>
                  <img
                    src="/images/brand/garagelogowhite.png"
                    alt="Garage 1880"
                    className="w-full max-w-md h-auto"
                  />
                </h1>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="type-subtitle mt-5 text-white/60">
                  Personal Training in Sunnyside
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                  Sustainable fitness plans designed for real life. Aim for 1% better every day.
                </p>
              </Reveal>
              <Reveal delay={0.16} className="mt-10">
                <ConsultTrigger size="lg" magnetic />
              </Reveal>
            </div>

            {/* Right — stacked images (desktop) */}
            <ImageStack />

            {/* Mobile fallback image */}
            <div className="relative h-[340px] overflow-hidden border border-white/15 lg:hidden">
              <Image
                src="/images/hero/hero-2.jpg"
                alt="Personal training at Garage 1880"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 0px"
                priority
              />
            </div>
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
