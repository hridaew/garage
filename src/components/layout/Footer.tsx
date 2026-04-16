import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";
import NavigationLink from "@/components/motion/NavigationLink";
import EasterEgg from "@/components/ui/EasterEgg";
import EmailCopyToast from "@/components/ui/EmailCopyToast";
import { siteAddressLines, siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-garage-border bg-white pt-20">
      <ContentContainer className="pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <Reveal>
            <div className="space-y-4">
              <h5 className="font-display text-xl font-black text-garage-black">GARAGE <EasterEgg /></h5>
              <p className="text-sm text-garage-gray">{siteConfig.address.neighborhood}, {siteConfig.address.locality}</p>
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
                  <EmailCopyToast />
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
                  <span>Mon - Fri</span> <span>{siteConfig.hours.weekdays.display}</span>
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
                {siteAddressLines[0]}
                <br />
                {siteAddressLines[1]}
              </address>
              <div className="mt-6 flex space-x-3">
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-colors hover:border-garage-blue hover:text-garage-blue active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-garage-lilac"
                  aria-label={`${siteConfig.name} Instagram`}
                >
                  <InstagramLogo weight="fill" size={22} />
                </a>
                <a
                  href={siteConfig.social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-colors hover:border-garage-blue hover:text-garage-blue active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-garage-lilac"
                  aria-label={`${siteConfig.name} Facebook`}
                >
                  <FacebookLogo weight="fill" size={22} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex items-center justify-between border-t border-garage-border pt-8 text-xs font-medium text-garage-gray">
            <p>&copy;{new Date().getFullYear()} {siteConfig.name}</p>
          </div>
        </Reveal>
      </ContentContainer>
    </footer>
  );
}
