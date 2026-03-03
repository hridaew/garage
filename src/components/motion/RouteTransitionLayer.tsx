"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  const pendingHref = useRef<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // When pathname changes after router.push and we're in "covered" state, reveal
  useEffect(() => {
    if (state !== "covered") return;
    window.scrollTo(0, 0);
    // Small delay to ensure the new page content has rendered
    requestAnimationFrame(() => {
      setState("revealing");
    });
  }, [pathname, state]);

  const handleTransitionEnd = useCallback(() => {
    if (state === "covering") {
      // Curtain is fully opaque — navigate
      setState("covered");
      if (pendingHref.current) {
        router.push(pendingHref.current);
        pendingHref.current = null;
      }
    } else if (state === "revealing") {
      setState("idle");
    }
  }, [state, router]);

  const navigateTo = useCallback(
    (href: string) => {
      if (state !== "idle") return;
      if (href === pathname) return;

      pendingHref.current = href;

      if (reducedMotion) {
        // Skip animation — navigate instantly
        router.push(href);
        pendingHref.current = null;
        window.scrollTo(0, 0);
        return;
      }

      setState("covering");
    },
    [state, pathname, router, reducedMotion]
  );

  const curtainOpacity = state === "covering" || state === "covered" ? 1 : 0;
  const curtainPointerEvents = state === "idle" ? "none" : "auto";

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <div className="relative min-h-screen overflow-x-clip">
        {children}
      </div>
      <div
        className="fixed inset-0 z-[60] bg-[rgb(var(--garage-canvas))]"
        style={{
          opacity: curtainOpacity,
          pointerEvents: curtainPointerEvents as React.CSSProperties["pointerEvents"],
          transition: reducedMotion ? "none" : "opacity 300ms ease-in-out",
        }}
        onTransitionEnd={handleTransitionEnd}
        aria-hidden
      />
    </TransitionContext.Provider>
  );
}
