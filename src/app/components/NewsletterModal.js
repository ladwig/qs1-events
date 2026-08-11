'use client';

import { useEffect, useState } from 'react';

export default function NewsletterModal({ onClose }) {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    fetch('/api/newsletters')
      .then((r) => r.json())
      .then(setNewsletters)
      .catch(() => setNewsletters([]));
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md pointer-events-auto bg-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-4 pb-0 flex-shrink-0">
          <div className="flex justify-end mb-2 sm:mb-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 pb-8">
          <ul className="flex flex-col gap-3">
            {newsletters.map((n) => (
              <li key={n.file}>
                <a
                  href={`/newsletter/${n.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black underline text-sm sm:text-base"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
