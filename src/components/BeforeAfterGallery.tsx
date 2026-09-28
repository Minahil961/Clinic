import React, { useState, useRef, useCallback } from 'react';
import { SectionHeading } from './SectionHeading';
import { BEFORE_AFTER_CASES } from '../data/clinicData';
import { ArrowLeftRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface BeforeAfterGalleryProps {
  onBookTreatment: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onBookTreatment }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cosmetic' | 'aesthetics' | 'ortho'>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(BEFORE_AFTER_CASES[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const filteredCases = BEFORE_AFTER_CASES.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  const currentCase = BEFORE_AFTER_CASES.find((c) => c.id === selectedCaseId) || BEFORE_AFTER_CASES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FBF9F3] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clinical Smile &amp; Skin Transformations"
          title="Real Patients. Remarkable Harmony."
          subtitle="Drag the interactive slider below to inspect the transformative precision achieved by our dental surgeons and aesthetic physicians."
        />

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Cases' },
            { id: 'cosmetic', label: 'Cosmetic Dentistry & Veneers' },
            { id: 'ortho', label: 'Invisalign & Orthodontics' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                const matchingCase = BEFORE_AFTER_CASES.find(
                  (c) => cat.id === 'all' || c.category === cat.id
                );
                if (matchingCase) setSelectedCaseId(matchingCase.id);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#44562A] text-[#F5F0E1] shadow-md'
                  : 'bg-white text-[#2A3320]/80 border border-[#44562A]/15 hover:border-[#44562A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Comparison Slider on Left */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#44562A]/20 select-none cursor-ew-resize bg-[#2A3320]"
            >
              {/* After Image (Full background) */}
              <img
                src={currentCase.afterImage}
                alt={`${currentCase.title} - After treatment`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute top-4 right-4 bg-[#44562A]/90 text-[#F5F0E1] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-xs">
                After
              </span>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt={`${currentCase.title} - Before treatment`}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <span className="absolute top-4 left-4 bg-black/70 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-xs">
                  Before
                </span>
              </div>

              {/* Draggable Divider Line & Knob */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#44562A] border-2 border-white text-white flex items-center justify-center shadow-xl transform -translate-x-1/2">
                  <ArrowLeftRight className="w-4 h-4 text-[#F5F0E1]" />
                </div>
              </div>

              {/* Instructional hint overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white/90 text-[11px] px-3.5 py-1 rounded-full z-10 pointer-events-none">
                Drag slider to compare before &amp; after
              </div>
            </div>
          </div>

          {/* Case Details and Selection on Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-[#44562A]/10 shadow-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7F4A]">
                Clinical Case Study
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A3320] mt-1 leading-snug">
                {currentCase.title}
              </h3>

              <div className="mt-4 space-y-2.5 text-xs text-[#2A3320]/80">
                <div className="flex items-start gap-2">
                  <strong className="text-[#2A3320] font-semibold min-w-20">Treatment:</strong>
                  <span>{currentCase.treatment}</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="text-[#2A3320] font-semibold min-w-20">Clinician:</strong>
                  <span>{currentCase.doctor}</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="text-[#2A3320] font-semibold min-w-20">Timeline:</strong>
                  <span>{currentCase.timeline}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#2A3320]/80 leading-relaxed font-light border-t border-[#44562A]/10 pt-4">
                {currentCase.description}
              </p>

              <button
                onClick={onBookTreatment}
                className="mt-6 w-full py-3 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation for Similar Results</span>
              </button>
            </div>

            {/* Quick Case Thumbnails Switcher */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#2A3320]/70">
                Browse Clinical Cases:
              </p>
              <div className="flex flex-col gap-2">
                {filteredCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setSliderPosition(50);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedCaseId === c.id
                        ? 'bg-[#44562A]/10 border-[#44562A] shadow-xs'
                        : 'bg-white border-[#44562A]/10 hover:border-[#44562A]/30'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#2A3320]">{c.title}</p>
                      <p className="text-[11px] text-[#2A3320]/60">{c.timeline}</p>
                    </div>
                    {selectedCaseId === c.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#44562A]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-[#44562A]/5 border border-[#44562A]/15 flex items-start gap-3 text-xs text-[#2A3320]/70">
          <ShieldAlert className="w-4 h-4 text-[#6B7F4A] shrink-0 mt-0.5" />
          <p>
            <strong>Clinical Disclaimer:</strong> Individual results may vary based on pre-existing dentition, skeletal anatomy, gum health, and adherence to aftercare guidelines. Every patient undergoes an in-depth preliminary diagnostic evaluation to determine aesthetic suitability.
          </p>
        </div>
      </div>
    </section>
  );
};
