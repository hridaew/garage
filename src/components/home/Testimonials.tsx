"use client";

import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Jessica Minnen",
    role: "Personal Training Client",
    text: "The real progress can't be captured in a picture because it's a feeling. I have more energy and confidence. I am more myself than I have been in years.",
    image: "https://static.wixstatic.com/media/eefe7f_479f80a4ae694805847d2ec3fbe8e189~mv2.png",
    wide: true,
  },
  {
    name: "Sarah Jenkins",
    role: "Personal Training",
    text: "Garage 1880 completely changed my perspective on fitness. The environment is so welcoming and the trainers really care about your long-term health.",
    image: null,
    wide: false,
  },
  {
    name: "Alex T.",
    role: "One-on-One Training",
    text: "The best investment I've made in myself this year. The facility is beautiful and the vibe is always positive.",
    image: null,
    wide: false,
  },
];

function Stars() {
  return (
    <div className="flex text-garage-blue mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} weight="fill" size={16} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="flex gap-8 px-6 lg:px-12 overflow-x-auto hide-scroll pb-4">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className={`${
            t.wide ? "w-[85vw] md:w-[600px]" : "w-[85vw] md:w-[400px]"
          } ${
            t.wide
              ? "bg-garage-light rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center"
              : "bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow"
          } shrink-0`}
        >
          {t.wide ? (
            <>
              {t.image && (
                <div className="w-24 h-24 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <Stars />
                <p className="text-lg text-garage-black font-medium leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-sm font-bold text-garage-black uppercase tracking-wide">
                  {t.name}
                </p>
                <p className="text-xs text-garage-gray">{t.role}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <Stars />
                <p className="text-garage-gray mb-6 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-bold text-garage-black">
                    {t.name}
                  </p>
                  <p className="text-xs text-garage-gray">{t.role}</p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
