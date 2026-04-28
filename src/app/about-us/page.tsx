import { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";
import { trainers } from "@/components/services/trainers-data";
import MosaicBackground from "@/components/about/MosaicBackground";

export const metadata: Metadata = {
  title: "About Us | Best Personal Training in Sunnyside",
  description:
    "Meet the Garage 1880 team. Founded by Allie with a vision to provide the highest quality personal training by attracting the highest quality trainers.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us | Garage 1880",
    description:
      "Meet the Garage 1880 team. Founded by Allie with a vision to provide the highest quality personal training by attracting the highest quality trainers.",
    url: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <SiteShell>
      {/* Dark hero — left-aligned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/about/team.jpg"
            alt="Garage 1880 team"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgb(var(--garage-hero-dark))]/70" />
        </div>

        <ContentContainer>
          <div className="flex min-h-[56vh] items-center py-28 md:py-32">
            <div className="max-w-xl">
              <Reveal>
                <h1 className="type-h1 text-white">Our Story</h1>
              </Reveal>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-lg relative overflow-hidden">
        {/* Mosaic background */}
        <MosaicBackground />

        <ContentContainer className="relative z-10">
          <Reveal preset="slide-right" duration={0.65}>
            <article className="mx-auto max-w-3xl border border-garage-border bg-white px-7 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.10)] md:px-12 md:py-14">
              <p className="type-label text-garage-blue">Our Origin</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-garage-black md:text-5xl">
                Built to deliver better training.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-garage-gray">
                Garage 1880 started with a simple idea: when trainers are supported well, clients receive better care.
              </p>

              <div className="mt-10 space-y-6 border-t border-garage-border pt-9 type-body text-garage-gray">
                <p>
                  As you may have guessed from our name, Garage 1880 started in an actual garage. But before we were
                  even in a garage, our founder Allie was working at training studios, commercial gyms, and building up
                  her own clientele through social media.
                </p>
                <p>
                  As Allie worked at different studios and gyms she saw the same pattern over and over again: Trainers
                  were not able to make enough money when they got started to pay for basic needs, so they picked up
                  side jobs. This led to trainers having little energy to focus on their personal training clients and
                  eventually quitting personal training.
                </p>
              </div>

              <div className="my-10 space-y-6 type-body text-garage-gray">
                <p>
                  Allie opened Garage 1880 with the vision of being able to provide the highest quality training by
                  attracting the highest quality trainers.
                </p>
                <p>
                  The best way to do that? Pay a fair and livable wage day one. Provide high quality continuing
                  education, create a team environment with monthly seminars and create the standard of listening to
                  clients and addressing needs on a personalized, case-by-case, basis.
                </p>
                <p>We take care of our trainers so they can take care of you!</p>
              </div>
            </article>
          </Reveal>
        </ContentContainer>
      </section>

      <section className="section-space-md">
        <ContentContainer>
          <Reveal>
            <h2 className="type-h2 text-garage-black">Meet Our Trainers</h2>
          </Reveal>
          <div className="mt-12 space-y-5">
            {trainers.map((trainer, index) => (
              <Reveal key={trainer.id} delay={index * 0.04}>
                <article className="border border-garage-border bg-white p-6 md:p-7">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="md:w-[300px] md:shrink-0">
                      <div className="flex items-center gap-4 md:block md:text-center">
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border border-garage-border bg-garage-panel md:mx-auto md:h-40 md:w-40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={trainer.image} alt={trainer.name} className="h-full w-full object-cover" style={trainer.objectPosition ? { objectPosition: trainer.objectPosition } : undefined} />
                        </div>
                        <div className="md:mt-4">
                          <h3 className="type-h3 text-garage-black">{trainer.name}</h3>
                          <p className="mt-2 type-label text-garage-blue">{trainer.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 border-t border-garage-border pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                      <p className="type-body text-garage-gray">{trainer.bio}</p>
                      <p className="mt-4 type-body text-garage-gray">
                        <span className="font-semibold text-garage-black">Certs:</span> {trainer.certs}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </ContentContainer>
      </section>
    </SiteShell>
  );
}
