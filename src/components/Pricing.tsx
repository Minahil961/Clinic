import React from 'react';
import { SectionHeading } from './SectionHeading';
import { PRICING_PACKAGES } from '../data/clinicData';
import { Check, Sparkles, Calendar, Info } from 'lucide-react';
import { PricingPackage } from '../types';

interface PricingProps {
  onBookPackage: (pkg: PricingPackage) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBookPackage }) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#FBF9F3] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Transparent Care Plans"
          title="Curated Packages &amp; Consultations"
          subtitle="Explore our most sought-after holistic smile and aesthetic treatment packages, engineered with uncompromised quality and transparent pricing."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-white border-2 border-[#44562A] shadow-xl hover:-translate-y-1'
                  : 'bg-white/80 border border-[#44562A]/15 hover:border-[#44562A]/40 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular Tag */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#44562A] text-[#F5F0E1] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C9B98A]" />
                  <span>{pkg.tag}</span>
                </div>
              )}

              <div>
                <span className="text-[11px] font-semibold text-[#6B7F4A] uppercase tracking-wider">
                  {pkg.department}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A3320] mt-1 leading-snug">
                  {pkg.title}
                </h3>

                <div className="mt-4 pb-4 border-b border-[#44562A]/10">
                  <p className="text-xs font-semibold text-[#44562A] uppercase tracking-wider">
                    {pkg.priceNote}
                  </p>
                  <p className="text-xs text-[#2A3320]/70 mt-1 font-light">
                    {pkg.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="mt-5 space-y-2.5 text-xs text-[#2A3320]/80">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#44562A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-[#44562A]/10">
                <button
                  onClick={() => onBookPackage(pkg)}
                  className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F]'
                      : 'bg-[#F5F0E1] text-[#2A3320] hover:bg-[#44562A] hover:text-[#F5F0E1]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Package</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-[#44562A]/10 max-w-2xl mx-auto flex items-center gap-3 text-xs text-[#2A3320]/75">
          <Info className="w-4 h-4 text-[#44562A] shrink-0" />
          <p>
            Exact procedure costs and tailored treatment durations are confirmed following an individualized clinical evaluation and 3D diagnostic scan. Installment options available for comprehensive treatments.
          </p>
        </div>
      </div>
    </section>
  );
};
