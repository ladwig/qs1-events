'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * EcwidMerchModal - Integrates Ecwid ecommerce store in a modal
 * 
 * Features:
 * - Shows all products directly without category navigation
 * - Prevents cookie consent dialogs
 * - Uses grid layout for product display
 * - Responsive design for mobile and desktop
 * 
 * Store ID: 107567771
 */
export default function EcwidMerchModal({ onClose }) {
  const storeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Enhanced close handler that resets Ecwid state before closing
  const handleClose = () => {
    try {
      // Force Ecwid back to category view immediately when closing
      if (window.Ecwid && window.Ecwid.openPage) {
        window.Ecwid.openPage('category', {categoryId: 172237020});
      }
      
      // Clear any navigation state
      if (window.Ecwid && window.Ecwid.clearHistory) {
        window.Ecwid.clearHistory();
      }
    } catch (error) {
      // Ignore errors during close cleanup
    }
    
    // Call the parent close handler
    onClose();
  };

  useEffect(() => {
    let isMounted = true;
    let initializationTimeout = null;
    let loadingTimeout = null;
    let ecwidInitialized = false;
    let storeObserver = null;

    // Function to hide loading after a delay regardless of Ecwid status
    const hideLoadingFallback = () => {
      loadingTimeout = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 3000); // Hide loading after 3 seconds maximum
    };

    // Function to observe changes in the store container
    const observeStoreContent = () => {
      if (storeRef.current && window.MutationObserver) {
        storeObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              // Check if products have been added
              const hasProducts = storeRef.current.querySelector('.ec-grid-product, .grid-product');
              if (hasProducts && isMounted) {
                setIsLoading(false);
                if (storeObserver) {
                  storeObserver.disconnect();
                  storeObserver = null;
                }
              }
            }
          });
        });

        storeObserver.observe(storeRef.current, {
          childList: true,
          subtree: true
        });
      }
    };

    // Function to safely initialize the Ecwid store
    const initializeEcwidStore = () => {
      if (!isMounted || ecwidInitialized) return;

      try {
        if (window.xProductBrowser && storeRef.current) {
          // Clear any existing content first
          storeRef.current.innerHTML = '';
          
          // Configure Ecwid store to show products from Merch category only
          window.xProductBrowser(
            "categoriesPerRow=0",           // Don't show categories
            "views=grid(20,2)",             // Grid view with 2 columns, 20 products per page
            "categoryView=hidden",          // Hide category navigation
            "searchView=grid",              // Use grid view for search results
            "defaultCategoryId=172237020",  // Show Merch category products directly
            "showCategoriesAsTable=false",  // Disable category table view
            "showCategoryMenu=false",       // Hide category menu
            "id=my-store-107567771"         // Store container ID
          );

          ecwidInitialized = true;

          // Start observing for content changes
          observeStoreContent();

          // Use proper Ecwid API initialization with error handling
          if (window.Ecwid && window.Ecwid.OnAPILoaded) {
            try {
              window.Ecwid.OnAPILoaded.add(() => {
                if (isMounted && window.Ecwid && window.Ecwid.openPage) {
                  window.Ecwid.openPage('category', {categoryId: 172237020});
                  // Don't immediately hide loading here, let the observer handle it
                }
              });
            } catch (error) {
              console.warn('Ecwid OnAPILoaded error:', error);
              if (isMounted) setIsLoading(false);
            }
          } else {
            // Fallback for when OnAPILoaded is not available yet
            initializationTimeout = setTimeout(() => {
              if (isMounted && window.Ecwid && window.Ecwid.openPage) {
                try {
                  window.Ecwid.openPage('category', {categoryId: 172237020});
                } catch (error) {
                  console.warn('Ecwid openPage error:', error);
                }
              }
              // Don't immediately hide loading here, let the observer handle it
            }, 1500);
          }

          // Start the fallback timer
          hideLoadingFallback();
        }
      } catch (error) {
        console.warn('Ecwid initialization error:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    // Configure Ecwid to disable cookies and tracking
    try {
      window.ec = window.ec || {};
      window.ec.config = window.ec.config || {};
      window.ec.config.tracking_enabled = false;
      window.ec.config.cookies_enabled = false;
    } catch (error) {
      console.warn('Ecwid config error:', error);
    }

    // Check if Ecwid script is already loaded
    const existingScript = document.querySelector('script[src*="app.ecwid.com/script.js"]');
    
    if (!existingScript) {
      // Create and load the Ecwid script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://app.ecwid.com/script.js?107567771&data_platform=code&data_date=2025-08-03';
      script.charset = 'utf-8';
      script.setAttribute('data-cfasync', 'false');
      
      script.onload = () => {
        if (isMounted) {
          setIsScriptLoaded(true);
          // Wait a bit for Ecwid to fully initialize
          setTimeout(() => {
            if (isMounted) {
              initializeEcwidStore();
            }
          }, 300);
        }
      };

      script.onerror = () => {
        console.warn('Failed to load Ecwid script');
        if (isMounted) setIsLoading(false);
      };
      
      document.head.appendChild(script);
    } else {
      setIsScriptLoaded(true);
      // Script already exists, just initialize the store
      setTimeout(() => {
        if (isMounted) {
          initializeEcwidStore();
        }
      }, 200);
      // Also start the fallback timer in case initialization fails
      hideLoadingFallback();
    }

    // Cleanup function
    return () => {
      isMounted = false;
      
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
      }

      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }

      if (storeObserver) {
        storeObserver.disconnect();
      }

      // More thorough cleanup - especially important when closing from product detail pages
      try {
        // Force Ecwid to navigate back to category view before cleanup
        if (window.Ecwid && window.Ecwid.openPage) {
          try {
            window.Ecwid.openPage('category', {categoryId: 172237020});
          } catch (error) {
            // Ignore navigation errors during cleanup
          }
        }

        // Clear store content
        if (storeRef.current) {
          storeRef.current.innerHTML = '';
        }

        // Reset Ecwid internal state more aggressively
        if (window.Ecwid) {
          try {
            // Clear navigation history if available
            if (window.Ecwid.clearHistory) {
              window.Ecwid.clearHistory();
            }
            
            // Reset any internal state
            if (window.Ecwid.reset) {
              window.Ecwid.reset();
            }
            
            // Destroy instance
            if (window.Ecwid.destroy) {
              window.Ecwid.destroy();
            }
          } catch (error) {
            // Ignore Ecwid cleanup errors
          }
        }

        // Clear any global Ecwid state variables
        if (window.ec) {
          try {
            window.ec.storefront = null;
            window.ec.store = null;
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-end items-center">
            <button 
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-900 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Ecwid Store Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4 sm:p-6 pt-0">
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading store...</div>
              </div>
            )}
            
            {/* Ecwid Store Container */}
            <div ref={storeRef} id="my-store-107567771"></div>
            
            {/* Custom CSS to hide categories and style the store */}
            <style jsx>{`
              /* Hide all category-related elements - targeting specific Ecwid classes */
              .grid__categories,
              .grid-category,
              .grid-category__wrap,
              .grid-category__wrap-inner,
              .grid-category__card,
              .grid-category__title,
              .grid-category__title-inner,
              .ecwid-categories,
              .ec-breadcrumbs,
              .ec-category-name,
              .ec-category-tree,
              .ec-category-navigation,
              .ecwid-category-tree,
              .ecwid .ec-category,
              .ecwid .category-tree,
              .ecwid .breadcrumbs,
              .ec-category-link,
              .ec-category-links,
              .ecwid .category-link,
              .ecwid .category-links,
              .ecwid-category-link,
              .ecwid-category-links,
              .ec-navigation,
              .ecwid-navigation,
              .ec-menu,
              .ecwid-menu,
              .ec-store-menu,
              .ecwid-store-menu,
              .ec-store-navigation,
              .ecwid-store-navigation,
              .ec-category-row,
              .ecwid-category-row,
              .ec-categories-list,
              .ecwid-categories-list,
              .ec-category-item,
              .ecwid-category-item,
              [class*="grid__categories"],
              [class*="grid-category"],
              [class*="category"],
              [class*="breadcrumb"],
              [class*="navigation"] {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                position: absolute !important;
                left: -9999px !important;
              }
              
              /* Hide cookie consent dialogs and privacy notices */
              .ec-cookie-consent,
              .ecwid-cookie-notice,
              .cookie-consent,
              .cookie-banner,
              .ec-notice,
              .ecwid-notice,
              .ec-notices__wrap,
              .ec-notice--cookie,
              .ec-notice__wrap,
              .ec-notice__message,
              .ec-notice__title,
              .ec-notice__title-inner,
              .ec-notice__text,
              .ec-notice__text-inner,
              .ec-notice__buttons,
              .ec-notice__button,
              .ec-notice__control,
              [class*="cookie"],
              [class*="consent"],
              [class*="notice"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                position: absolute !important;
                left: -9999px !important;
                z-index: -1 !important;
              }
              
              /* Force products to display immediately */
              .ecwid .ec-store-wrapper,
              .ecwid .ec-product-browser,
              .ecwid .ec-grid,
              .ecwid .ec-products,
              .grid__products {
                display: block !important;
              }
              
              /* Style the product grid */
              .ecwid .ec-grid-product,
              .grid-product {
                margin-bottom: 20px;
              }
              
              /* Force 2 columns grid layout */
              .ecwid .ec-grid,
              .grid__products {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 20px !important;
                width: 100% !important;
              }
              
              /* Make product images fill container completely */
              .ecwid .ec-grid-product__image,
              .ecwid .ec-grid-product__picture,
              .grid-product__image,
              .grid-product__picture,
              .ecwid .ec-product-image,
              .ecwid .ec-product-picture,
              .ec-product-image img,
              .ec-grid-product__image img,
              .grid-product__image img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                object-position: center !important;
                aspect-ratio: 1 / 1 !important;
              }
              
              /* Ensure image containers maintain aspect ratio */
              .ecwid .ec-grid-product__image,
              .ecwid .ec-grid-product__picture,
              .grid-product__image,
              .grid-product__picture {
                width: 100% !important;
                aspect-ratio: 1 / 1 !important;
                overflow: hidden !important;
                border-radius: 4px !important;
              }
              
              /* Ensure responsive grid maintains 2 columns */
              @media (max-width: 768px) {
                .ecwid .ec-grid,
                .grid__products {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 15px !important;
                }
              }
              
              @media (max-width: 480px) {
                .ecwid .ec-grid,
                .grid__products {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 10px !important;
                }
                
                /* Adjust product spacing on very small screens */
                .ecwid .ec-grid-product,
                .grid-product {
                  margin-bottom: 15px;
                }
              }

              /* Add observer to remove categories dynamically */
              #my-store-107567771 * {
                transition: none !important;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
} 