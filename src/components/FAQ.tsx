import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { FAQ_ITEMS } from '../data/clinicData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT } from '../data/clinicData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F5F0E1] text-[#2A3320]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything You Need to Know"
          subtitle="Answers to common queries regarding appointments, painless techniques, hospital sterilization, and clinical fees."
        />

        {/* FAQ Accordion List */}
        <div className="mt-14 space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#44562A]/15 overflow-hidden transition-all duration-200 shadow-xs hover:border-[#44562A]/30"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#44562A]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#6B7F4A] tracking-wider uppercase hidden sm:inline">
                      0{idx + 1}.
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A3320]">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F5F0E1] flex items-center justify-center text-[#44562A] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#44562A] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#44562A]/10 text-xs sm:text-sm text-[#2A3320]/80 leading-relaxed font-light">
                    <p>{item.answer}</p>
                    <div className="mt-3 pt-2 text-[11px] text-[#6B7F4A] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7F4A]" />
                      <span>Category: {item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[#44562A] text-[#F5F0E1] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#6B7F4A]/40 text-[#C9B98A] flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold">Have a specific clinical question?</h4>
              <p className="text-xs text-[#F5F0E1]/80 mt-0.5">
                Our resident dentist and care coordinator are available for instant WhatsApp consultations.
              </p>
            </div>
          </div>

          <a
            href={CLINIC_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#F5F0E1] text-[#34431F] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#44562A]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
