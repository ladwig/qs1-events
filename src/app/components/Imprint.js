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
              <h2 className="text-2xl font-mono mb-4">IMPRESSUM</h2>
              <p className="text-gray-800 mb-2">Angaben gemäß § 5 TMG:</p>
              <p className="text-gray-800">
                QS1 Berlin<br />
                Daniel Hensel<br />
                Neue Kantstraße 21<br />
                14057 Berlin<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2">Kontakt</h3>
              <p className="text-gray-800">
                E-Mail: bookings@qs1.berlin
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2">Haftungsausschluss</h3>
              <p className="text-gray-800 leading-relaxed">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-mono mb-2">Datenschutz</h3>
              <p className="text-gray-800 leading-relaxed">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets auf freiwilliger Basis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 