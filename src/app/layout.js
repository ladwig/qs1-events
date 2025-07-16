import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QS1 Berlin - Event & Booking Agency",
  description: "QS1 Berlin is an event and booking agency specializing in music, culture, and creative events. Discover our artists, book talent, and explore upcoming events.",
  keywords: "QS1 Berlin, event agency, techno, dj, booking agency, Berlin events, music agency, artist booking, creative events, Berlin artists",
  openGraph: {
    title: "QS1 Berlin - Event & Booking Agency",
    description: "QS1 Berlin is an event and booking agency specializing in music, culture, and creative events. Discover our artists, book talent, and explore upcoming events.",
    url: "https://qs1.berlin/",
    siteName: "QS1 Berlin",
    type: "website",
    locale: "en_US",
  },
  themeColor: '#ffffff',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  appleWebApp: {
    statusBarStyle: 'default',
  },
  other: {
    'apple-mobile-web-app-status-bar-style': 'default',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
