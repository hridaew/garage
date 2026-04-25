export const siteConfig = {
  name: "Garage 1880",
  url: "https://garage1880.com",
  email: "info@garage1880.com",
  phone: "+17207456158",
  phoneDisplay: "(720) 745-6158",
  address: {
    street: "4255 Jason St Unit B",
    locality: "Denver",
    region: "CO",
    postalCode: "80211",
    neighborhood: "Sunnyside",
    country: "US",
  },
  geo: {
    latitude: 39.78,
    longitude: -105.01,
  },
  hours: {
    weekdays: { open: "05:00", close: "21:00", display: "5:00 AM - 9:00 PM" },
  },
  social: {
    instagram: {
      handle: "@garage1880_",
      url: "https://www.instagram.com/garage1880_/",
    },
    facebook: {
      url: "https://www.facebook.com/Garage1880",
    },
  },
} as const;

export const siteAddressLines = [
  siteConfig.address.street,
  `${siteConfig.address.neighborhood}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
];
