import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInUp from "@/components/ui/FadeInUp";

export const metadata: Metadata = {
  title: "Personal Training | LoHi Fitness & Gym",
  description:
    "Personal training and nutrition coaching at Garage 1880 in Sunnyside, Denver. Holistic approach to fitness for lasting results.",
};

export default function PersonalTrainingPage() {
  return (
    <div className="pb-32">
      <Navbar />

      {/* Hero */}
      <div className="bg-garage-black text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Personal training at Garage 1880"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-garage-black via-garage-black/80 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeInUp>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Personal Training in Denver
            </h1>
          </FadeInUp>
          <FadeInUp delay={100}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We take a holistic approach to personal training at Garage 1880.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-garage-black mb-6">
              Personal Trainers at Garage 1880
            </h2>
          </FadeInUp>
          <FadeInUp delay={100}>
            <div className="text-lg text-garage-gray leading-relaxed space-y-4">
              <p>
                Our personal trainers aim to help our clients gain confidence,
                develop a positive relationship with exercise, and improve
                mobility, strength, and endurance.
              </p>
              <p className="italic">
                We want clients to feel good in their body and movements for
                longevity and overall health.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-garage-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Training */}
            <FadeInUp className="group bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-hover transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-garage-light rounded-2xl flex items-center justify-center text-garage-blue mb-6 group-hover:bg-garage-blue group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 256 256"><path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v56H96V64A16,16,0,0,0,80,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V136h64v56a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16Z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-garage-black mb-4">
                Personal Training
              </h3>
              <div className="text-garage-gray space-y-3">
                <p>
                  One-to-one personal training is the primary service offered at
                  Garage 1880. We recognize that everyone is different and work
                  hard to provide the most individualized approach to wellness
                  possible.
                </p>
                <p>
                  The experience and expertise our trainers provide gives you
                  access to the best and most effective personal training in
                  Denver.
                </p>
              </div>
              <Link
                href="/contact-us-about-fitness"
                className="inline-flex items-center text-base font-bold text-garage-black group-hover:text-garage-blue transition-colors mt-6"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </FadeInUp>

            {/* Nutrition Coaching */}
            <FadeInUp delay={150} className="group bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-hover transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-garage-light rounded-2xl flex items-center justify-center text-garage-warm mb-6 group-hover:bg-garage-warm group-hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-8,8H168a8,8,0,0,0-8,8v16.67a40,40,0,1,1-16,0V120a24,24,0,0,1,24-24h40V40a8,8,0,0,1,16,0v56h0A8,8,0,0,1,224,104ZM80,40a8,8,0,0,0-8,8V96H56V48a8,8,0,0,0-16,0V96H24V48a8,8,0,0,0-16,0v64a24,24,0,0,0,24,24h8v80a8,8,0,0,0,16,0V136h8a24,24,0,0,0,24-24V48A8,8,0,0,0,80,40Z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-garage-black mb-4">
                Nutrition Coaching
              </h3>
              <div className="text-garage-gray space-y-3">
                <p>
                  Nutrition is a critical piece of any fitness journey. Our
                  coaches help you build sustainable eating habits that
                  complement your training goals.
                </p>
                <p>
                  No crash diets or extreme restrictions. We focus on practical,
                  real-world nutrition strategies that fit your lifestyle and
                  help you perform at your best.
                </p>
              </div>
              <Link
                href="/contact-us-about-fitness"
                className="inline-flex items-center text-base font-bold text-garage-black group-hover:text-garage-warm transition-colors mt-6"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-garage-black text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Ready to start?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Take the first step toward a healthier, stronger you.
            </p>
            <Link
              href="/contact-us-about-fitness"
              className="inline-block px-8 py-4 bg-garage-blue text-white text-lg font-bold rounded-full hover:bg-white hover:text-garage-blue transition-all shadow-glow hover:shadow-xl"
            >
              Book Your Session
            </Link>
          </FadeInUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
