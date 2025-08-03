'use client';

import { useState } from 'react';

/**
 * StatusBar - Displays announcements and news at the top of the page
 * 
 * Features:
 * - Configurable visibility
 * - Dismissible
 * - Responsive design
 * - External link support
 */
export default function StatusBar({ 
  message, 
  link, 
  linkText, 
  isVisible = true, 
  isDismissible = true,
  backgroundColor = 'bg-gray-900',
  textColor = 'text-white'
}) {
  const [isDisplayed, setIsDisplayed] = useState(isVisible);

  if (!isDisplayed || !message) return null;

  const handleDismiss = () => {
    setIsDisplayed(false);
  };

  const handleLinkClick = () => {
    if (link) {
      // Track analytics if available
      if (window.trackButtonClick) {
        window.trackButtonClick('statusbar_link', { url: link });
      }
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <div className={`w-full ${backgroundColor} ${textColor} py-2 px-4 relative z-40`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-sm font-mono font-medium">
              {message}
            </span>
            {link && linkText && (
              <button
                onClick={handleLinkClick}
                className="text-sm font-mono underline hover:no-underline transition-all duration-200 hover:opacity-80"
              >
                {linkText}
              </button>
            )}
          </div>
        </div>
        
        {isDismissible && (
          <button
            onClick={handleDismiss}
            className="ml-4 text-white hover:text-gray-300 transition-colors text-lg font-mono"
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
} 