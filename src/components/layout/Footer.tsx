import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";
import NavigationLink from "@/components/motion/NavigationLink";

export default function Footer() {
  return (
    <footer className="border-t border-garage-border bg-white pt-20">
      <ContentContainer className="pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <Reveal>
            <div className="space-y-4">
              <h5 className="font-display text-xl font-black text-garage-black">GARAGE 1880</h5>
              <p className="text-sm text-garage-gray">Sunnyside, Denver</p>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-garage-black">Services</h4>
              <ul className="mt-5 space-y-3 text-sm text-garage-gray">
                <li>
                  <NavigationLink href="/personal-training" className="hover:text-garage-blue hover:underline">
                    Personal Training
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/personal-training" className="hover:text-garage-blue hover:underline">
                    Nutrition Coaching
                  </NavigationLink>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-garage-black">Support</h4>
              <ul className="mt-5 space-y-3 text-sm text-garage-gray">
                <li>
                  <a href="tel:7207456158" className="hover:text-garage-blue hover:underline">
                    (720) 745-6158
                  </a>
                </li>
                <li>
                  <NavigationLink href="/contact-us-about-fitness" className="hover:text-garage-blue hover:underline">
                    Contact Us
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/fitnessblog" className="hover:text-garage-blue hover:underline">
                    Blog
                  </NavigationLink>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-garage-black">Hours</h4>
              <ul className="mt-5 space-y-2 text-sm text-garage-gray">
                <li className="flex justify-between max-w-[180px]">
                  <span>Mon - Fri</span> <span>6am - 7pm</span>
                </li>
                <li className="flex justify-between max-w-[180px]">
                  <span>Saturday</span> <span>Closed</span>
                </li>
                <li className="flex justify-between max-w-[180px]">
                  <span>Sunday</span> <span>Closed</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-garage-black">Visit Us</h4>
              <address className="mt-5 not-italic text-sm leading-relaxed text-garage-gray">
                4255 Jason St Unit B
                <br />
                Sunnyside, Denver, CO 80211
              </address>
              <div className="mt-6 flex space-x-3">
                  <a
                    href="https://www.instagram.com/garage1880_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-colors hover:border-garage-blue hover:text-garage-blue active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-garage-lilac"
                    aria-label="Garage 1880 Instagram"
                  >
                    <InstagramLogo weight="fill" size={22} />
                  </a>
                  <a
                    href="https://www.facebook.com/Garage1880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-colors hover:border-garage-blue hover:text-garage-blue active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-garage-lilac"
                    aria-label="Garage 1880 Facebook"
                  >
                    <FacebookLogo weight="fill" size={22} />
                  </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-garage-border pt-8 text-xs font-medium text-garage-gray md:flex-row md:items-center">
            <p>&copy;2025 Garage 1880</p>
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-garage-black">
                Privacy
              </Link>
              <Link href="#" className="hover:text-garage-black">
                Terms
              </Link>
            </div>
          </div>
        </Reveal>
      </ContentContainer>
    </footer>
  );
}
