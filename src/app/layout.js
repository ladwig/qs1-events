import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PostHogProvider from "./components/PostHogProvider";
import LocalizedCookieBanner from "./components/LocalizedCookieBanner";
import StatusBar from "./components/StatusBar";
import { 
  ConsentManagerDialog,
  ConsentManagerProvider,
} from '@c15t/nextjs';

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
  keywords: "QS1 Berlin, event agency, techno, dj, booking agency, Berlin events, music agency, artist booking, creative events, Berlin artists, techno booking, house music, electronic music Berlin, DJ booking Germany",
  authors: [{ name: "QS1 Berlin" }],
  creator: "QS1 Berlin",
  publisher: "QS1 Berlin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "QS1 Berlin - Event & Booking Agency",
    description: "QS1 Berlin is an event and booking agency specializing in music, culture, and creative events. Discover our artists, book talent, and explore upcoming events.",
    url: "https://qs1.berlin/",
    siteName: "QS1 Berlin",
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [
      {
        url: "https://qs1.berlin/logo.svg",
        width: 1200,
        height: 630,
        alt: "QS1 Berlin - Event & Booking Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QS1 Berlin - Event & Booking Agency",
    description: "QS1 Berlin is an event and booking agency specializing in music, culture, and creative events. Discover our artists, book talent, and explore upcoming events.",
    images: ["https://qs1.berlin/logo.svg"],
    creator: "@qs1berlin",
    site: "@qs1berlin",
  },
  verification: {
    // Add when you get these verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'entertainment',
  classification: 'Event Agency, Music Booking, Artist Management',
  appleWebApp: {
    statusBarStyle: 'light-content',
    title: 'QS1 Berlin',
    capable: true,
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'apple-mobile-web-app-status-bar-style': 'light-content',
    'msapplication-TileColor': '#000000',
    'theme-color': '#ED750F',
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  }
}

export default function RootLayout({ children }) {
  // Theme matching your existing modal design patterns
  const consentTheme = {
    // Cookie Banner - positioned like a card, matching modal style
    'banner.root': 'fixed bottom-0 left-0 right-0 sm:bottom-5 sm:left-auto sm:right-5 sm:max-w-lg z-50',
    'banner.card': 'bg-white border border-gray-200 rounded-none',
    'banner.header': 'p-6 pb-0',
    'banner.header.title': 'font-mono text-gray-800 font-medium text-base mb-2',
    'banner.header.description': 'text-gray-600 text-sm leading-relaxed mb-0',
    'banner.footer': 'p-6 pt-4 flex flex-col gap-3 items-center', // Changed to vertical layout, centered
    'banner.footer.accept-button': 'font-mono bg-gray-800 text-white border border-gray-800 px-4 py-2 text-sm hover:bg-gray-700 hover:border-gray-700 transition-colors rounded-none w-full order-1', // Full width, first
    'banner.footer.reject-button': 'text-gray-400 hover:text-gray-600 transition-colors text-xs underline bg-transparent border-none p-0 font-normal order-2 mt-2 shadow-none outline-none focus:outline-none focus:ring-0 focus:shadow-none', // Small gray link, second, with margin-top

    // Consent Modal - matching your existing modal backdrop and style
    'dialog.backdrop': 'fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50',
    'dialog.root': 'bg-white max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-none',
    'dialog.header': 'p-4 sm:p-6 pb-0 flex-shrink-0',
    'dialog.header.close-button': 'text-gray-600 hover:text-gray-900 transition-colors text-xl ml-auto block',
    'dialog.header.title': 'font-mono text-gray-800 font-medium text-xl mb-4',
    'dialog.header.description': 'text-gray-600 text-sm leading-relaxed',
    'dialog.content': 'px-4 sm:px-6 overflow-y-auto flex-1',
    'dialog.footer': 'p-4 sm:p-6 pt-0 flex-shrink-0 flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end border-t border-gray-100',
    'dialog.footer.accept-button': 'font-mono bg-gray-800 text-white border border-gray-800 px-6 py-2 text-sm hover:bg-gray-600 hover:border-gray-600 transition-colors rounded-none',
    'dialog.footer.reject-button': 'font-mono bg-transparent text-gray-600 border border-gray-300 px-6 py-2 text-sm hover:text-gray-800 hover:border-gray-500 transition-colors rounded-none',
    'dialog.footer.save-button': 'font-mono bg-gray-800 text-white border border-gray-800 px-6 py-2 text-sm hover:bg-gray-600 hover:border-gray-600 transition-colors rounded-none',

    // Consent Categories
    'dialog.categories': 'space-y-4 py-4',
    'dialog.category': 'bg-gray-50 border border-gray-200 p-4 rounded-none',
    'dialog.category.header': 'flex justify-between items-center mb-2',
    'dialog.category.title': 'font-mono text-gray-800 font-medium text-base',
    'dialog.category.description': 'text-gray-600 text-sm leading-relaxed',
    'dialog.category.toggle': 'w-11 h-6 bg-gray-200 rounded-full relative transition-colors',
    'dialog.category.toggle.checked': 'bg-gray-800',
    'dialog.category.toggle.thumb': 'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform',
    'dialog.category.toggle.thumb.checked': 'transform translate-x-5',
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StatusBar 
          message="QS1 7 Year Anniversary at Kreuzwerk, Berlin - Sa., 9. Aug. 2025"
          link="https://de.ra.co/events/2136761"
          linkText="Get Tickets"
          isVisible={true}
          isDismissible={true}
          backgroundColor="bg-black"
          textColor="text-white"
        />
        <ConsentManagerProvider
          options={{
            mode: 'offline',
            consentCategories: ['necessary', 'analytics'],
            ignoreGeoLocation: false, // Respect geo-location for EU law compliance
          }}
        >
          {/* Temporarily disabled cookie banner - easy to reactivate by uncommenting below */}
          {/* <LocalizedCookieBanner theme={consentTheme} /> */}
          {/* <ConsentManagerDialog theme={consentTheme} /> */}
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </ConsentManagerProvider>
      </body>
    </html>
  );
}
