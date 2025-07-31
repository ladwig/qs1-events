'use client';

import { useEffect } from 'react';

export default function MerchModal({ onClose }) {
  useEffect(() => {
    // Check if Ecwid script is already loaded
    const existingScript = document.querySelector('script[src*="app.ecwid.com/script.js"]');
    
    if (!existingScript) {
      // Load Ecwid script only if not already present
      const script = document.createElement('script');
      script.src = 'https://app.ecwid.com/script.js?107567771&data_platform=code&data_date=2024-08-19';
      script.charset = 'utf-8';
      script.setAttribute('data-cfasync', 'false');
      document.head.appendChild(script);

      script.onload = () => {
        // Initialize the store once script is loaded
        setTimeout(() => {
          if (window.xProductBrowser) {
            window.xProductBrowser("id=my-store-107567771", "defaultCategoryId=172231018");
          }
        }, 100);
      };
    } else {
      // Script already exists, just initialize
      setTimeout(() => {
        if (window.xProductBrowser) {
          window.xProductBrowser("id=my-store-107567771", "defaultCategoryId=172231018");
        }
      }, 100);
    }

    // Don't remove the script on unmount to avoid conflicts
    return () => {
      // Clear the store content instead of removing the script
      const storeDiv = document.getElementById('my-store-107567771');
      if (storeDiv) {
        storeDiv.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-mono font-bold">QS1 MERCH</h2>
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-6 pt-0">
            {/* Ecwid Store */}
            <div id="my-store-107567771"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 