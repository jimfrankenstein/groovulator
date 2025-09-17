import localFont from "next/font/local";

export const fugaz = localFont({
  src: [{ path: "./FugazOne-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-fugaz",
  display: "swap",
});
