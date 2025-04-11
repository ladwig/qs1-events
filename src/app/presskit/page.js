'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PressKit() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Back button */}
      <div className="max-w-[21cm] mx-auto mb-4">
        <Link 
          href="/"
          className="text-gray-600 hover:text-gray-900 font-mono text-sm"
        >
          ← BACK TO HOME
        </Link>
      </div>

      {/* A4 Page */}
      <div className="bg-white mx-auto w-full max-w-[21cm] min-h-[29.7cm] shadow-lg p-[2.54cm] font-mono">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="relative w-24 h-24">
            <Image
              src="/logo.svg"
              alt="QS1 Logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold mb-2">QS1 BERLIN</h1>
            <p className="text-sm text-gray-600">PRESS KIT 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 mb-16">
          {/* Featured Image */}
          <div className="relative w-full h-48 bg-gray-200 mb-8">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              FEATURED IMAGE PLACEHOLDER
            </div>
          </div>

          {/* Headline */}
          <div className="border-b-2 border-black pb-2 mb-8">
            <h2 className="text-3xl font-bold">ELECTRONIC MUSIC REDEFINED</h2>
            <p className="text-sm mt-2">PUSHING BOUNDARIES IN BERLIN'S UNDERGROUND SCENE</p>
          </div>

          {/* About Section with Two Columns */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <section>
              <h2 className="text-xl font-bold mb-4">ABOUT</h2>
              <p className="text-sm leading-relaxed">
                QS1 is a Berlin-based artist management and event production company, dedicated to curating exceptional electronic music experiences. We represent a carefully selected roster of innovative artists and collaborate with renowned venues and festivals to create unforgettable events.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">ACHIEVEMENTS</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Events Produced</span>
                  <span className="font-bold">200+</span>
                </div>
                <div className="flex justify-between">
                  <span>Artists Represented</span>
                  <span className="font-bold">15+</span>
                </div>
                <div className="flex justify-between">
                  <span>Venues Partnered</span>
                  <span className="font-bold">25+</span>
                </div>
                <div className="flex justify-between">
                  <span>Years Active</span>
                  <span className="font-bold">5+</span>
                </div>
              </div>
            </section>
          </div>

          {/* Event History Table */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">RECENT EVENTS</h2>
            <div className="overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">DATE</th>
                    <th className="text-left py-2">EVENT</th>
                    <th className="text-left py-2">VENUE</th>
                    <th className="text-right py-2">CAPACITY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">2024-03-15</td>
                    <td className="py-2">UNDERGROUND ECHO</td>
                    <td className="py-2">TRESOR</td>
                    <td className="text-right py-2">1500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">2024-02-28</td>
                    <td className="py-2">TECHNO FUSION</td>
                    <td className="py-2">BERGHAIN</td>
                    <td className="text-right py-2">1600</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">2024-01-20</td>
                    <td className="py-2">DIGITAL DREAMS</td>
                    <td className="py-2">WATERGATE</td>
                    <td className="text-right py-2">800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Technical Requirements with Icons */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">TECHNICAL REQUIREMENTS</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="border p-4">
                <h3 className="font-bold mb-2">SOUND SYSTEM</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Professional sound system</li>
                  <li>2x monitor speakers</li>
                  <li>4-channel mixer</li>
                  <li>2x XLR cables</li>
                </ul>
              </div>
              <div className="border p-4">
                <h3 className="font-bold mb-2">DJ EQUIPMENT</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>2x CDJ-3000</li>
                  <li>DJM-900NXS2</li>
                  <li>Stable platform</li>
                </ul>
              </div>
              <div className="border p-4">
                <h3 className="font-bold mb-2">LIVE SETUP</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>2m x 1m space</li>
                  <li>4x power outlets</li>
                  <li>Proper lighting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Image Grid */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">GALLERY</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    IMAGE {i}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact and Social */}
          <div className="grid grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold mb-4">CONTACT</h2>
              <div className="text-sm space-y-2">
                <p><strong>General:</strong> info@qs1.events</p>
                <p><strong>Bookings:</strong> bookings@qs1.events</p>
                <p><strong>Press:</strong> press@qs1.events</p>
                <p><strong>Location:</strong> Berlin, Germany</p>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">SOCIAL MEDIA</h2>
              <div className="text-sm space-y-2">
                <p><strong>Website:</strong> www.qs1.studio</p>
                <p><strong>Instagram:</strong> @qs1berlin</p>
                <p><strong>RA:</strong> ra.co/promoters/111445</p>
                <p><strong>SoundCloud:</strong> /qs1studio</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-xs text-gray-400">
          <div className="flex justify-between items-center">
            <span>© 2024 QS1 BERLIN</span>
            <span>PRESS KIT V1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
} 