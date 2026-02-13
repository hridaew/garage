import Image from "next/image";
import {
  Clock,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import SiteShell from "@/components/layout/SiteShell";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContentContainer from "@/components/layout/ContentContainer";

export default function ContactPage() {
  return (
    <SiteShell>
      {/* Dark hero — left-aligned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/gallery/gym-floor.jpg"
            alt="Garage 1880 gym"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgb(var(--garage-hero-dark))]/70" />
        </div>

        <ContentContainer>
          <div className="flex min-h-[60vh] items-center py-28 md:py-32">
            <div className="max-w-xl">
              <Reveal>
                <h1 className="type-h1 text-white">Contact Us</h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                  Ready to start your fitness journey? Get in touch and we&apos;ll
                  help you take the first step.
                </p>
              </Reveal>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-lg bg-white">
        <ContentContainer className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-8 border border-garage-border bg-white p-8">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-garage-black">
                  <Phone weight="fill" className="text-garage-black" />
                  Call Us
                </h3>
                <a
                  href="tel:7207456158"
                  className="text-lg text-garage-gray transition-colors hover:text-garage-blue"
                >
                  (720) 745-6158
                </a>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-garage-black">
                  <MapPin weight="fill" className="text-garage-black" />
                  Visit Us
                </h3>
                <address className="not-italic leading-relaxed text-garage-gray">
                  4255 Jason St Unit B
                  <br />
                  Sunnyside, Denver, CO 80211
                </address>
              </div>

              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-garage-black">
                  <Clock weight="fill" className="text-garage-black" />
                  Hours
                </h3>
                <ul className="space-y-1 text-garage-gray">
                  <li className="flex justify-between max-w-[200px]">
                    <span>Mon - Fri</span> <span>6am - 7pm</span>
                  </li>
                  <li className="flex justify-between max-w-[200px]">
                    <span>Saturday</span> <span>Closed</span>
                  </li>
                  <li className="flex justify-between max-w-[200px]">
                    <span>Sunday</span> <span>Closed</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-garage-black">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/garage1880_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-all hover:border-garage-blue hover:text-garage-blue"
                    aria-label="Garage 1880 Instagram"
                  >
                    <InstagramLogo weight="fill" size={22} />
                  </a>
                  <a
                    href="https://www.facebook.com/Garage1880"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-garage-border text-garage-black transition-all hover:border-garage-blue hover:text-garage-blue"
                    aria-label="Garage 1880 Facebook"
                  >
                    <FacebookLogo weight="fill" size={22} />
                  </a>
                </div>
              </div>

              <div className="h-64 overflow-hidden border border-garage-border bg-garage-light">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3!2d-105.01!3d39.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z4255+Jason+St+Unit+B+Denver+CO+80211!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Garage 1880 Location"
                />
              </div>
            </div>
          </Reveal>
        </ContentContainer>
      </section>
    </SiteShell>
  );
}
