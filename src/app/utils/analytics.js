import posthog from 'posthog-js';

// Only track events in production
const isProduction = process.env.NODE_ENV === 'production';

export const trackEvent = (eventName, properties = {}) => {
  if (isProduction && typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

// Artist-related tracking
export const trackArtistProfileView = (artistName, artistSlug) => {
  trackEvent('artist_profile_viewed', {
    artist_name: artistName,
    artist_slug: artistSlug
  });
};

export const trackArtistBookingRequest = (artistName, artistSlug) => {
  trackEvent('artist_booking_requested', {
    artist_name: artistName,
    artist_slug: artistSlug
  });
};

export const trackSocialLinkClick = (platform, artistName, url) => {
  trackEvent('social_link_clicked', {
    platform: platform,
    artist_name: artistName,
    url: url
  });
};

// General interaction tracking
export const trackButtonClick = (buttonName, context = {}) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    ...context
  });
};

export const trackModalOpen = (modalType, context = {}) => {
  trackEvent('modal_opened', {
    modal_type: modalType,
    ...context
  });
};

export const trackModalClose = (modalType, context = {}) => {
  trackEvent('modal_closed', {
    modal_type: modalType,
    ...context
  });
};

// Referrer and traffic source tracking
export const trackReferrer = () => {
  if (isProduction && typeof window !== 'undefined' && document.referrer) {
    const referrer = new URL(document.referrer);
    const hostname = referrer.hostname;
    
    let source = 'direct';
    if (hostname.includes('instagram.com')) source = 'instagram';
    else if (hostname.includes('facebook.com')) source = 'facebook';
    else if (hostname.includes('twitter.com') || hostname.includes('x.com')) source = 'twitter';
    else if (hostname.includes('tiktok.com')) source = 'tiktok';
    else if (hostname.includes('soundcloud.com')) source = 'soundcloud';
    else if (hostname.includes('google.com')) source = 'google';
    else if (hostname) source = 'external';

    trackEvent('referrer_tracked', {
      referrer_hostname: hostname,
      referrer_url: document.referrer,
      traffic_source: source
    });
  }
}; 