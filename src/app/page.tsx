import Image from "next/image";
import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import HomeHero from "@/components/home/HomeHero";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Testimonials from "@/components/home/Testimonials";
import ConsultTrigger from "@/components/ui/ConsultTrigger";
import ContentContainer from "@/components/layout/ContentContainer";
import InstagramFeed from "@/components/home/InstagramFeed";
import PremiumButton from "@/components/ui/PremiumButton";

const homeTitle = "1:1 Personal Training in Denver | Garage1880";
const homeDescription =
  "Private 1:1 personal training in Denver built around sustainable strength, better movement, and real-life progress at Garage 1880.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Garage 1880",
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og-image.jpg"],
  },
};

const gallery = [
  {
    src: "/images/mainfloor.png",
    label: "The Main Floor",
    alt: "Garage 1880 gym floor",
  },
  {
    src: "/images/equipment.jpg",
    label: "Equipment",
    alt: "Training equipment at Garage 1880",
  },
  {
    src: "/images/gallery/community.jpg",
    label: "Community",
    alt: "Garage 1880 community",
  },
];

const valueProps = [
  {
    eyebrow: "Real Focus",
    title: "Private Sessions. Full Attention.",
    body: "Every session is 1:1, with your coach fully focused on you—your form, your movement, and your progress",
  },
  {
    eyebrow: "Sustainable",
    title: "Built Around Your Life",
    body: "Your training should support your life, not take it over. We create plans that are realistic and adaptable.",
  },
  {
    eyebrow: "Intentional Strength",
    title: "Build Strength That Lasts",
    body: "Strength that carries beyond the gym—on the trail, on the slopes, and in whatever matters most to you.",
  },
];

const serviceTeasers = [
  {
    title: "Open Gym",
    subtitle: "Friday 5PM — Sunday Midnight",
    body: "Train on your own time with full access to the space throughout the weekend.",
  },
  {
    title: "Programming",
    subtitle: "Support Beyond Your Sessions",
    body: "Subscription clients receive individualized programming through the Garage1880 app for training in the gym, at home, or on the road.",
  },
  {
    title: "Online Programming",
    subtitle: "Train With Us From Anywhere",
    body: "Not based in Denver? Get a personalized plan, progress tracking, and ongoing support through the Garage1880 app.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <HomeHero />

      {/* Philosophy */}
      <section className="section-space-lg bg-white">
        <ContentContainer>
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div className="max-w-[560px] space-y-6">
                <p className="type-label text-garage-blue">Our Philosophy</p>
                <h2 className="type-h2 text-garage-black">
                  Train different&mdash;because we train you.
                </h2>
                <p className="type-body-lg text-garage-gray">
                  The fitness industry is built on quick fixes and one-size-fits-all plans. We&apos;re not.
                </p>
                <p className="type-body-lg text-garage-gray">
                  At Garage 1880, you&apos;re not a number&mdash;you&apos;re an individual with your own goals,
                  history, and relationship to health.
                </p>
                <p className="type-body-lg text-garage-gray">
                  We listen first, then build a plan around you. No extremes&mdash;just thoughtful coaching and
                  lasting results.
                </p>
                <p className="type-body-lg text-garage-gray">
                  This is training designed for real life&mdash;and built to stay with you for it.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <Reveal className="sm:-translate-y-10 lg:-translate-y-14">
                <article className="overflow-hidden border border-garage-border bg-white shadow-soft">
                  <div className="relative h-[260px] sm:h-[380px] lg:h-[420px]">
                    <Image
                      src="/images/trainer1.png"
                      alt="Training with weights"
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.08} className="sm:translate-y-10 lg:translate-y-14">
                <article className="overflow-hidden border border-garage-border bg-white shadow-soft">
                  <div className="relative h-[240px] sm:h-[340px] lg:h-[380px]">
                    <Image
                      src="/images/trainer2.png"
                      alt="Garage 1880 training"
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                </article>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((item, index) => (
              <Reveal key={item.eyebrow} delay={index * 0.04} className="h-full">
                <article className="h-full border border-garage-border bg-white px-6 py-7">
                  <p className="type-label text-garage-blue">{item.eyebrow}</p>
                  <h3 className="mt-3 type-h3 text-garage-black">{item.title}</h3>
                  <p className="mt-3 type-body text-garage-gray">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Gallery — Where We Train */}
      <section className="section-space-lg">
        <ContentContainer>
          <SectionHeading eyebrow="The Space" title="Where We Train" align="center" />
          <div className="mt-20 grid gap-7 md:grid-cols-3">
            {gallery.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 0.06}
                className={index === 1 ? "md:translate-y-10" : ""}
              >
                <article className="group relative overflow-hidden border border-garage-border bg-white">
                  <div className="relative h-[450px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      style={
                        "rotation" in item && item.rotation
                          ? { transform: `rotate(${item.rotation}) scale(1.4)` }
                          : undefined
                      }
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent px-5 pb-5 pt-20">
                    <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      {item.label}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Services */}
      <section className="section-space-lg bg-white">
        <ContentContainer>
          <SectionHeading
            eyebrow="Services"
            title="More ways to stay consistent"
            description="Weekend access, custom programming, and remote support give you more flexibility without losing the personal coaching Garage 1880 is built on."
            align="center"
            className="mx-auto"
          />
          <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
            {serviceTeasers.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.07} className="h-full">
                <article className="flex h-full flex-col border border-garage-border bg-white p-6 md:p-7">
                  <p className="type-label text-garage-blue">{service.title}</p>
                  <h3 className="mt-3 text-2xl font-bold text-garage-black">{service.subtitle}</h3>
                  <p className="mt-4 grow type-body text-garage-gray">{service.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.18} className="mt-10 flex justify-center">
            <PremiumButton href="/personal-training" variant="ghost" size="lg">
              View all services
            </PremiumButton>
          </Reveal>
        </ContentContainer>
      </section>

      {/* Testimonials */}
      <section className="section-space-lg">
        <ContentContainer>
          <SectionHeading title="Testimonials" />
        </ContentContainer>
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section-space-md bg-white">
        <ContentContainer>
          <InstagramFeed />
        </ContentContainer>
      </section>

      {/* CTA */}
      <section className="section-space-md">
        <ContentContainer>
          <Reveal>
            <div className="relative overflow-hidden bg-garage-black px-8 py-16 text-center text-white md:px-12">
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/images/gallery/gym-floor.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10">
                <h2 className="type-h2 text-white">Ready to start?</h2>
                <p className="mx-auto mt-4 max-w-2xl type-body text-white/85">
                  Take the first step toward a healthier, stronger you.
                </p>
                <div className="mt-8">
                  <ConsultTrigger size="lg" magnetic />
                </div>
              </div>
            </div>
          </Reveal>
        </ContentContainer>
      </section>
    </SiteShell>
  );
}
