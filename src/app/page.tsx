import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import HomeHero from "@/components/home/HomeHero";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Testimonials from "@/components/home/Testimonials";
import ConsultTrigger from "@/components/ui/ConsultTrigger";
import ContentContainer from "@/components/layout/ContentContainer";
import InstagramFeed from "@/components/home/InstagramFeed";

const gallery = [
  {
    src: "/images/gallery/gym-floor.jpg",
    label: "The Main Floor",
    alt: "Garage 1880 gym floor",
  },
  {
    src: "/images/gallery/equipment.jpg",
    label: "Equipment",
    alt: "Training equipment at Garage 1880",
  },
  {
    src: "/images/gallery/community.jpg",
    label: "Community",
    alt: "Garage 1880 community",
    rotation: "-90deg" as const,
  },
];

const services = [
  {
    title: "Personal Training",
    image: "/images/services/personal-training.jpg",
    alt: "One to one personal training",
    paragraphs: [
      "One-to-one personal training is the primary service offered at Garage 1880. We recognize that everyone is different and work hard to provide the most individualized approach to wellness possible.",
      "The experience and expertise our trainers provide gives you access to the best and most effective personal training in Denver.",
    ],
  },
  {
    title: "Nutrition Coaching",
    image: "/images/services/nutrition.jpg",
    alt: "Nutrition coaching",
    paragraphs: [
      "Nutrition is a critical piece of any fitness journey. Our coaches help you build sustainable eating habits that complement your training goals.",
      "No crash diets or extreme restrictions. We focus on practical, real-world nutrition strategies that fit your lifestyle and help you perform at your best.",
    ],
  },
];

export default function Home() {
  return (
    <SiteShell>
      <HomeHero />

      {/* Philosophy */}
      <section className="section-space-lg bg-white">
        <ContentContainer className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="max-w-[500px] space-y-6">
              <p className="type-label text-garage-blue">Our Philosophy</p>
              <h2 className="type-h2 text-garage-black">Aim for 1% better.</h2>
              <p className="type-body-lg text-garage-gray">
                There are no quick fixes that lead to lasting change. At Garage 1880, you won&apos;t find
                cookie-cutter plans, unsustainable methods, or extremes.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="sm:translate-y-8">
              <article className="overflow-hidden border border-garage-border bg-white">
                <div className="relative h-[360px]">
                  <Image
                    src="/images/philosophy/training-1.jpg"
                    alt="Training with weights"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="overflow-hidden border border-garage-border bg-white">
                <div className="relative h-[360px]">
                  <Image
                    src="/images/philosophy/training-2.jpg"
                    alt="Garage 1880 training"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1} className="sm:col-span-2">
              <div className="border border-garage-border bg-garage-light px-6 py-7 text-garage-gray md:px-8">
                <p className="type-body">
                  What you will find is a team that meets you where you are. Change takes time. We&apos;re here to create habits and results for life.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="border border-garage-border bg-white px-6 py-6">
                <h3 className="type-h3 text-garage-black">Real Focus</h3>
                <p className="mt-2 type-body text-garage-gray">
                  Private sessions where the attention is 100% on your form.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="border border-garage-border bg-white px-6 py-6">
                <h3 className="type-h3 text-garage-black">Sustainable</h3>
                <p className="mt-2 type-body text-garage-gray">
                  Plans built around your life, not the other way around.
                </p>
              </div>
            </Reveal>
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
            title="Personal Training & Nutrition Coaching"
            description="We take a holistic approach to personal training at Garage 1880."
            align="center"
            className="mx-auto"
          />
          <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.07} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden border border-garage-border bg-white">
                  <div className="relative h-[480px]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex h-full flex-col p-6">
                    <h3 className="type-h3 text-garage-black">{service.title}</h3>
                    <div className="mt-4 grow space-y-3 type-body text-garage-gray">
                      {service.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
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
