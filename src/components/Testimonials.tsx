import React, { useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';
import { TESTIMONIALS } from '../data/clinicData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-[#44562A] text-[#F5F0E1] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative quotes background watermark icon */}
      <Quote className="absolute -top-10 -right-10 w-80 h-80 text-[#34431F]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          theme="dark"
          badge="Verified Patient Experiences"
          title="Stories of Transformed Smiles &amp; Confidence"
          subtitle="Read genuine reflections from patients who entrusted their oral health and facial aesthetics to Vogue Dental &amp; Aesthetics."
        />

        {/* Carousel Container */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative bg-[#34431F]/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-[#6B7F4A]/40 shadow-2xl">
            {/* Star Rating */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1 text-[#C9B98A]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#F5F0E1]/60 font-light">
                {current.date}
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-[#F5F0E1] leading-relaxed italic">
              "{current.comment}"
            </p>

            {/* Patient Info Footer */}
            <div className="mt-8 pt-6 border-t border-[#6B7F4A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#F5F0E1]">
                  {current.patientName}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[#C9B98A] font-medium">
                    {current.treatment}
                  </span>
                  <span className="text-[#F5F0E1]/40">·</span>
                  <span className="text-xs text-[#F5F0E1]/70">
                    {current.department}
                  </span>
                </div>
              </div>

              {current.verified && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#44562A] text-xs font-semibold text-[#F5F0E1] border border-[#6B7F4A]/40 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9B98A]" />
                  <span>Verified Patient</span>
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-[#C9B98A]'
                        : 'w-2 bg-[#6B7F4A]/50 hover:bg-[#F5F0E1]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-[#44562A] text-[#F5F0E1] hover:bg-[#6B7F4A] transition-colors border border-[#6B7F4A]/40 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-[#44562A] text-[#F5F0E1] hover:bg-[#6B7F4A] transition-colors border border-[#6B7F4A]/40 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
