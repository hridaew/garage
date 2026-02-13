"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import ConsultTrigger from "@/components/ui/ConsultTrigger";
import ContentContainer from "@/components/layout/ContentContainer";
import NavigationLink from "@/components/motion/NavigationLink";

const links = [
  { href: "/personal-training", label: "Services" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us-about-fitness", label: "Contact" },
  { href: "/fitnessblog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dockRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted || !dockRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Refresh ScrollTrigger instances on route change
      ScrollTrigger.refresh();

      const intro = gsap.fromTo(
        dockRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.52, ease: "power2.out" }
      );

      const trigger = ScrollTrigger.create({
        start: 40,
        end: "max",
        onUpdate: (self) => {
          if (!dockRef.current) return;
          gsap.to(dockRef.current, {
            y: self.direction === 1 ? 7 : 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      cleanup = () => {
        intro.kill();
        trigger.kill();
      };
    };

    run();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [pathname]);

  return (
    <>
      <nav
        ref={dockRef}
        className="fixed bottom-6 left-1/2 z-50 w-full -translate-x-1/2"
        aria-label="Primary"
      >
        <ContentContainer>
          <div className="rounded-[1.1rem] border border-[#d2d4de] bg-white/85 px-5 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-xl md:px-6">
            <div className="flex items-center justify-between gap-4">
              <NavigationLink
                href="/"
                className="block shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/transparentlogo.png"
                  alt="Garage 1880"
                  className="h-8 w-auto md:h-10"
                />
              </NavigationLink>

              <div className="hidden items-center gap-2 md:flex">
                {links.map((link) => (
                  <NavigationLink
                    key={link.href}
                    href={link.href}
                    className="rounded-[0.75rem] px-5 py-2.5 text-[15px] font-bold text-garage-ink transition-all hover:bg-garage-light hover:text-garage-black active:scale-[0.98] active:bg-[#ebe7fb] focus-visible:ring-2 focus-visible:ring-garage-lilac"
                  >
                    {link.label}
                  </NavigationLink>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <ConsultTrigger size="md" magnetic />
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[0.7rem] border border-garage-border bg-white text-garage-black transition-colors hover:bg-garage-light active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-garage-lilac md:hidden"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  aria-expanded={mobileOpen}
                  aria-label="Toggle mobile menu"
                >
                  {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
                </button>
              </div>
            </div>
          </div>
        </ContentContainer>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-white px-8 pb-16 pt-24 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-sm flex-col">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-garage-gray">
            Navigate
          </p>
          <div className="space-y-3">
            {links.map((link) => (
              <NavigationLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-[0.95rem] border border-garage-border px-5 py-4 text-2xl font-display font-bold text-garage-black transition-colors hover:border-garage-lilac focus-visible:ring-2 focus-visible:ring-garage-lilac"
              >
                {link.label}
              </NavigationLink>
            ))}
          </div>
          <div className="mt-auto">
            <ConsultTrigger size="lg" buttonClassName="w-full justify-center" />
          </div>
        </div>
      </div>
    </>
  );
}
