'use client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

function PostHogPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageviews when route changes
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      posthog.capture('$pageview', {
        $current_url: url
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }) {
  useEffect(() => {
    // Only initialize PostHog in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'identified_only', // Better for GDPR compliance
        capture_pageview: false, // We'll manually capture pageviews
        capture_pageleave: true,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
        // GDPR compliance features
        respect_dnt: true,
        opt_out_capturing_by_default: false,
        persistence: 'localStorage+cookie',
        session_recording: {
          maskAllInputs: true,
          maskTextFn: (text) => '*'.repeat(text.length),
        }
      });
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageTracker />
      </Suspense>
      {children}
    </>
  );
} 