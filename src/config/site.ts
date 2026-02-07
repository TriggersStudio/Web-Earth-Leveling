import { SiteConfig, MainNavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Earth Leveling",
  description: "Earth Leveling HYTALE server",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/earth-leveling-logo.png",
  links: {
    github: "https://github.com",
  },
};

export const mainNav: MainNavItem[] = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "À propos",              
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
