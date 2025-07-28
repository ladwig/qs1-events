'use client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useConsentManager } from '@c15t/nextjs';
import posthog from 'posthog-js';

function PostHogPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useConsentManager();

  useEffect(() => {
    // Only track pageviews if analytics consent is given and PostHog is initialized
    if (typeof window !== 'undefined' && 
        process.env.NODE_ENV === 'production' && 
        consent?.analytics && 
        posthog.__loaded) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      posthog.capture('$pageview', {
        $current_url: url
      });
    }
  }, [pathname, searchParams, consent?.analytics]);

  return null;
}

export default function PostHogProvider({ children }) {
  const { consent } = useConsentManager();

  useEffect(() => {
    // Only initialize PostHog in production and when analytics consent is given
    if (typeof window !== 'undefined' && 
        process.env.NODE_ENV === 'production' && 
        consent?.analytics) {
      
      // Initialize PostHog only if not already initialized
      if (!posthog.__loaded) {
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
    } else if (typeof window !== 'undefined' && !consent?.analytics && posthog.__loaded) {
      // If consent is withdrawn, opt out of tracking
      posthog.opt_out_capturing();
    }
  }, [consent?.analytics]);

  // Re-enable tracking if consent is given after being withdrawn
  useEffect(() => {
    if (typeof window !== 'undefined' && consent?.analytics && posthog.__loaded) {
      posthog.opt_in_capturing();
    }
  }, [consent?.analytics]);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageTracker />
      </Suspense>
      {children}
    </>
  );
} 