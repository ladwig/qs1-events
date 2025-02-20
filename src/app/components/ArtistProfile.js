'use client';
import Image from 'next/image';

export default function ArtistProfile({ artist, onClose, colors }) {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto bg-white max-h-[100vh] md:max-h-none overflow-y-auto md:overflow-visible">
        <div className="p-4 sm:p-8">
          {/* Header */}
          <div className="flex justify-end mb-4 sm:mb-8">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>

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
                    <h3 className="text-sm mb-2 font-mono text-gray-600">TYPE</h3>
                    <p className="mt-1 text-gray-800">{artist.type}</p>
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
              <p className="text-gray-800 leading-relaxed flex-1 text-sm sm:text-base">
                {artist.description}
              </p>
              <a 
                href={`mailto:events@qs1.studio?subject=Booking Request ${artist.name}`}
                className="font-mono py-2 sm:py-3 px-6 sm:px-8 text-gray-800 hover:text-white border border-gray-800 hover:bg-gray-800 transition-all duration-200 whitespace-nowrap w-full sm:w-auto text-center"
              >
                REQUEST
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 mt-4 sm:mt-8 pb-2">
            {artist.pressPackUrl && (
              <a 
                href={artist.pressPackUrl}
                download
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                PRESS KIT
              </a>
            )}
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
    </div>
  );
} 