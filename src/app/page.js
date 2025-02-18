'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { artists } from "./data/artists";
import ArtistProfile from "./components/ArtistProfile";

function generateColors() {
  // Generate base light color
  const r = Math.floor(Math.random() * 30 + 225);
  const g = Math.floor(Math.random() * 30 + 225);
  const b = Math.floor(Math.random() * 30 + 225);

  // Create brighter version for text backgrounds (increase by 15% but cap at 255)
  const br = Math.min(255, Math.floor(r * 1.15));
  const bg = Math.min(255, Math.floor(g * 1.15));
  const bb = Math.min(255, Math.floor(b * 1.15));

  return {
    background: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    textBg: `#${br.toString(16).padStart(2, '0')}${bg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`
  };
}

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [colors] = useState(generateColors);

  useEffect(() => {
    // Function to handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
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
    <main className="min-h-screen flex flex-col justify-between p-8" style={{ backgroundColor: colors.background }}>
      {/* Top Navigation */}
      <nav className="w-full flex justify-between items-center">
        <div className="w-1/3">
          <span className="text-sm" style={labelStyle}>ARTIST BOOKINGS & EVENT MANAGEMENT</span>
        </div>
        <div className="w-1/3 text-center">
          <span className="text-sm" style={labelStyle}>QS1 BERLIN</span>
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
          <span className="text-sm" style={labelStyle}>GENERAL CONTACT</span>
        </div>
        <div className="w-1/3 text-center">
          {/* Center footer content */}
        </div>
        <div className="w-1/3 text-right">
          <span className="text-sm" style={labelStyle}>IMPRINT</span>
        </div>
      </footer>

      {/* Artist Profile Popup */}
      {selectedArtist && (
        <ArtistProfile 
          artist={selectedArtist} 
          onClose={handleClose} 
          colors={colors}
        />
      )}
    </main>
  );
}
