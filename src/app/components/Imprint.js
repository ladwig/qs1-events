'use client';

export default function Imprint({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto bg-black bg-opacity-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl pointer-events-auto bg-white h-[90vh] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="p-4 sm:p-6 pb-0 flex-shrink-0">
          <div className="flex justify-end mb-2 sm:mb-4">
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors text-xl"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto flex-1">
          <div className="space-y-8">
            <div>
              <p className="text-gray-800 mb-2">Angaben gemäß § 5 TMG:</p>
              <p className="text-gray-800">
                QS1 Berlin<br />
               Jacobsen Soto Rodriguez GbR<br />
               Streustraße 20<br />
               10243 Berlin<br />
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2 text-black">Kontakt</h3>
              <p className="text-gray-800">
                E-Mail: bookings@qs1.berlin
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2 text-black">Haftungsausschluss</h3>
              <p className="text-gray-800 leading-relaxed">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2 text-black">Datenschutz</h3>
              <p className="text-gray-800 leading-relaxed">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis.
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <div className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-all duration-300 hover:shadow-sm">
                <span className="text-xs font-mono text-gray-600">made with</span>
                <span className="text-red-500 animate-pulse group-hover:animate-bounce transition-all duration-300 text-sm">❤️</span>
                <span className="text-xs font-mono text-gray-600">by</span>
                <a 
                  href="https://www.giwdal.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-mono text-gray-800 hover:text-black transition-colors font-medium"
                >
                  Daniel Ladwig
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 