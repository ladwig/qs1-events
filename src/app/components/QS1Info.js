'use client';

export default function QS1Info({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto bg-white">
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

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-mono mb-4">QS1 BERLIN</h2>
              <p className="text-gray-800 leading-relaxed">
              QS1 is an Event Series and Agency based in Berlin. Founded in a derelict space in Charlottenburg in 2018, it now is the home for a variety of artists.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-4">CONNECT WITH US</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.qs1.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  WEBSITE
                </a>
                <a 
                  href="https://de.ra.co/promoters/111445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  RESIDENT ADVISOR
                </a>
                <a 
                  href="https://www.instagram.com/qs1berlin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 