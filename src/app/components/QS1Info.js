'use client';

export default function QS1Info({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white flex flex-col"
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

        {/* Content */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-8">
            <div>
              <p className="text-gray-800 leading-relaxed">
              QS1 is an Event Series and Agency based in Berlin. Founded in a derelict space in Charlottenburg in 2018, it now is the home for a variety of artists.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.instagram.com/qs1berlin/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  INSTAGRAM
                </a>
                <a 
                  href="https://soundcloud.com/qs1studio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  SOUNDCLOUD
                </a>
                <a 
                  href="https://www.qs1.studio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  STUDIO SPACE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 