'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { artists } from "./data/artists";
import ArtistProfile from "./components/ArtistProfile";
import Imprint from "./components/Imprint";
import QS1Info from "./components/QS1Info";

function generateColors() {
  // Generate vibrant base color with higher saturation
  const h = Math.floor(Math.random() * 360); // Hue: 0-360
  const s = Math.floor(Math.random() * 20 + 70); // Saturation: 70-90%
  const l = Math.floor(Math.random() * 15 + 75); // Lightness: 75-90%

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

  // Create slightly lighter version for text backgrounds
  const br = Math.min(255, Math.round(red * 1.1));
  const bg = Math.min(255, Math.round(green * 1.1));
  const bb = Math.min(255, Math.round(blue * 1.1));

  return {
    background: `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`,
    textBg: `#${br.toString(16).padStart(2, '0')}${bg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`
  };
}

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showImprint, setShowImprint] = useState(false);
  const [showQS1Info, setShowQS1Info] = useState(false);
  const [colors, setColors] = useState({
    background: "#ffffff",
    textBg: "#ffffff"
  });

  // Generate colors after initial render
  useEffect(() => {
    setColors(generateColors());
  }, []);

  useEffect(() => {
    // Function to handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'artists') {
        // Scroll to artists section
        document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash) {
        const matchingArtist = artists.find(
          artist => artist.name.toLowerCase().replace(/\s+/g, '-') === hash
        );
        if (matchingArtist) {
          setSelectedArtist(matchingArtist);
        }
      } else {
        setSelectedArtist(null);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleArtistClick = (artist) => {
    if (selectedArtist === artist) {
      window.location.hash = '';
    } else {
      window.location.hash = artist.name.toLowerCase().replace(/\s+/g, '-');
    }
  };

  const handleClose = () => {
    window.location.hash = '';
  };

  const handleImprintClick = () => {
    setShowImprint(true);
  };

  const handleImprintClose = () => {
    setShowImprint(false);
  };

  const handleQS1Click = () => {
    setShowQS1Info(true);
  };

  const handleQS1Close = () => {
    setShowQS1Info(false);
  };

  const labelStyle = {
    backgroundColor: colors.textBg,
    color: '#333333',
    padding: '0.25rem 0.5rem',
    display: 'inline-block',
    lineHeight: '1.25',
  };

  const artistLabelStyle = {
    backgroundColor: colors.textBg,
    color: '#333333',
    padding: '0.1rem 0.3rem',
    display: 'inline',
    lineHeight: '1.5',
  };

  return (
    <div className="snap-container">
      {/* First Section - Colorful Hero */}
      <section className="snap-section min-h-screen flex flex-col justify-between p-8" style={{ backgroundColor: colors.background }}>
        {/* Top Navigation */}
        <nav className="w-full flex justify-between items-center">
          <div className="w-1/3">
            <span className="text-sm" style={labelStyle}>ARTIST BOOKINGS & EVENT MANAGEMENT</span>
          </div>
          <div className="w-1/3 text-center">
            <span 
              className="text-sm cursor-pointer" 
              style={labelStyle}
              onClick={handleQS1Click}
            >
              QS1 BERLIN
            </span>
          </div>
          <div className="w-1/3 text-right">
            <span className="text-sm" style={labelStyle}>2025©</span>
          </div>
        </nav>

        {/* Center Content */}
        <div className="flex justify-between items-center flex-1">
          <div className="w-1/3"></div>
          <div className="w-1/3 flex justify-center items-center">
            <div className="relative w-48 h-48">
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
          <div className="w-1/3">
            <ul className="artist-list text-right flex flex-col gap-2">
              {artists.map((artist, index) => (
                <li 
                  key={index} 
                  className="hover:cursor-pointer"
                  onClick={() => handleArtistClick(artist)}
                >
                  <span style={artistLabelStyle}>{artist.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <footer className="w-full flex justify-between items-center">
          <div className="w-1/3">
            <a 
              href="mailto:info@qs1.events"
              className="text-sm cursor-pointer" 
              style={labelStyle}
            >
              GENERAL CONTACT
            </a>
          </div>
          <div className="w-1/3 text-center">
            {/* Center footer content */}
          </div>
          <div className="w-1/3 text-right">
            <span 
              className="text-sm cursor-pointer" 
              style={labelStyle}
              onClick={handleImprintClick}
            >
              IMPRINT
            </span>
          </div>
        </footer>
      </section>

      {/* Second Section - White Gallery */}
      <section id="artists" className="snap-section min-h-screen bg-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {artists.map((artist, index) => (
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

      {/* Artist Profile Popup */}
      {selectedArtist && (
        <ArtistProfile 
          artist={selectedArtist} 
          onClose={handleClose} 
          colors={colors}
        />
      )}

      {/* Imprint Popup */}
      {showImprint && (
        <Imprint onClose={handleImprintClose} />
      )}

      {/* QS1 Info Popup */}
      {showQS1Info && (
        <QS1Info onClose={handleQS1Close} />
      )}
    </div>
  );
}
