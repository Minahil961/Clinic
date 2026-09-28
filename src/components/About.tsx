import React from 'react';
import { SectionHeading } from './SectionHeading';
import { CheckCircle2, HeartHandshake, Microscope, ShieldCheck } from 'lucide-react';

interface AboutProps {
  onLearnMoreServices: () => void;
  onMeetDoctors: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMoreServices, onMeetDoctors }) => {
  const pillars = [
    {
      icon: Microscope,
      title: "State-of-the-Art Diagnostics",
      description: "Sub-millimeter 3D CBCT scans, intraoral digital impressions, and high-magnification endodontic optics for absolute diagnostic accuracy."
    },
    {
      icon: ShieldCheck,
      title: "Zero-Compromise Sterilization",
      description: "Class-B vacuum medical autoclaves, biological spore testing indicators, and hermetically sealed disposable instruments opened in your presence."
    },
    {
      icon: HeartHandshake,
      title: "Bespoke Personalized Care",
      description: "No rushed consultations. Every treatment plan is custom-architected around your facial anatomy, smile goals, schedule, and comfort."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FBF9F3] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Vogue Philosophy"
          title="Elevating Smile Architecture & Aesthetic Wellness"
          subtitle="Founded with a singular vision: to unify medical-grade cosmetic dentistry with precision dermatological aesthetics under one serene, world-class sanctuary in Lake City."
        />

        {/* Main Grid: Story & Clinic Visual */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Floating Founder Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#44562A]/10 bg-white">
              <img
                src="/src/assets/images/regenerated_image_1790563400270.png"
                alt="Vogue Dental & Aesthetics Reception Lounge"
                loading="lazy"
                className="w-full h-80 sm:h-96 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Founder Spotlight Card overlapping */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 bg-white p-5 rounded-2xl border border-[#44562A]/15 shadow-xl max-w-sm group/founder">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src="/src/assets/images/regenerated_image_1790563387982.png"
                    alt="Dr. Maha Farman - Head of Vogue Dental & Aesthetic"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#C9B98A] shadow-[0_0_14px_rgba(201,185,138,0.35)] group-hover/founder:shadow-[0_0_24px_rgba(201,185,138,0.7)] group-hover/founder:border-[#E8DFCA] group-hover/founder:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-[#C9B98A]/40" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2A3320] leading-snug">
                    Dr. Maha Farman
                  </h4>
                  <p className="text-xs font-semibold text-[#44562A] uppercase tracking-wider">
                    Head of Vogue Dental &amp; Aesthetic
                  </p>
                  <p className="text-[11px] text-[#2A3320]/70 mt-0.5">
                    Dental Surgeon · C-Endo · C-Ortho · C-Prostho
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs italic text-[#2A3320]/80 border-t border-[#44562A]/10 pt-2">
                "A truly radiant smile is not merely about straight teeth—it is the harmonious bridge between dental health and facial proportion."
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#2A3320]/85 font-normal">
              <p>
                At <strong>VOGUE Dental &amp; Aesthetics</strong>, we have redefined the clinic experience. Gone are sterile, anxiety-inducing dentist chairs and clinical intimidation. Instead, our Lake City boutique clinic is designed as a tranquil wellness retreat where your oral health and facial aesthetics are treated as an integrated art.
              </p>
              <p>
                Whether you visit for an in-office laser whitening session, a complex microscopic root canal restoration, full-arch dental implants, or a clinical HydraFacial and dermal sculpting, our multidisciplinary team collaborates to achieve seamless results that look organic and effortless.
              </p>
            </div>

            {/* Feature Points */}
            <div className="pt-4 space-y-3.5">
              {[
                "Painless computer-controlled local anesthesia & soothing touch techniques",
                "Digital smile simulation preview before any irreversible work begins",
                "Fully individualized treatment timelines designed around your lifestyle",
                "Strict infection control with medical-grade hospital sterilization"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#44562A] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#2A3320]">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onMeetDoctors}
                className="px-6 py-2.5 bg-[#44562A] text-[#F5F0E1] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#34431F] transition-all shadow-md cursor-pointer"
              >
                Meet Our Specialists
              </button>
              <button
                onClick={onLearnMoreServices}
                className="px-6 py-2.5 bg-transparent border border-[#44562A]/30 text-[#44562A] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#44562A]/10 transition-all cursor-pointer"
              >
                Explore Treatments
              </button>
            </div>
          </div>
        </div>

        {/* Core Clinical Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#44562A]/10 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#44562A]/10 flex items-center justify-center text-[#44562A] mb-5 group-hover:bg-[#44562A] group-hover:text-[#F5F0E1] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2A3320] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#2A3320]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
