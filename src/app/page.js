'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { artists } from "./data/artists";
import ArtistProfile from "./components/ArtistProfile";
import Imprint from "./components/Imprint";
import QS1Info from "./components/QS1Info";
import CustomCursor from "./components/CustomCursor";
import SoundCloudModal from "./components/SoundCloudModal";
import MerchModal from "./components/MerchModal";

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

  useEffect(() => {
    setColors(generateColors());
  }, []);

  // Update theme color and status bar color dynamically
  useEffect(() => {
    if (!colors) return;
    
    // Update theme color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = colors.background;

    // Update Apple status bar meta tag
    let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBarMeta) {
      statusBarMeta = document.createElement('meta');
      statusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
      document.head.appendChild(statusBarMeta);
    }
    statusBarMeta.content = 'light-content';
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
  };

  const handleModalClose = () => {
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
    }
  };

  const scrollToTop = () => {
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

  const labelStyle = {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '0.25rem 0.5rem',
    display: 'inline-block',
    lineHeight: '1.25',
  };

  const artistLabelStyle = {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '0.05rem 0.25rem',
    display: 'inline',
    lineHeight: '1.3',
  };

  return (
    <>
      <CustomCursor />
      <div className="snap-container">
        {/* First Section - Video Hero */}
        <section className="snap-section mobile-section flex flex-col justify-between p-3 sm:p-8 relative overflow-hidden">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/test2.mp4" type="video/mp4" />
          </video>

          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col justify-between h-full w-full">
          {/* Top Navigation */}
          <nav className="w-full flex justify-between items-center fade-in flex-shrink-0">
            <div className="w-1/3">
              <span 
                className="hidden md:inline-block text-xs sm:text-sm px-2 py-1 text-gray-800 leading-tight bg-white"
              >
                BOOKING & EVENT MANAGEMENT
              </span>
            </div>
            <div className="w-1/3 text-center">
              <span 
                className="text-xs sm:text-sm cursor-pointer mt-8 sm:mt-0" 
                style={labelStyle}
                onClick={() => handleModalOpen('qs1')}
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
                  className="text-xs sm:text-sm cursor-pointer whitespace-nowrap" 
                  style={labelStyle}
                  onClick={() => handleModalOpen('soundcloud')}
                >
                  LISTEN
                </span>
                <span 
                  className="text-xs sm:text-sm cursor-pointer whitespace-nowrap" 
                  style={labelStyle}
                  onClick={() => handleModalOpen('merch')}
                >
                  MERCH
                </span>
              </div>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center items-center fade-in mb-0 sm:mb-0 mt-12 sm:mt-0">
              <div className="relative w-24 h-24 sm:w-48 sm:h-48">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  fill
                  className="invert"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end flex-1 overflow-hidden">
              {/* Mobile: vertical list, Desktop: column */}
              <ul className="artist-list text-center sm:text-right flex flex-col gap-1.5 sm:gap-2 fade-in-delay w-full sm:w-auto justify-center sm:justify-end overflow-y-auto max-h-full">
                {sortedArtists.map((artist, index) => (
                  <li 
                    key={index} 
                    className="hover:cursor-pointer relative flex-shrink-0"
                    onClick={() => handleArtistClick(artist)}
                  >
                    <span style={artistLabelStyle}>{artist.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <footer className="w-full flex justify-between items-center fade-in text-xs sm:text-sm flex-shrink-0 pb-safe-extra">
            <div className="w-1/3">
              <a 
                href="mailto:bookings@qs1.berlin"
                className="cursor-pointer" 
                style={labelStyle}
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
                className="cursor-pointer" 
                style={labelStyle}
                onClick={() => handleModalOpen('imprint')}
              >
                IMPRINT
              </span>
            </div>
          </footer>
          </div>
        </section>

        {/* Second Section - White Gallery */}
        <section id="artists" className="snap-section min-h-screen bg-white py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 fade-in">
              {sortedArtists.map((artist, index) => (
                <div 
                  key={index}
                  className="cursor-pointer group"
                  onClick={() => handleArtistClick(artist)}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    {artist.imageUrl && (
                      <Image
                        src={artist.imageUrl}
                        alt={`${artist.name} profile`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        priority={index < 4}
                      />
                    )}
                  </div>
                  <h3 className="mt-4 text-center text-gray-800 group-hover:text-black">
                    {artist.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.background}
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
          <MerchModal onClose={handleModalClose} />
        )}
      </div>
    </>
  );
}
