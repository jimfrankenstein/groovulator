import { Metadata } from "next";

export const metadata: Metadata = {
  title: "!!!THE VERY BAD DAYS!!! OFFICIAL SITE!!!",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function EasterEggLayout({ children }: { children: React.ReactNode }) {
  return children;
}
