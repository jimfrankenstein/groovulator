import localFont from "next/font/local";

export const dmSans = localFont({
  src: [
    { path: "./DMSans-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "./DMSans-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
