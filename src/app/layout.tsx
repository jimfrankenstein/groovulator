import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { fugaz } from "./fonts/fugaz";
import { DarkModeProvider } from "../components/DarkModeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groovulator",
  description: "Ectophonic Groovulator · Haunted musical oddities · Featuring Jim Frankenstein and The Very Bad Days · Minneapolis, MN",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '743422318694202');
          fbq('track', 'PageView');
        `}</Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${fugaz.variable} antialiased`}>
         <noscript>
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img 
             height="1" 
             width="1" 
             style={{display: 'none'}}
             src="https://www.facebook.com/tr?id=743422318694202&ev=PageView&noscript=1"
             alt="Facebook Pixel"
           />
         </noscript>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
