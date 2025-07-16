'use client';

export default function QS1Info({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
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
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto flex-1">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-mono mb-4">QS1 BERLIN</h2>
              <p className="text-gray-800 leading-relaxed">
              QS1 is an Event Series and Agency based in Berlin. Founded in a derelict space in Charlottenburg in 2018, it now is the home for a variety of artists.
              </p>
            </div>

            <div>
              <p className="text-gray-800 leading-relaxed">
              We focus on creating unique experiences through carefully curated events, bringing together established and emerging talents in electronic music.
              </p>
            </div>

            <div>
              <p className="text-gray-800 leading-relaxed">
              Our mission is to support the underground music scene by providing a platform for artists to showcase their work and connect with audiences who appreciate innovative sounds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2">Services</h3>
              <p className="text-gray-800 leading-relaxed">
              - Event Management & Production<br />
              - Artist Booking & Representation<br />
              - Creative Consulting<br />
              - Brand Partnerships
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2">Contact</h3>
              <p className="text-gray-800 leading-relaxed">
              For bookings and inquiries:<br />
              bookings@qs1.berlin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 