import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInUp from "@/components/ui/FadeInUp";

export const metadata: Metadata = {
  title: "About Us | Best Personal Training in Sunnyside",
  description:
    "Meet the Garage 1880 team. Founded by Allie with a vision to provide the highest quality personal training by attracting the highest quality trainers.",
};

const team = [
  {
    name: "Veronica Attanasio",
    role: "Personal Training Director",
    bio: "Veronica specializes in muscular endurance, strength, and hypertrophy training. Originally from Miami, FL, she trained at Equinox as a Tier3+ trainer.",
    certs: "AFPA, NASM, PNL1, PPSC, AED, CPR",
  },
  {
    name: "Rebekah Mclain",
    role: "Lead Trainer",
    bio: "With nearly ten years of experience, Rebekah specializes in strength and hypertrophy training. She also has experience helping endurance athletes optimize their gym workouts.",
    certs: "",
  },
  {
    name: "Walter Bryant",
    role: "Trainer",
    bio: "Walter brings energy and expertise to every session, helping clients push past their limits while maintaining proper form and technique.",
    certs: "",
  },
  {
    name: "Derrick",
    role: "Trainer",
    bio: "Derrick focuses on building functional strength and helping clients develop confidence in their training journey.",
    certs: "",
  },
];

export default function AboutUsPage() {
  return (
    <div className="pb-32">
      <Navbar />

      {/* Hero */}
      <div className="bg-garage-black text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeInUp>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Our Story
            </h1>
          </FadeInUp>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInUp>
            <div className="text-lg text-garage-gray leading-relaxed space-y-6">
              <p>
                As you may have guessed from our name, Garage 1880 started in an
                actual garage. But before we were even in a garage, our founder
                Allie was working at training studios, commercial gyms, and
                building up her own clientele through social media.
              </p>
              <p>
                As Allie worked at different studios and gyms she saw the same
                pattern over and over again: Trainers were not able to make
                enough money when they got started to pay for basic needs, so
                they picked up side jobs. This led to trainers having little
                energy to focus on their personal training clients and eventually
                quitting personal training.
              </p>
              <p className="font-bold text-garage-black text-xl">
                Allie opened Garage 1880 with the vision of being able to
                provide the highest quality training by attracting the highest
                quality trainers.
              </p>
              <p>
                The best way to do that? Pay a fair and livable wage day one.
                Provide high quality continuing education, create a team
                environment with monthly seminars and create the standard of
                listening to clients and addressing needs on a personalized,
                case-by-case, basis.
              </p>
              <p className="italic">
                We take care of our trainers so they can take care of you!
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-garage-light">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInUp className="text-center mb-16">
            <span className="text-garage-blue font-bold uppercase tracking-wider text-xs mb-3 block">
              The Team
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-garage-black tracking-tight">
              Meet Our Trainers
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <FadeInUp
                key={member.name}
                delay={i * 100}
                className="bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-hover transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 shrink-0 rounded-2xl bg-garage-light flex items-center justify-center text-garage-blue text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-garage-black">
                      {member.name}
                    </h3>
                    <p className="text-garage-blue font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-garage-gray text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    {member.certs && (
                      <p className="text-xs text-garage-gray mt-3">
                        <span className="font-semibold">Certs:</span>{" "}
                        {member.certs}
                      </p>
                    )}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
