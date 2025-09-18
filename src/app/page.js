'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { artists } from "./data/artists";
import ArtistProfile from "./components/ArtistProfile";
import Imprint from "./components/Imprint";
import QS1Info from "./components/QS1Info";
import CustomCursor from "./components/CustomCursor";
import SoundCloudModal from "./components/SoundCloudModal";
import EcwidMerchModal from "./components/EcwidMerchModal";
import SilkBackground from "./components/SilkBackground";
import { trackEvent, trackModalOpen, trackModalClose, trackReferrer, trackButtonClick } from "./utils/analytics";

function generateColors() {
  // Generate vibrant base color with higher saturation
  const h = Math.floor(Math.random() * 360); // Hue: 0-360
  const s = Math.floor(Math.random() * 15 + 85); // Saturation: 85-100%
  const l = Math.floor(Math.random() * 20 + 60); // Lightness: 60-80%

  // Convert HSL to RGB
  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l / 100 - c / 2;

  let r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  // Convert to RGB values
  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  // Create slightly lighter version for text backgrounds with more contrast
  const br = Math.min(255, Math.round(red * 1.15));
  const bg = Math.min(255, Math.round(green * 1.15));
  const bb = Math.min(255, Math.round(blue * 1.15));

  return {
    background: `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`,
    textBg: `#${br.toString(16).padStart(2, '0')}${bg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`
  };
}

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [colors, setColors] = useState(null);
  const [merchModalKey, setMerchModalKey] = useState(0);

  useEffect(() => {
    setColors(generateColors());
    
    // Track referrer on initial page load
    trackReferrer();

    // Add structured data to the page
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://qs1.berlin/#organization",
          "name": "QS1 Berlin",
          "alternateName": "QS1",
          "url": "https://qs1.berlin",
          "logo": {
            "@type": "ImageObject",
            "url": "https://qs1.berlin/logo.svg",
            "width": 400,
            "height": 400
          },
          "description": "QS1 Berlin is an event and booking agency specializing in music, culture, and creative events in Berlin, Germany.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Berlin",
            "addressCountry": "Germany"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "booking",
            "email": "bookings@qs1.berlin"
          },
          "foundingDate": "2018",
          "industry": "Entertainment",
          "serviceArea": {
            "@type": "Place",
            "name": "Berlin, Germany"
          },
          "services": [
            "Artist Booking",
            "Event Management", 
            "DJ Services",
            "Music Event Planning",
            "Talent Management"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://qs1.berlin/#website",
          "url": "https://qs1.berlin",
          "name": "QS1 Berlin",
          "description": "QS1 Berlin - Event & Booking Agency specializing in electronic music artists and events",
          "publisher": {
            "@id": "https://qs1.berlin/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://qs1.berlin/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "ItemList",
          "@id": "https://qs1.berlin/#artists",
          "name": "QS1 Berlin Artists",
          "description": "Electronic music artists represented by QS1 Berlin booking agency",
          "numberOfItems": sortedArtists.length,
          "itemListElement": sortedArtists.map((artist, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Person",
              "@id": `https://qs1.berlin/artist/${artist.name.toLowerCase().replace(/\s+/g, '-')}`,
              "name": artist.name,
              "jobTitle": "DJ",
              "description": artist.description.split('\n')[0], // First paragraph only
              "image": `https://qs1.berlin${artist.imageUrl}`,
              "url": `https://qs1.berlin/artist/${artist.name.toLowerCase().replace(/\s+/g, '-')}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": artist.basedIn.split(',')[0],
                "addressCountry": artist.basedIn.split(',')[1]?.trim()
              },
              "genre": artist.genre,
              "memberOf": {
                "@id": "https://qs1.berlin/#organization"
              }
            }
          }))
        }
      ]
    };

    // Add structured data script to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function to remove script on unmount
    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Handle video autoplay for iOS
  useEffect(() => {
    const video = document.querySelector('#bg-video');
    if (video) {
      // Force play for iOS devices
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, but that's okay
          console.log('Video autoplay was prevented:', error);
        });
      }
    }
  }, [colors]);

  // Update theme color and status bar color dynamically
  useEffect(() => {
    if (!colors) return;
    
    // Update theme color meta tag - use specific orange for iOS
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = '#ED750F';

    // Update Apple status bar meta tag
    let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBarMeta) {
      statusBarMeta = document.createElement('meta');
      statusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
      document.head.appendChild(statusBarMeta);
    }
    statusBarMeta.content = 'light-content';

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = 'https://qs1.berlin/';
  }, [colors]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.snap-container');
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const viewportHeight = window.innerHeight;
        // Show button when scrolled past 50% of first section
        setShowScrollToTop(scrollTop > viewportHeight * 0.5);
      }
    };

    const scrollContainer = document.querySelector('.snap-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'artists') {
        document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash) {
        const matchingArtist = artists.find(
          artist => artist.name.toLowerCase().replace(/\s+/g, '-') === hash && !artist.hide
        );
        if (matchingArtist) {
          setSelectedArtist(matchingArtist);
          handleModalOpen('artist');
        }
      } else {
        setSelectedArtist(null);
        handleModalClose();
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
    trackModalOpen(modalType);
    
    // Set page title when opening merch modal
    if (modalType === 'merch') {
      document.title = 'QS1 Merch Store - QS1 Berlin';
    }
    
    // SEO optimization for artist modals
    if (modalType === 'artist' && selectedArtist) {
      // Update page title for artist
      document.title = `${selectedArtist.name} - ${selectedArtist.genre.join(', ')} DJ | QS1 Berlin`;
      
      // Update meta description for artist
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      const artistDesc = selectedArtist.description.split('\n')[0].substring(0, 155) + '...';
      metaDescription.content = `${selectedArtist.name} - ${artistDesc} Book ${selectedArtist.name} with QS1 Berlin.`;
      
      // Update canonical URL for artist
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `https://qs1.berlin/artist/${selectedArtist.name.toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  const handleModalClose = () => {
    if (activeModal) {
      trackModalClose(activeModal);
    }
    
    // Reset page title and prepare for fresh modal when closing merch modal
    if (activeModal === 'merch') {
      document.title = 'QS1 Berlin - Event & Booking Agency';
      setMerchModalKey(prev => prev + 1); // Prepare fresh modal for next open
    }
    
    // Reset SEO meta tags when closing artist modal
    if (activeModal === 'artist') {
      // Reset page title
      document.title = 'QS1 Berlin - Event & Booking Agency';
      
      // Reset meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = 'QS1 Berlin is an event and booking agency specializing in music, culture, and creative events. Discover our artists, book talent, and explore upcoming events.';
      }
      
      // Reset canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.href = 'https://qs1.berlin/';
      }
    }
    
    setActiveModal(null);
    if (activeModal === 'artist') {
      window.location.hash = '';
    }
  };

  const handleArtistClick = (artist) => {
    if (selectedArtist === artist) {
      window.location.hash = '';
      setSelectedArtist(null);
      handleModalClose();
    } else {
      setSelectedArtist(artist);
      handleModalOpen('artist');
      window.location.hash = artist.name.toLowerCase().replace(/\s+/g, '-');
      
      // Track artist selection from main page
      trackEvent('artist_selected_from_grid', {
        artist_name: artist.name,
        artist_slug: artist.slug || artist.name.toLowerCase().replace(/\s+/g, '-'),
        selection_context: 'main_page_grid'
      });
    }
  };

  const handleContactClick = () => {
    trackButtonClick('contact_email', { location: 'footer' });
  };

  const handleScrollToTop = () => {
    trackButtonClick('scroll_to_top');
    const scrollContainer = document.querySelector('.snap-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Filter out hidden artists and sort alphabetically by name for consistent A-Z order
  const sortedArtists = [...artists].filter(artist => !artist.hide).sort((a, b) => a.name.localeCompare(b.name));

  // Don't render until colors are loaded to prevent hydration mismatch
  if (!colors) {
    return <div className="w-full h-screen bg-white"></div>;
  }



  return (
    <>
      <CustomCursor />
      <div className="snap-container">
        {/* First Section - Silk Background Hero */}
        <section className="snap-section mobile-section flex flex-col justify-between p-3 sm:p-8 relative overflow-hidden" aria-label="QS1 Berlin Homepage Hero">
          {/* Silk Background */}
          <SilkBackground />

          {/* Content Wrapper */}
          <div className="relative z-20 flex flex-col justify-between h-full w-full">
          {/* Top Navigation */}
          <nav className="w-full flex justify-between items-center fade-in flex-shrink-0" role="navigation" aria-label="Main navigation">
            <div className="w-1/3">
              <span 
                className="hidden md:inline-block text-xs sm:text-sm px-2 py-1 text-gray-800 leading-tight bg-white"
              >
                BOOKING & EVENT MANAGEMENT
              </span>
            </div>
            <div className="w-1/3 text-center">
              <span 
                className="text-xs sm:text-sm cursor-pointer px-2 py-1 text-gray-800 leading-tight bg-white inline-block"
                onClick={() => handleModalOpen('qs1')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleModalOpen('qs1')}
                aria-label="Learn more about QS1 Berlin"
              >
                QS1 BERLIN
              </span>
            </div>
            <div className="w-1/3 text-right">
              <span 
                className="hidden md:inline-block text-xs sm:text-sm px-2 py-1 text-gray-800 leading-tight bg-white"
              >
                ©2025
              </span>
            </div>
          </nav>

          {/* Center Content */}
          <div className="flex flex-col sm:flex-row justify-between items-center flex-1 w-full gap-2 sm:gap-0 min-h-0">
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-start mb-2 sm:mb-0 mt-2 sm:mt-0">
              <div className="flex flex-row sm:flex-col gap-6 sm:gap-4 items-center sm:items-start w-full justify-center sm:justify-start">
                <span 
                  className="text-xs sm:text-sm cursor-pointer whitespace-nowrap px-2 py-1 text-gray-800 leading-tight bg-white"
                  onClick={() => handleModalOpen('soundcloud')}
                >
                  LISTEN
                </span>
                <span 
                  className="text-xs sm:text-sm cursor-pointer whitespace-nowrap px-2 py-1 text-gray-800 leading-tight bg-white"
                  onClick={() => handleModalOpen('merch')}
                >
                  MERCH
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center items-center fade-in mb-0 sm:mb-0 mt-12 sm:mt-0">
              <div className="relative w-24 h-24 sm:w-36 sm:h-36">
                <Image
                  src="/logo.svg"
                  alt="QS1 Berlin Logo - Event & Booking Agency"
                  fill
                  className="invert"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end flex-1 overflow-hidden">
              {/* Mobile: vertical list, Desktop: column */}
              <ul className="artist-list text-center sm:text-right flex flex-col gap-3 sm:gap-3 fade-in-delay w-full sm:w-auto justify-center sm:justify-end overflow-y-auto max-h-full pt-2 pb-2">
                {sortedArtists.map((artist, index) => (
                  <li 
                    key={index} 
                    className="hover:cursor-pointer relative flex-shrink-0"
                    onClick={() => handleArtistClick(artist)}
                  >
                    <span className="px-2 py-1 text-gray-800 bg-white text-xs sm:text-sm leading-tight">{artist.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <footer className="w-full flex justify-between items-center fade-in flex-shrink-0 pb-safe-extra">
            <div className="w-1/3">
              <a 
                href="mailto:bookings@qs1.berlin"
                onClick={handleContactClick}
                className="cursor-pointer px-2 py-1 text-gray-800 leading-tight bg-white text-xs sm:text-sm"
              >
                CONTACT
              </a>
            </div>
            <div className="w-1/3 text-center">
              {/* Center footer content */}
            </div>
            <div className="w-1/3 text-right">
              {/* <a 
                href="/presskit"
                className="cursor-pointer" 
                style={labelStyle}
              >
                PRESS KIT
              </a> */}
              <span 
                className="cursor-pointer px-2 py-1 text-gray-800 leading-tight bg-white text-xs sm:text-sm"
                onClick={() => handleModalOpen('imprint')}
              >
                IMPRINT
              </span>
            </div>
          </footer>
          </div>
        </section>

        {/* Second Section - White Gallery */}
        <section id="artists" className="snap-section min-h-screen bg-white py-16 px-8" aria-labelledby="artists-heading">
          <div className="max-w-7xl mx-auto">
            <h1 id="artists-heading" className="sr-only">QS1 Berlin Artists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 fade-in" role="grid" aria-label="Artist portfolio grid">
              {sortedArtists.map((artist, index) => (
                <article 
                  key={index}
                  className="cursor-pointer group"
                  onClick={() => handleArtistClick(artist)}
                  role="gridcell"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleArtistClick(artist)}
                  aria-label={`View ${artist.name} profile - ${artist.genre.join(', ')} DJ from ${artist.basedIn}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    {artist.imageUrl && (
                      <Image
                        src={artist.imageUrl}
                        alt={`${artist.name} - ${artist.genre.join(', ')} DJ from ${artist.basedIn} - QS1 Berlin Artist`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        priority={index < 4}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                  </div>
                  <h2 className="mt-4 text-center text-gray-800 group-hover:text-black">
                    {artist.name}
                  </h2>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5,12 12,5 19,12"></polyline>
            </svg>
          </button>
        )}

        {/* Modals */}
        {activeModal === 'artist' && selectedArtist && (
          <ArtistProfile 
            artist={selectedArtist} 
            onClose={handleModalClose} 
            colors={colors}
          />
        )}

        {activeModal === 'imprint' && (
          <Imprint onClose={handleModalClose} />
        )}

        {activeModal === 'qs1' && (
          <QS1Info onClose={handleModalClose} />
        )}

        {activeModal === 'soundcloud' && (
          <SoundCloudModal onClose={handleModalClose} />
        )}

        {activeModal === 'merch' && (
          <EcwidMerchModal key={merchModalKey} onClose={handleModalClose} />
        )}
      </div>
    </>
  );
}
