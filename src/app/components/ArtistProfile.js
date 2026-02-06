'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { trackArtistProfileView, trackArtistBookingRequest, trackSocialLinkClick, trackModalClose, trackButtonClick } from '../utils/analytics';

export default function ArtistProfile({ artist, onClose, colors }) {
  const contentRef = useRef(null);
  const [widget, setWidget] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const iframeRef = useRef(null);
  const readyTimeoutRef = useRef(null);

  // Track artist profile view when component mounts
  useEffect(() => {
    if (artist) {
      trackArtistProfileView(artist.name, artist.slug);
    }
  }, [artist]);

  // Load SoundCloud Widget API
  useEffect(() => {
    if (!artist?.socialLinks?.soundcloud || widget) return;

    // Load SoundCloud Widget API script if not already loaded
    if (!window.SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Script loaded, widget will be initialized when iframe is ready
      };
    }
  }, [artist, widget]);

  // Initialize widget when iframe is ready
  useEffect(() => {
    if (!showPlayer || !iframeRef.current || widget) return;

    console.log('Effect running - initializing widget...');

    const initWidget = () => {
      if (window.SC) {
        console.log('Initializing SoundCloud widget...');
        const widgetInstance = window.SC.Widget(iframeRef.current);

        // Set up event listeners for state synchronization
        widgetInstance.bind(window.SC.Widget.Events.PLAY, () => {
          console.log('PLAY event fired');
          setIsPlaying(true);
          setPlaybackFailed(false);
          if (readyTimeoutRef.current) {
            clearTimeout(readyTimeoutRef.current);
          }
        });

        widgetInstance.bind(window.SC.Widget.Events.PAUSE, () => {
          console.log('PAUSE event fired');
          setIsPlaying(false);
        });

        widgetInstance.bind(window.SC.Widget.Events.FINISH, () => {
          console.log('FINISH event fired');
          setIsPlaying(false);
        });

        widgetInstance.bind(window.SC.Widget.Events.ERROR, () => {
          console.log('ERROR event fired');
          setIsPlaying(false);
          setPlaybackFailed(true);
        });

        setWidget(widgetInstance);

        // If user clicked play before widget was ready, auto-play now
        if (shouldAutoPlay) {
          console.log('shouldAutoPlay is true, setting timeout and waiting for READY event...');
          // Set timeout to detect if widget never becomes ready (captcha/403 error)
          readyTimeoutRef.current = setTimeout(() => {
            console.log('⚠️ TIMEOUT FIRED - Widget failed to load - switching to external link');
            setPlaybackFailed(true);
            setIsPlaying(false);
          }, 1000); // 1 second timeout

          widgetInstance.bind(window.SC.Widget.Events.READY, () => {
            console.log('✅ READY event fired - clearing timeout');
            // Clear timeout since widget is ready
            if (readyTimeoutRef.current) {
              clearTimeout(readyTimeoutRef.current);
              readyTimeoutRef.current = null;
            }

            widgetInstance.getDuration((duration) => {
              console.log('Got duration:', duration);
              if (duration && duration > 0) {
                const randomPosition = Math.floor(Math.random() * duration * 0.8);
                console.log('Playing from position:', randomPosition);
                widgetInstance.seekTo(randomPosition);
                widgetInstance.play();

                trackButtonClick('soundcloud_play', {
                  artist_name: artist.name,
                  random_position_ms: randomPosition
                });
              } else {
                console.log('No duration, playing from start');
                widgetInstance.play();
              }

              // Check if playback actually started after calling play()
              readyTimeoutRef.current = setTimeout(() => {
                console.log('⚠️ Play called but no PLAY event - track blocked. Switching to external link.');
                setPlaybackFailed(true);
                setIsPlaying(false);
              }, 1500); // 1.5 second timeout to detect if PLAY event fires
            });
          });
          setShouldAutoPlay(false);
        }
      } else {
        console.log('SoundCloud API not loaded');
      }
    };

    // Wait a bit for iframe to load
    const timer = setTimeout(initWidget, 500);
    return () => {
      console.log('Cleanup: clearing timers');
      clearTimeout(timer);
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
      }
    };
  }, [showPlayer, widget, shouldAutoPlay, artist]);

  if (!artist) return null;

  const handleBookingRequest = () => {
    trackArtistBookingRequest(artist.name, artist.slug);
  };

  const handleSocialLinkClick = (platform, url) => {
    trackSocialLinkClick(platform, artist.name, url);
  };

  const handleClose = () => {
    trackModalClose('artist_profile', { artist_name: artist.name });
    // Stop playback when closing
    if (widget) {
      widget.pause();
    }
    onClose();
  };

  const handlePlayClick = () => {
    if (!artist?.socialLinks?.soundcloud) return;

    // If playback has failed before, open SoundCloud directly
    if (playbackFailed) {
      window.open(artist.socialLinks.soundcloud, '_blank');
      trackButtonClick('soundcloud_open_external', {
        artist_name: artist.name,
        reason: 'playback_failed'
      });
      return;
    }

    // Show player if not already shown
    if (!showPlayer) {
      setShowPlayer(true);
      setIsPlaying(true);
      setShouldAutoPlay(true);
      return;
    }

    if (widget) {
      // If currently playing, pause it
      if (isPlaying) {
        widget.pause();
        setIsPlaying(false);

        trackButtonClick('soundcloud_pause', {
          artist_name: artist.name
        });
        return;
      }

      // Set playing state immediately for instant feedback
      setIsPlaying(true);

      // Play from random position
      widget.getDuration((duration) => {
        if (duration && duration > 0) {
          const randomPosition = Math.floor(Math.random() * duration * 0.8);

          widget.seekTo(randomPosition);
          widget.play();

          trackButtonClick('soundcloud_play', {
            artist_name: artist.name,
            random_position_ms: randomPosition
          });
        } else {
          widget.play();
        }
      });

      // Fallback: if playback doesn't start within 3 seconds, reset state
      setTimeout(() => {
        widget.isPaused((paused) => {
          if (paused) {
            setIsPlaying(false);
          }
        });
      }, 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={handleClose}
    >

      <div
        className="w-full max-w-4xl pointer-events-auto bg-white max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-4 pb-0 flex-shrink-0">
          <div className="flex justify-end mb-2 sm:mb-4">
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="px-4 sm:px-8 overflow-y-auto flex-1 min-h-0">
          {/* Artist Info */}
          <div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 ${artist.description && artist.description.length > 300 ? 'mb-4 sm:mb-8' : 'mb-4 sm:mb-6'
              }`}>
              <div>
                <div>
                  <h3 className="text-sm mb-2 font-mono text-gray-600">ARTIST / ALIAS</h3>
                  <p className="text-2xl sm:text-3xl mt-2 text-gray-800">{artist.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-8">
                  <div>
                    <h3 className="text-sm mb-2 font-mono text-gray-600">SET TYPE</h3>
                    <p className="mt-1 text-gray-800">{artist.setType}</p>
                  </div>

                  <div>
                    <h3 className="text-sm mb-2 font-mono text-gray-600">BASED IN</h3>
                    <p className="mt-1 text-gray-800">{artist.basedIn}</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6">
                  <h3 className="text-sm mb-2 font-mono text-gray-600">RELATIONSHIP</h3>
                  <p className="mt-1 text-gray-800">{artist.artistType}</p>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative h-[200px] md:h-full min-h-[200px] md:min-h-[300px] bg-gray-100 order-first md:order-last">
                {artist.imageUrl && (
                  <Image
                    src={artist.imageUrl}
                    alt={`${artist.name} profile`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Description and Request Button */}
            <div className={`flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-8 ${artist.description && artist.description.length > 300 ? 'mt-4 sm:mt-8' : 'mt-4 sm:mt-6'
              }`}>
              {!artist.hideRequestButton && (
                <div className="w-full sm:w-auto flex-shrink-0 order-first sm:order-last">
                  {/* Buttons row - side by side on desktop */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={`mailto:bookings@qs1.berlin?subject=Booking Request ${artist.name}`}
                      onClick={handleBookingRequest}
                      className="font-mono py-2 sm:py-3 px-6 sm:px-8 text-gray-800 hover:text-white border border-gray-800 transition-all duration-200 whitespace-nowrap w-full sm:w-auto text-center block"
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#000000';
                        e.target.style.borderColor = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.borderColor = '#1f2937'; // gray-800
                      }}
                    >
                      REQUEST
                    </a>
                    {artist.socialLinks?.soundcloud && (
                      <button
                        onClick={handlePlayClick}
                        className="font-mono py-2 sm:py-3 px-6 sm:px-8 text-gray-800 hover:text-white border border-gray-800 transition-all duration-200 whitespace-nowrap w-full sm:w-auto text-center flex items-center justify-center gap-2"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#000000';
                          e.target.style.borderColor = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#1f2937'; // gray-800
                        }}
                        title={playbackFailed ? "Open on SoundCloud" : "Play"}
                      >
                        {playbackFailed ? (
                          // External link icon when playback failed
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M9 2L9 3L12.3 3L6 9.3L6.7 10L13 3.7L13 7L14 7L14 2L9 2zM4 4C2.9 4 2 4.9 2 6L2 12C2 13.1 2.9 14 4 14L10 14C11.1 14 12 13.1 12 12L12 9L11 10L11 12C11 12.6 10.6 13 10 13L4 13C3.4 13 3 12.6 3 12L3 6C3 5.4 3.4 5 4 5L6 5L7 4L4 4z" />
                          </svg>
                        ) : isPlaying ? (
                          // Animated playing bars
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        ) : (
                          // Play triangle icon
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3 2l10 6-10 6V2z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {/* Email below buttons */}
                  <div className="font-mono text-xs text-gray-600 text-center mt-2 px-6 sm:px-8">
                    bookings@qs1.berlin
                  </div>
                </div>
              )}
              <div className={`text-gray-800 leading-relaxed text-sm sm:text-base whitespace-pre-line pb-4 order-last sm:order-first ${artist.description && artist.description.length <= 300 && !artist.hideRequestButton ? 'sm:max-w-[70%]' : ''
                }`} style={{
                  flex: artist.description && artist.description.length > 300 ? '1' : 'none'
                }}>
                <div>
                  {artist.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden SoundCloud Player */}
        {showPlayer && artist?.socialLinks?.soundcloud && (
          <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', visibility: 'hidden' }}>
            <iframe
              ref={iframeRef}
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(artist.socialLinks.soundcloud)}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
            />
          </div>
        )}

        {/* Fixed Footer - Social Links */}
        <div className="px-4 sm:px-8 py-4 flex-shrink-0 border-t border-gray-100 bg-white">
          <div className="flex flex-wrap gap-4">
            {/* {artist.pressPackUrl && (
              <a 
                href={artist.pressPackUrl}
                download
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                PRESS KIT
              </a>
            )} */}
            {artist.socialLinks.soundcloud && (
              <a
                href={artist.socialLinks.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialLinkClick('soundcloud', artist.socialLinks.soundcloud)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                SOUNDCLOUD
              </a>
            )}
            {artist.socialLinks.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialLinkClick('instagram', artist.socialLinks.instagram)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                INSTAGRAM
              </a>
            )}
            {artist.socialLinks.tiktok && (
              <a
                href={artist.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialLinkClick('tiktok', artist.socialLinks.tiktok)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                TIKTOK
              </a>
            )}
            {artist.socialLinks.residentAdvisor && (
              <a
                href={artist.socialLinks.residentAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialLinkClick('resident_advisor', artist.socialLinks.residentAdvisor)}
                className="font-mono text-sm sm:text-base text-gray-800 hover:text-gray-600 transition-colors"
              >
                RESIDENT ADVISOR
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
} 