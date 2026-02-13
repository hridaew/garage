"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const TILE_COUNT = 8;

export default function MosaicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Each tile gets a different multiplier for depth feel
    const multipliers = [6, -4, 5, -3, -5, 4, -6, 3];

    const tick = () => {
      if (reducedMotion.current) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.06);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.06);

      const tiles = Array.from(el.querySelectorAll<HTMLElement>("[data-mosaic-tile]"));
      tiles.forEach((tile, i) => {
        const m = multipliers[i] ?? 0;
        const mx = mouseCurrent.current.x * m;
        const my = mouseCurrent.current.y * (m * 0.5);
        tile.style.translate = `${mx}px ${my}px`;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseTarget.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseTarget.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 md:grid-cols-4 md:grid-rows-2"
      aria-hidden
    >
      {Array.from({ length: TILE_COUNT }, (_, n) => (
        <div key={n} className="relative overflow-hidden" data-mosaic-tile>
          <Image
            src={`/images/about/mosaic/${n + 1}.jpg`}
            alt=""
            fill
            className="object-cover"
            sizes="25vw"
          />
        </div>
      ))}
    </div>
  );
}
