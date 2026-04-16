import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Sans } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import RouteTransitionLayer from "@/components/motion/RouteTransitionLayer";
import LoadingScreen from "@/components/motion/LoadingScreen";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garage1880.com"),
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Garage 1880",
    title: "Garage 1880 | Personal Training in Sunnyside, Denver",
    description:
      "Personal training gym in Sunnyside, Denver. Sustainable fitness plans designed for real life. Aim for 1% better every day.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage 1880 | Personal Training in Sunnyside, Denver",
    description:
      "Personal training gym in Sunnyside, Denver. Sustainable fitness plans designed for real life.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GymOrFitnessFacility",
  name: siteConfig.name,
  description:
    "Personal training gym in Sunnyside, Denver. Sustainable fitness plans designed for real life.",
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: siteConfig.hours.weekdays.open,
      closes: siteConfig.hours.weekdays.close,
    },
  ],
  sameAs: [siteConfig.social.instagram.url, siteConfig.social.facebook.url],
  image: `${siteConfig.url}/og-image.jpg`,
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
        className={`${bodyFont.variable} ${displayFont.variable} font-sans bg-garage-canvas text-garage-ink antialiased`}
      >
        <GoogleAnalytics />
        <LoadingScreen />
        <RouteTransitionLayer>{children}</RouteTransitionLayer>
      </body>
    </html>
  );
}
