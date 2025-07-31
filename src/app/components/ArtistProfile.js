'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { trackArtistProfileView, trackArtistBookingRequest, trackSocialLinkClick, trackModalClose } from '../utils/analytics';

export default function ArtistProfile({ artist, onClose, colors }) {
  const contentRef = useRef(null);

  // Track artist profile view when component mounts
  useEffect(() => {
    if (artist) {
      trackArtistProfileView(artist.name, artist.slug);
    }
  }, [artist]);

  if (!artist) return null;

  const handleBookingRequest = () => {
    trackArtistBookingRequest(artist.name, artist.slug);
  };

  const handleSocialLinkClick = (platform, url) => {
    trackSocialLinkClick(platform, artist.name, url);
  };

  const handleClose = () => {
    trackModalClose('artist_profile', { artist_name: artist.name });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={handleClose}
    >

      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-4 pb-0 flex-shrink-0">
          <div className="flex justify-end mb-2 sm:mb-4">
            <button 
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="px-4 sm:px-8 overflow-y-auto flex-1 min-h-0">
          {/* Artist Info */}
          <div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 ${
              artist.description && artist.description.length > 300 ? 'mb-4 sm:mb-8' : 'mb-4 sm:mb-6'
            }`}>
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
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-sm mb-2 font-mono text-gray-600">RELATIONSHIP</h3>
                  <p className="mt-1 text-gray-800">{artist.artistType}</p>
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
            <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-8 ${
              artist.description && artist.description.length > 300 ? 'mt-4 sm:mt-8' : 'mt-4 sm:mt-6'
            }`}>
              {!artist.hideRequestButton && (
                <a 
                  href={`mailto:bookings@qs1.berlin?subject=Booking Request ${artist.name}`}
                  onClick={handleBookingRequest}
                  className="font-mono py-2 sm:py-3 px-6 sm:px-8 text-gray-800 hover:text-white border border-gray-800 transition-all duration-200 whitespace-nowrap w-full sm:w-auto text-center flex-shrink-0 order-first sm:order-last"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#000000';
                    e.target.style.borderColor = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#1f2937'; // gray-800
                  }}
                >
                  REQUEST
                </a>
              )}
              <div className={`text-gray-800 leading-relaxed text-sm sm:text-base whitespace-pre-line pb-4 order-last sm:order-first ${
                artist.description && artist.description.length <= 300 && !artist.hideRequestButton ? 'sm:max-w-[70%]' : ''
              }`} style={{ 
                flex: artist.description && artist.description.length > 300 ? '1' : 'none'
              }}>
                <div>
                  {artist.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer - Social Links */}
        <div className="px-4 sm:px-8 py-4 flex-shrink-0 border-t border-gray-100 bg-white">
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
                onClick={() => handleSocialLinkClick('soundcloud', artist.socialLinks.soundcloud)}
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
                onClick={() => handleSocialLinkClick('instagram', artist.socialLinks.instagram)}
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
                onClick={() => handleSocialLinkClick('tiktok', artist.socialLinks.tiktok)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                TIKTOK
              </a>
            )}
            {artist.socialLinks.residentAdvisor && (
              <a 
                href={artist.socialLinks.residentAdvisor} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => handleSocialLinkClick('resident_advisor', artist.socialLinks.residentAdvisor)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                RESIDENT ADVISOR
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
} 