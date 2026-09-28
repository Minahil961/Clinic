import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Sparkles, Award, Star } from 'lucide-react';
import { CLINIC_STATS, CLINIC_CONTACT } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-[#34431F] via-[#44562A] to-[#34431F] text-[#F5F0E1] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Subtle background glow & texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5F0E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#6B7F4A]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#C9B98A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B7F4A]/30 border border-[#C9B98A]/30 text-[#F5F0E1] text-xs uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9B98A]" />
              <span>Lake City's Premier Aesthetic Dental Sanctuary</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal leading-[1.08] tracking-tight text-balance text-[#F5F0E1]">
              Where Smiles Meet <span className="italic font-light text-[#E8DFCA]">Aesthetics</span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-[#F5F0E1]/85 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Experience the seamless synergy of master-crafted cosmetic dentistry and world-class facial aesthetics. Led by Dr. Maha Farman, we deliver painless treatments designed to elevate your natural beauty with international clinical standards.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#F5F0E1] text-[#34431F] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-white active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#44562A] group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-[#F5F0E1]/40 text-[#F5F0E1] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#6B7F4A]/30 hover:border-[#F5F0E1] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#C9B98A]" />
              </button>
            </div>

            {/* Key trust markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#F5F0E1]/75">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9B98A]" />
                <span>Hospital-Grade Class-B Sterilization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C9B98A]" />
                <span>Internationally Certified Faculty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#C9B98A] text-[#C9B98A]" />
                <span>5.0 Star Patient Ratings</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C9B98A]/30 via-transparent to-[#6B7F4A]/40 blur-lg" />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C9B98A]/30 shadow-2xl bg-[#34431F]">
                <img
                  src="/src/assets/images/hero_luxury_clinic_1790612324660.jpg"
                  alt="Vogue Dental & Aesthetics Luxury Clinic Suite in Lake City"
                  loading="eager"
                  className="w-full h-80 sm:h-96 lg:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Scrim Overlay & Floating info badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-[#44562A]/90 backdrop-blur-md p-4 rounded-xl border border-[#C9B98A]/30 text-[#F5F0E1] shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#C9B98A] font-semibold">Flagship Facility</p>
                        <p className="text-sm font-medium">C43/11, 2nd Floor, Lake City</p>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-semibold bg-[#6B7F4A] rounded-md text-white">
                        Open Mon-Sat
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip / Animated Numbers */}
        <div className="mt-16 pt-10 border-t border-[#6B7F4A]/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {CLINIC_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#34431F]/40 border border-[#6B7F4A]/30 backdrop-blur-xs hover:border-[#C9B98A]/60 transition-colors"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F5F0E1] tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#C9B98A] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
