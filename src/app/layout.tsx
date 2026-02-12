import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Garage 1880 | Personal Training in Sunnyside, Denver",
    template: "%s | Garage 1880",
  },
  description:
    "Personal training gym in Sunnyside, Denver. Sustainable fitness plans designed for real life. Aim for 1% better every day.",
  keywords: [
    "personal training",
    "Sunnyside gym",
    "Denver personal trainer",
    "fitness Sunnyside Denver",
    "Garage 1880",
    "nutrition coaching Denver",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Garage 1880",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GymOrFitnessFacility",
  name: "Garage 1880",
  description:
    "Personal training gym in Sunnyside, Denver. Sustainable fitness plans designed for real life.",
  url: "https://garage1880.com",
  telephone: "+17207456158",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4255 Jason St Unit B",
    addressLocality: "Denver",
    addressRegion: "CO",
    postalCode: "80211",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.78,
    longitude: -105.01,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/garage1880_/",
    "https://www.facebook.com/Garage1880",
  ],
  image: "https://garage1880.com/og-image.jpg",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-white text-garage-black antialiased selection:bg-garage-blue selection:text-white`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
