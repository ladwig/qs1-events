'use client';

import { CookieBanner } from '@c15t/nextjs';
import { useState, useEffect } from 'react';

export default function LocalizedCookieBanner({ theme }) {
  const [texts, setTexts] = useState({
    title: 'Cookie-Einstellungen', // Default to German
    description: 'Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und zu verbessern. Notwendige Cookies sind für die Funktion der Website erforderlich.',
    acceptButtonText: 'Akzeptieren',
    rejectButtonText: 'Ablehnen'
  });

  useEffect(() => {
    // Detect browser language on client side
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('en')) {
      setTexts({
        title: 'Cookie Settings',
        description: 'We use cookies and similar technologies to analyze and improve the use of our website. Necessary cookies are required for the website to function.',
        acceptButtonText: 'Accept',
        rejectButtonText: 'Reject'
      });
    }
    // Default to German (already set above)
  }, []);

  return (
    <CookieBanner 
      theme={theme}
      title={texts.title}
      description={texts.description}
      acceptButtonText={texts.acceptButtonText}
      rejectButtonText={texts.rejectButtonText}
    />
  );
} 