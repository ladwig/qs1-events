'use client';

export default function Imprint({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-8">
          {/* Header */}
          <div className="flex justify-end mb-4 sm:mb-8">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-mono mb-4">IMPRESSUM</h2>
              <p className="text-gray-800 mb-2">Angaben gemäß § 5 TMG:</p>
              <p className="text-gray-800">
                QS1 Berlin<br />
                Streustr. 20<br />
                13068 Berlin
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">VERTRETEN DURCH</h3>
              <p className="text-gray-800">
                Jacobsen / Soto Rodriguez GbR
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">KONTAKT</h3>
              <p className="text-gray-800">
                Telefon: +49 (0) 30 123456789<br />
                E-Mail: bookings@qs1.berlin
              </p>
            </div>


            <div>
              <h3 className="text-xl font-mono mb-2">VERANTWORTLICH FÜR DEN INHALT</h3>
              <p className="text-gray-800">
               QS1 Berlin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 