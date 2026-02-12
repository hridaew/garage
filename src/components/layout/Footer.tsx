import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import FadeInUp from "@/components/ui/FadeInUp";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-20 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <FadeInUp className="space-y-4">
            <h5 className="text-lg font-extrabold text-garage-black">
              GARAGE 1880
            </h5>
            <p className="text-sm text-garage-gray">Sunnyside, Denver</p>
          </FadeInUp>

          <FadeInUp delay={100}>
            <h4 className="text-sm font-bold text-garage-black uppercase tracking-wide mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-garage-gray">
              <li>
                <Link
                  href="/personal-training"
                  className="hover:text-garage-blue hover:underline transition-all"
                >
                  Personal Training
                </Link>
              </li>
              <li>
                <Link
                  href="/personal-training"
                  className="hover:text-garage-blue hover:underline transition-all"
                >
                  Nutrition Coaching
                </Link>
              </li>
            </ul>
          </FadeInUp>

          <FadeInUp delay={200}>
            <h4 className="text-sm font-bold text-garage-black uppercase tracking-wide mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-garage-gray">
              <li>
                <a
                  href="tel:7207456158"
                  className="hover:text-garage-blue hover:underline transition-all"
                >
                  (720) 745-6158
                </a>
              </li>
              <li>
                <Link
                  href="/contact-us-about-fitness"
                  className="hover:text-garage-blue hover:underline transition-all"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/fitnessblog"
                  className="hover:text-garage-blue hover:underline transition-all"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </FadeInUp>

          <FadeInUp delay={300}>
            <h4 className="text-sm font-bold text-garage-black uppercase tracking-wide mb-6">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-garage-gray">
              <li className="flex justify-between max-w-[180px]">
                <span>Mon – Fri</span> <span>6am – 7pm</span>
              </li>
              <li className="flex justify-between max-w-[180px]">
                <span>Saturday</span> <span>Closed</span>
              </li>
              <li className="flex justify-between max-w-[180px]">
                <span>Sunday</span> <span>Closed</span>
              </li>
            </ul>
          </FadeInUp>

          <FadeInUp delay={400}>
            <h4 className="text-sm font-bold text-garage-black uppercase tracking-wide mb-6">
              Visit Us
            </h4>
            <address className="not-italic text-sm text-garage-gray leading-relaxed">
              4255 Jason St Unit B
              <br />
              Sunnyside, Denver, CO 80211
            </address>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/garage1880_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-garage-gray hover:text-garage-blue transition-colors"
              >
                <InstagramLogo weight="fill" size={24} />
              </a>
              <a
                href="https://www.facebook.com/Garage1880"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-garage-gray hover:text-garage-blue transition-colors"
              >
                <FacebookLogo weight="fill" size={24} />
              </a>
            </div>
          </FadeInUp>
        </div>

        <FadeInUp
          delay={500}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-garage-gray font-medium"
        >
          <p>&copy;2025 Garage 1880</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-garage-black">
              Privacy
            </Link>
            <Link href="#" className="hover:text-garage-black">
              Terms
            </Link>
          </div>
        </FadeInUp>
      </div>
    </footer>
  );
}
