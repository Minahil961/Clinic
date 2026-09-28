import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/clinicData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back To Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-8 right-5 z-30 w-11 h-11 rounded-full bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] shadow-xl border border-[#6B7F4A]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Sticky Quick Action Bar (capped <= 12% of screen height) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#34431F]/95 backdrop-blur-md border-t border-[#6B7F4A]/30 p-2.5 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
        <a
          href={`tel:${CLINIC_CONTACT.phone}`}
          className="flex-1 py-2 px-3 rounded-xl bg-[#44562A] text-[#F5F0E1] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#C9B98A]" />
          <span>Call</span>
        </a>

        <a
          href={CLINIC_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2 px-3 rounded-xl bg-[#F5F0E1] text-[#34431F] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md"
        >
          <Calendar className="w-3.5 h-3.5 text-[#44562A]" />
          <span>Book</span>
        </button>
      </div>
    </>
  );
};
