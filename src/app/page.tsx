import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInUp from "@/components/ui/FadeInUp";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="pb-32">
      <Navbar />

      {/* HERO */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-garage-black">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 scale-105">
            <source src="https://videos.pexels.com/video-files/8038769/8038769-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-garage-black via-transparent to-black/40" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-garage-blue/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-garage-warm/20 rounded-full blur-[80px] animate-pulse-slow mix-blend-screen pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <FadeInUp className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-semibold tracking-wide uppercase shadow-lg text-white">
            Since 2022 &bull; Sunnyside, Denver
          </FadeInUp>
          <FadeInUp delay={100}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.95] text-white mb-8 drop-shadow-2xl">
              Personal Training <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-garage-blue via-blue-200 to-white">in Sunnyside.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={200}>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-md">
              Sustainable fitness plans designed for real life.
            </p>
          </FadeInUp>
          <FadeInUp delay={300}>
            <Link href="/contact-us-about-fitness" className="inline-block px-8 py-4 bg-garage-blue text-white text-lg font-bold rounded-full hover:bg-white hover:text-garage-blue transition-all shadow-glow hover:shadow-xl transform hover:-translate-y-1 ring-4 ring-white/10 hover:ring-white/30">
              Book Your Session
            </Link>
          </FadeInUp>
        </div>

        <div className="absolute bottom-32 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 animate-bounce z-20 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" /></svg>
        </div>
      </header>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-white rounded-t-[3rem] -mt-10 relative z-30 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-garage-light rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <FadeInUp><span className="text-garage-blue font-bold uppercase tracking-wider text-xs mb-3 block">Our Philosophy</span></FadeInUp>
              <FadeInUp delay={75}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-garage-black mb-8 leading-tight tracking-tight">Aim for <br />1% better.</h2>
              </FadeInUp>
              <FadeInUp delay={100}>
                <div className="text-lg text-garage-gray leading-loose">
                  <p className="mb-6">There are no quick fixes that lead to lasting change. At Garage 1880, you won&apos;t find cookie-cutter plans, unsustainable methods, or extremes.</p>
                  <p>What you will find is a team that meets you where you are. Change takes time. We&apos;re here to create habits and results for life.</p>
                </div>
              </FadeInUp>
            </div>
            <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="space-y-8 md:mt-16">
                <FadeInUp delay={200} className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl img-hover-zoom bg-gray-100 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Training with weights" />
                </FadeInUp>
                <FadeInUp delay={300} className="p-8 bg-garage-light rounded-[2rem] border border-white shadow-soft">
                  <h3 className="font-bold text-xl mb-2">Real Focus</h3>
                  <p className="text-sm text-garage-gray">Private sessions where the attention is 100% on your form.</p>
                </FadeInUp>
              </div>
              <div className="space-y-8">
                <FadeInUp delay={300} className="p-8 bg-garage-light rounded-[2rem] border border-white shadow-soft">
                  <h3 className="font-bold text-xl mb-2">Sustainable</h3>
                  <p className="text-sm text-garage-gray">Plans built around your life, not the other way around.</p>
                </FadeInUp>
                <FadeInUp delay={500} className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl img-hover-zoom bg-gray-100 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" alt="Garage 1880 interior" />
                </FadeInUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeInUp className="text-center mb-16">
            <span className="text-garage-blue font-bold uppercase tracking-wider text-xs mb-3 block">The Space</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-garage-black tracking-tight">Where We Train</h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", label: "The Main Floor", alt: "Gym Floor", offset: false },
              { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop", label: "Equipment", alt: "Training Equipment", offset: true },
              { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop", label: "Community", alt: "Community", offset: false },
            ].map((item, i) => (
              <FadeInUp key={i} delay={100 * (i + 1)} className={`group relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer ${item.offset ? "md:translate-y-12" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.alt} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{item.label}</div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-garage-light relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto pt-8">
            <FadeInUp delay={100} className="group bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-hover transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-garage-light rounded-3xl flex items-center justify-center text-garage-blue text-4xl group-hover:bg-garage-blue group-hover:text-white transition-colors duration-300">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 256 256"><path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v56H96V64A16,16,0,0,0,80,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V136h64v56a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16Z"/></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-garage-black mb-6">Personal Training</h3>
                  <div className="text-lg text-garage-gray mb-8">
                    <p className="leading-relaxed">We take a holistic approach to personal training at Garage 1880. Our personal trainers aim to help our clients gain confidence, develop a positive relationship with exercise, and improve mobility, strength, and endurance.</p>
                    <p className="leading-relaxed mt-4">We want clients to feel good in their body and movements for longevity and overall health.</p>
                  </div>
                  <Link href="/personal-training" className="inline-flex items-center text-base font-bold text-garage-black group-hover:text-garage-blue transition-colors">
                    Learn More <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 mb-12">
          <FadeInUp><h2 className="text-3xl md:text-4xl font-extrabold text-garage-black tracking-tight">Testimonials</h2></FadeInUp>
        </div>
        <Testimonials />
      </section>

      <Footer />
    </div>
  );
}
