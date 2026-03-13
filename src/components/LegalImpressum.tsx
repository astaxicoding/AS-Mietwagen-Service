
import React from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/Logo';
import { CONTACT_INFO } from '@/constants';

interface ImpressumProps {
  isOpen: boolean;
  onClose: () => void;
}

const Impressum: React.FC<ImpressumProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full h-full md:h-[80vh] md:max-w-4xl bg-white md:rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slideUp">
        
        <div className="px-8 pt-10 pb-6 bg-white sticky top-0 z-30 border-b border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <Logo className="h-10 w-auto" variant="dark" />
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-black hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>
          </div>
          <h2 className="text-3xl font-[900] text-black tracking-tighter">Impressum</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar space-y-8">
          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Angaben gemäß § 5 TMG</h3>
            <p className="text-lg font-bold text-black leading-tight">
              AS Taxi und Mietwagen Service<br />
              {CONTACT_INFO.address}<br />
              {CONTACT_INFO.city}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Vertreten durch</h3>
            <p className="text-lg font-bold text-black leading-tight">
              Inhaber: Alperen Sahin
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Kontakt</h3>
            <p className="text-lg font-bold text-black leading-tight">
              Telefon: {CONTACT_INFO.phone}<br />
              Mobil: {CONTACT_INFO.mobile}<br />
              E-Mail: {CONTACT_INFO.email}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Umsatzsteuer-ID</h3>
            <p className="text-lg font-bold text-black leading-tight">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE356842512
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Aufsichtsbehörde</h3>
            <p className="text-lg font-bold text-black leading-tight">
              Kreisverwaltung Mainz-Bingen<br />
              Georg-Rückert-Straße 11<br />
              55218 Ingelheim am Rhein
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Haftung für Inhalte</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-4">Urheberrecht</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-dark transition-all transform active:scale-95"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
