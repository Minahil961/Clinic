import React from 'react';
import { SectionHeading } from './SectionHeading';
import {
  Cpu,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Heart,
  CalendarCheck
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Cpu,
      title: "Advanced 3D Digital Technology",
      description: "From low-radiation 3D CBCT bone scans to iTero 5D intraoral optical scanning and soft-tissue lasers, our diagnostics eliminate guesswork."
    },
    {
      icon: GraduationCap,
      title: "Internationally Fellowship Specialists",
      description: "Our doctors hold postgraduate qualifications from prestigious institutions in the UK, USA, and Europe, staying at the cutting edge of clinical science."
    },
    {
      icon: ShieldCheck,
      title: "Hospital-Grade Class-B Sterilization",
      description: "We enforce strict multi-barrier infection protocols with medical vacuum autoclaves and biological spore tests for uncompromised patient safety."
    },
    {
      icon: UserCheck,
      title: "Personalized Aesthetic Blueprint",
      description: "Every smile and facial treatment is custom-engineered using digital golden-ratio simulations to match your unique bone structure and skin tone."
    },
    {
      icon: Heart,
      title: "Painless & Anxiety-Free Care",
      description: "Enjoy computer-controlled micro-numbing, relaxing noise-canceling headphones, and a tranquil boutique atmosphere designed to soothe dental fears."
    },
    {
      icon: CalendarCheck,
      title: "Flexible Hours & Emergency Intake",
      description: "Open 6 days a week until 9:00 PM in Lake City with dedicated same-day emergency slots for sudden toothaches or trauma."
    }
  ];

  return (
    <section id="why-vogue" className="py-20 lg:py-28 bg-[#F5F0E1] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Gold Standard"
          title="Why Discerning Patients Choose Vogue"
          subtitle="Combining surgical precision, artistic finesse, and luxury comfort to deliver results that speak for themselves."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs rounded-2xl p-8 border border-[#44562A]/10 hover:border-[#44562A]/30 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#44562A]/10 text-[#44562A] flex items-center justify-center mb-6 group-hover:bg-[#44562A] group-hover:text-[#F5F0E1] transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A3320] mb-3 group-hover:text-[#44562A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#2A3320]/75 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
