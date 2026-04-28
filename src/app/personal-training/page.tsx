import { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/layout/SiteShell";
import Reveal from "@/components/motion/Reveal";
import ConsultTrigger from "@/components/ui/ConsultTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import ContentContainer from "@/components/layout/ContentContainer";
import TrainerGrid from "@/components/services/TrainerGrid";
import MovementAssessmentForm from "@/components/services/MovementAssessmentForm";
import PremiumButton from "@/components/ui/PremiumButton";

const services = [
  {
    title: "Personal Training",
    image: "/images/services/personal-training.jpg",
    alt: "One-to-one personal training at Garage 1880",
    paragraphs: [
      "One-to-one personal training is the primary service offered at Garage 1880. We recognize that everyone is different and work hard to provide the most individualized approach to wellness possible.",
      "The experience and expertise our trainers provide, gives you access to the best and most effective personal training in Denver.",
      "Full Programming: Workouts are provided for clients to do on their own even when they are traveling.",
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

const expandedServices = [
  {
    title: "Open Gym",
    subtitle: "FRIDAY 5PM — SUNDAY MIDNIGHT",
    body: "Train on your own time with full access to the space throughout the weekend. Whether you're getting an extra lift in or following your program independently, open gym gives you the flexibility to stay consistent—without adding more to your schedule.",
    note: "Included for all subscription personal training clients.",
    cta: "Become a client",
  },
  {
    title: "Programming",
    subtitle: "SUPPORT BEYOND YOUR SESSIONS",
    body: "Your progress shouldn't stop when you leave the gym. All subscription clients receive fully individualized programming delivered through the Garage1880 app—so your workouts are always accessible, whether you're in the gym, at home, or traveling.",
    extra: "Looking for programming with occasional in-person guidance? We offer options that include form check sessions so you can stay confident and on track.",
    cta: "Start with a consultation",
  },
  {
    title: "Online Programming",
    subtitle: "TRAIN WITH US—FROM ANYWHERE",
    body: "Not based in Denver? You can still train with Garage1880. Our online programming is delivered through the Garage1880 app, giving you access to a personalized plan, progress tracking, and ongoing support—no matter where you are.",
    extra: "We recommend starting with a virtual consultation so we can build a plan that's actually designed for you—not pulled from a template.",
    cta: "Book a virtual consultation",
  },
];

const processSteps = [
  "Just like working with any professional, being matched with the right personal trainer is key to having an enjoyable and successful training experience. We take great care in order to ensure we match you with the right personal trainer for you!",
  "We start the matching process as soon as we receive your training inquiry by sending you a questionnaire that covers your goals, workout history, injuries and preferences.",
  "Once you've completed our questionnaire we set up a movement assessment with the personal trainer we have selected, based on your answers. Our movement assessment screens for a variety of things including any muscle imbalances, mobility limitations and gives us insight on how to best program for you.",
  "When your movement assessment is completed, the trainer you have worked with will talk to you in more detail about your expectations and goals. Based on the trainer's evaluation they will either confirm you have been matched correctly, or pair you with a personal trainer better suited for you.",
];


export const metadata: Metadata = {
  title: "Services | Personal Training & Nutrition Coaching",
  description:
    "Personal training and nutrition coaching at Garage 1880 in Sunnyside, Denver. Holistic coaching, trainer matching, and movement assessment for long-term results.",
  alternates: { canonical: "/personal-training" },
  openGraph: {
    title: "Services | Personal Training & Nutrition Coaching | Garage 1880",
    description:
      "Personal training and nutrition coaching at Garage 1880 in Sunnyside, Denver. Holistic coaching, trainer matching, and movement assessment for long-term results.",
    url: "/personal-training",
  },
};

export default function PersonalTrainingPage() {
  return (
    <SiteShell>
      {/* Dark hero — left-aligned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/services/personal-training.jpg"
            alt="Personal training at Garage 1880"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgb(var(--garage-hero-dark))]/70" />
        </div>

        <ContentContainer>
          <div className="flex min-h-[66vh] items-center py-28 md:py-32">
            <div className="max-w-2xl">
              <Reveal>
                <p className="type-subtitle text-white/50">Services</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="type-h1 mt-4 text-white">Personal Training & Nutrition Coaching</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
                  We take a holistic approach to personal training at Garage 1880.
                </p>
              </Reveal>
              <Reveal delay={0.14} className="mt-9">
                <ConsultTrigger size="lg" magnetic />
              </Reveal>
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-md bg-white">
        <ContentContainer>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="type-h2 text-garage-black">Personal Trainers at Garage 1880</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mx-auto mt-6 max-w-3xl space-y-4 type-body text-garage-gray">
                <p>We take a holistic approach to personal training at Garage 1880.</p>
                <p>
                  Our personal trainers aim to help our clients gain confidence, develop a positive relationship with
                  exercise, and improve mobility, strength, and endurance.
                </p>
                <p className="italic">
                  We want clients to feel good in their body and movements for longevity and overall health.
                </p>
              </div>
            </Reveal>
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-md">
        <ContentContainer>
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.08} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden border border-garage-border bg-white">
                  <div className="relative h-[480px]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex h-full flex-col p-6">
                    <h3 className="type-h3 text-garage-black">{service.title}</h3>
                    <div className="mt-4 space-y-4 type-body text-garage-gray">
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

      <section className="section-space-md">
        <ContentContainer>
          <SectionHeading
            eyebrow="Services"
            title="Training support that follows you"
            description="Garage 1880 clients get more than time on the gym floor. These options help you stay consistent between sessions, through travel, and from anywhere."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {expandedServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col border border-garage-border bg-white p-6 md:p-7">
                  <p className="type-label text-garage-blue">{service.title}</p>
                  <h3 className="mt-3 type-h3 text-garage-black">{service.subtitle}</h3>
                  <div className="mt-4 grow space-y-4 type-body text-garage-gray">
                    <p>{service.body}</p>
                    {service.extra ? <p>{service.extra}</p> : null}
                    {service.note ? (
                      <p className="text-sm font-semibold text-garage-black">{service.note}</p>
                    ) : null}
                  </div>
                  <div className="mt-7">
                    <PremiumButton href="/contact-us-about-fitness" variant="ghost" className="w-full">
                      {service.cta}
                    </PremiumButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-md bg-white">
        <ContentContainer>
          <SectionHeading
            eyebrow="How It Works"
            title="Our Personal Training Process"
            description="Being matched with the right personal trainer is key to an enjoyable and successful training experience."
          />
          <div className="relative mt-10">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-garage-lilac/30 md:left-6" aria-hidden />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <Reveal key={step} delay={index * 0.06}>
                  <div className="relative flex gap-5 md:gap-7">
                    {/* Timeline circle */}
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-garage-lilac text-sm font-bold text-white shadow-[0_0_0_4px_rgb(var(--garage-canvas))] md:h-12 md:w-12 md:text-base" aria-hidden>
                      {index + 1}
                    </div>
                    {/* Content card */}
                    <article className="flex-1 border-l-4 border-garage-lilac/40 bg-white px-6 py-5 border border-garage-border md:px-7">
                      <p className="type-body text-garage-ink">{step}</p>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-md">
        <ContentContainer>
          <SectionHeading
            eyebrow="Team"
            title="Meet Our Trainers"
            description="All active trainers currently listed on Garage 1880."
            align="left"
          />
          <div className="mt-10">
            <TrainerGrid />
          </div>
        </ContentContainer>
      </section>

      <section className="section-space-md bg-white">
        <ContentContainer>
          <Reveal>
            <h2 className="type-h2 text-garage-black">Set Up a Movement Assessment!</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-3xl type-body text-garage-gray">
              Start with a quick form and our team will match you with the right trainer for your goals.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <MovementAssessmentForm />
          </Reveal>
        </ContentContainer>
      </section>
    </SiteShell>
  );
}
