'use client';

export default function MerchModal({ onClose }) {
  const merchItems = [
    {
      name: 'Classic T-Shirt, black',
      price: '20€',
      image: '/merch/classic.png',
      soldOut: true
    },
    {
      name: 'BERLIN TECHNO HOODIE',
      price: '€85',
      image: '/logo.svg',
      soldOut: true
    },
    {
      name: 'STUDIO TOTE BAG',
      price: '€25',
      image: '/logo.svg',
      soldOut: true
    },
    {
      name: 'LIMITED VINYL',
      price: '€30',
      image: '/logo.svg',
      soldOut: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-2xl pointer-events-auto bg-white flex flex-col max-h-[80vh]">
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
                  <div key={index} className="relative group">
                    {/* Image */}
                    <div className="aspect-square bg-gray-100 mb-2 relative overflow-hidden">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`relative ${item.image === '/logo.svg' ? 'w-1/2 h-1/2' : 'w-full h-full'}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className={`object-cover w-full h-full ${item.image === '/logo.svg' ? 'invert' : ''}`}
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