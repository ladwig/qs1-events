'use client';

export default function SoundCloudModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto bg-white">
        <div className="p-4 sm:p-8">
          {/* Header */}
          <div className="flex justify-end mb-4 sm:mb-8">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
            >
              X
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <iframe
              title="QS1 SoundCloud"
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/qs1studio&color=%23ff4d00&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
} 