'use client';

export default function ArtistProfile({ artist, onClose, colors }) {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto" style={{ backgroundColor: colors?.background }}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>

          {/* Artist Info */}
          <div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div>
                  <h3 className="text-sm mb-2 font-mono text-gray-600">ARTIST / ALIAS</h3>
                  <p className="text-3xl mt-2 text-gray-800">{artist.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
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

              {/* Right side - can be used for images or additional content */}
              <div className="relative h-full min-h-[300px] bg-gray-100">
                {/* Placeholder for artist image */}
              </div>
            </div>

            {/* Description and Request Button - Full Width */}
            <div className="flex justify-between items-start gap-8 mt-8">
              <p className="text-gray-800 leading-relaxed flex-1">
                {artist.description}
              </p>
              <button className="font-mono py-3 px-8 text-gray-800 hover:text-gray-600 transition-colors whitespace-nowrap">
                REQUEST
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            {artist.socialLinks.soundcloud && (
              <a 
                href={artist.socialLinks.soundcloud} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-gray-800 hover:text-gray-600 transition-colors"
              >
                SOUNDCLOUD
              </a>
            )}
            {artist.socialLinks.instagram && (
              <a 
                href={artist.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-gray-800 hover:text-gray-600 transition-colors"
              >
                INSTAGRAM
              </a>
            )}
            {artist.socialLinks.tiktok && (
              <a 
                href={artist.socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-gray-800 hover:text-gray-600 transition-colors"
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