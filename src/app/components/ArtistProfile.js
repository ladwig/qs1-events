'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ArtistProfile({ artist, onClose, colors }) {
  const rainContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');

  // Character-based truncation for mobile/desktop
  useEffect(() => {
    if (!artist?.description) return;
    
    const isMobile = window.innerWidth < 768;
    const maxLength = isMobile ? 200 : 400; // Shorter on mobile, longer on desktop
    
    if (artist.description.length > maxLength) {
      setNeedsTruncation(true);
      // Find the last complete word or line break within the limit
      let cutoff = maxLength;
      while (cutoff > 0 && artist.description[cutoff] !== ' ' && artist.description[cutoff] !== '\n') {
        cutoff--;
      }
      setTruncatedText(artist.description.substring(0, cutoff || maxLength));
    } else {
      setNeedsTruncation(false);
      setTruncatedText(artist.description);
    }
    
    // Reset expansion state when artist changes
    setIsExpanded(false);
  }, [artist]);

  useEffect(() => {
    if (artist?.name === 'Josh Reid' && rainContainerRef.current) {
      const container = rainContainerRef.current;
      // Remove previous children if any
      container.innerHTML = '';
      const count = 500;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.src = '/guinness.png';
        img.alt = 'Guinness';
        img.style.position = 'absolute';
        img.style.top = '-60px';
        img.style.left = `${Math.random() * 100}%`;
        img.style.width = '48px';
        img.style.height = 'auto';
        img.style.pointerEvents = 'none';
        img.style.zIndex = 9999;
        const duration = 2 + Math.random() * 3; // 2-5s
        const delay = Math.random() * 2; // 0-2s
        img.style.animation = `guinness-rain ${duration}s linear ${delay}s forwards`;
        fragment.appendChild(img);
      }
      container.appendChild(fragment);
    }
  }, [artist]);

  if (!artist) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      {/* Guinness Rain Effect */}
      {artist?.name === 'Josh Reid' && (
        <div
          ref={rainContainerRef}
          style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 10000 }}
        />
      )}
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white h-[90vh] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 pb-0 flex-shrink-0">
          <div className="flex justify-end mb-2 sm:mb-4">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="px-4 sm:px-8 overflow-y-auto flex-1">
          {/* Artist Info */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
              <div>
                <div>
                  <h3 className="text-sm mb-2 font-mono text-gray-600">ARTIST / ALIAS</h3>
                  <p className="text-2xl sm:text-3xl mt-2 text-gray-800">{artist.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-8">
                  <div>
                    <h3 className="text-sm mb-2 font-mono text-gray-600">SET TYPE</h3>
                    <p className="mt-1 text-gray-800">{artist.setType}</p>
                  </div>

                  <div>
                    <h3 className="text-sm mb-2 font-mono text-gray-600">BASED IN</h3>
                    <p className="mt-1 text-gray-800">{artist.basedIn}</p>
                  </div>

                  <div>
                    <h3 className="text-sm mb-2 font-mono text-gray-600">GENRE</h3>
                    <p className="mt-1 text-gray-800">{artist.genre && artist.genre.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative h-[200px] md:h-full min-h-[200px] md:min-h-[300px] bg-gray-100 order-first md:order-last">
                {artist.imageUrl && (
                  <Image
                    src={artist.imageUrl}
                    alt={`${artist.name} profile`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Description and Request Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-8 mt-4 sm:mt-8">
              <div className="text-gray-800 leading-relaxed flex-1 text-sm sm:text-base whitespace-pre-line">
                <div>
                  {!isExpanded ? (
                    <>
                      {truncatedText}
                      {needsTruncation && (
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="text-gray-600 hover:text-gray-800 ml-1 font-mono transition-colors cursor-pointer"
                        >
                          [...]
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {artist.description}
                      {needsTruncation && (
                        <button
                          onClick={() => setIsExpanded(false)}
                          className="text-gray-600 hover:text-gray-800 ml-1 font-mono transition-colors block mt-2 cursor-pointer"
                        >
                          [show less]
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <a 
                href={`mailto:bookings@qs1.berlin?subject=Booking Request ${artist.name}`}
                className="font-mono py-2 sm:py-3 px-6 sm:px-8 text-gray-800 hover:text-white border border-gray-800 hover:bg-gray-800 transition-all duration-200 whitespace-nowrap w-full sm:w-auto text-center flex-shrink-0"
              >
                REQUEST
              </a>
            </div>
          </div>
        </div>

        {/* Fixed Footer - Social Links */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-8 pt-4 flex-shrink-0">
          <div className="flex flex-wrap gap-4">
            {/* {artist.pressPackUrl && (
              <a 
                href={artist.pressPackUrl}
                download
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                PRESS KIT
              </a>
            )} */}
            {artist.socialLinks.soundcloud && (
              <a 
                href={artist.socialLinks.soundcloud} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                SOUNDCLOUD
              </a>
            )}
            {artist.socialLinks.instagram && (
              <a 
                href={artist.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                INSTAGRAM
              </a>
            )}
            {artist.socialLinks.tiktok && (
              <a 
                href={artist.socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                TIKTOK
              </a>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes guinness-rain {
          0% { transform: translateY(0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 