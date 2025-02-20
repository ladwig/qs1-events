'use client';

export default function Imprint({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto bg-white max-h-[90vh] overflow-y-auto">
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
                QS1 Studio GmbH<br />
                Musterstraße 123<br />
                10115 Berlin
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">VERTRETEN DURCH</h3>
              <p className="text-gray-800">
                Geschäftsführer: Max Mustermann
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">KONTAKT</h3>
              <p className="text-gray-800">
                Telefon: +49 (0) 30 123456789<br />
                E-Mail: events@qs1.studio
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">REGISTEREINTRAG</h3>
              <p className="text-gray-800">
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                Registernummer: HRB 123456
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">UMSATZSTEUER-ID</h3>
              <p className="text-gray-800">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE 123 456 789
              </p>
            </div>

            <div>
              <h3 className="text-xl font-mono mb-2">VERANTWORTLICH FÜR DEN INHALT</h3>
              <p className="text-gray-800">
                Max Mustermann<br />
                QS1 Studio GmbH<br />
                Musterstraße 123<br />
                10115 Berlin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 