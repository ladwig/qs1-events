'use client';

import { useState } from 'react';

export default function MerchModal({ onClose }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const merchItems = [
    {
      name: 'Classic T-Shirt, beige',
      price: '25€',
      image: '/merch/beige-1.jpg',
      hoverImage: '/merch/beige-2.jpg',
      soldOut: false
    },
    {
      name: 'T-Shirt Spray, black',
      price: '25€',
      image: '/merch/spray-shirt-black-4.jpg',
      hoverImage: '/merch/spray-shirt-black-3.jpg',
      soldOut: false
    },
    {
      name: 'Classic T-Shirt, black',
      price: '20€',
      image: '/merch/classic.png',
      soldOut: true
    },
    {
      name: 'Heavy Weight Classic Hoodie, black',
      price: '62€',
      image: '/merch/classic-hoodie-6.jpg',
      hoverImage: '/merch/classic-hoodie-4.jpg',
      soldOut: true
    },
    {
      name: 'Heavy Weight Clean Hoodie, black',
      price: '58€',
      image: '/merch/hoodie_front.webp',
      soldOut: true
    },
    {
      name: 'T-Shirt Spray, white',
      price: '25€',
      image: '/merch/white.webp',
      soldOut: true
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl pointer-events-auto bg-white flex flex-col max-h-[80vh]"
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
          {/* Content */}
          <div className="space-y-6">
            {/* Grid of items */}
            <div className="grid grid-cols-2 gap-6">
              {merchItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Image */}
                    <div className="aspect-square bg-gray-100 mb-2 relative overflow-hidden">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`relative ${item.image === '/logo.svg' ? 'w-1/2 h-1/2' : 'w-full h-full'}`}>
                          <img
                            src={hoveredItem === index && item.hoverImage ? item.hoverImage : item.image}
                            alt={item.name}
                              className={`object-cover w-full h-full transition-all duration-300 ${item.image === '/logo.svg' ? 'invert' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Sold Out Overlay */}
                      {item.soldOut && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-mono font-bold text-sm">SOLD OUT</span>
                    </div>
                      )}
                  </div>
                  
                  {/* Item Info */}
                    <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm text-gray-900">{item.name}</h3>
                        <span className="text-sm text-gray-900">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 