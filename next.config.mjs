/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/landing-page-1", destination: "/", permanent: true },
      { source: "/group-fitness-classes", destination: "/personal-training", permanent: true },
      { source: "/fitness-class-schedule", destination: "/personal-training", permanent: true },
    ];
  },
};

export default nextConfig;
