"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

type TransitionState = "idle" | "covering" | "covered" | "revealing";

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

interface RouteTransitionLayerProps {
  children: React.ReactNode;
}

export default function RouteTransitionLayer({ children }: RouteTransitionLayerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<TransitionState>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<TransitionState>("idle");
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const targetPathRef = useRef<string | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const updateState = useCallback((nextState: TransitionState) => {
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const clearFallbackTimer = useCallback(() => {
    if (!fallbackTimerRef.current) return;
    window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = null;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.set(overlay, { autoAlpha: 0, xPercent: -100 });

    return () => {
      timelineRef.current?.kill();
      clearFallbackTimer();
    };
  }, [clearFallbackTimer]);

  const reveal = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      updateState("idle");
      return;
    }

    clearFallbackTimer();
    timelineRef.current?.kill();
    updateState("revealing");
    window.scrollTo(0, 0);

    if (reducedMotion) {
      gsap.set(overlay, { autoAlpha: 0, xPercent: -100 });
      updateState("idle");
      targetPathRef.current = null;
      return;
    }

    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0, xPercent: -100 });
          targetPathRef.current = null;
          updateState("idle");
        },
      })
      .to(overlay, { xPercent: 100, duration: 0.46 }, 0);
  }, [clearFallbackTimer, reducedMotion, updateState]);

  useEffect(() => {
    if (state !== "covered") return;
    if (targetPathRef.current && pathname !== targetPathRef.current) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(reveal);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [pathname, state, reveal]);

  const navigateTo = useCallback(
    (href: string) => {
      if (stateRef.current !== "idle") return;

      const target = new URL(href, window.location.origin);
      const current = new URL(window.location.href);
      if (target.origin !== current.origin) {
        window.location.href = href;
        return;
      }

      if (target.pathname === pathname && target.search === current.search && target.hash) {
        window.location.hash = target.hash;
        return;
      }

      if (target.pathname === pathname && target.search === current.search && !target.hash) return;

      targetPathRef.current = target.pathname;
      timelineRef.current?.kill();
      updateState("covering");

      if (reducedMotion) {
        gsap.set(overlayRef.current, { autoAlpha: 1, xPercent: 0 });
        updateState("covered");
        router.push(href);
        return;
      }

      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        updateState("idle");
        return;
      }

      gsap.set(overlay, { autoAlpha: 1, xPercent: -100 });

      timelineRef.current = gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            updateState("covered");
            router.push(href);
            fallbackTimerRef.current = window.setTimeout(reveal, 1500);
          },
        })
        .to(overlay, { xPercent: 0, duration: 0.42 }, 0);
    },
    [pathname, router, reducedMotion, reveal, updateState]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <div className="relative min-h-screen overflow-x-clip">
        {children}
      </div>
      <div
        ref={overlayRef}
        data-transition-state={state}
        className="fixed inset-0 z-[1000] pointer-events-auto bg-garage-black"
        aria-hidden
      />
    </TransitionContext.Provider>
  );
}
