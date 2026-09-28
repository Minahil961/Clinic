import React from 'react';
import { SectionHeading } from './SectionHeading';
import { DEPARTMENTS, DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';
import { Calendar, Award, Clock, Star, Check } from 'lucide-react';

interface DoctorsProps {
  selectedDepartmentId: string;
  onDepartmentChange: (deptId: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const Doctors: React.FC<DoctorsProps> = ({
  selectedDepartmentId,
  onDepartmentChange,
  onBookDoctor
}) => {
  // Filter doctors by selected department or show all
  const filteredDoctors = DOCTORS.filter((doc) => {
    if (selectedDepartmentId === 'all') return true;
    return doc.departmentId === selectedDepartmentId;
  });

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-[#34431F] text-[#F5F0E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          theme="dark"
          badge="Faculty &amp; Specialists"
          title="Renowned Clinicians &amp; Aesthetic Artisans"
          subtitle="Our consultants hold international fellowships and hospital appointments, dedicated to delivering gentle, world-class dental and aesthetic outcomes."
        />

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onDepartmentChange('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              selectedDepartmentId === 'all'
                ? 'bg-[#F5F0E1] text-[#34431F] shadow-md'
                : 'bg-[#44562A]/60 text-[#F5F0E1]/80 border border-[#6B7F4A]/30 hover:border-[#F5F0E1]'
            }`}
          >
            All Specialists ({DOCTORS.length})
          </button>

          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onDepartmentChange(dept.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartmentId === dept.id
                  ? 'bg-[#F5F0E1] text-[#34431F] shadow-md'
                  : 'bg-[#44562A]/60 text-[#F5F0E1]/80 border border-[#6B7F4A]/30 hover:border-[#F5F0E1]'
              }`}
            >
              {dept.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#44562A]/50 border border-[#6B7F4A]/40 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C9B98A] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_24px_rgba(201,185,138,0.25)] transition-all duration-500 hover:-translate-y-1.5 shadow-xl group"
            >
              <div>
                {/* Photo Header with soft gold border & slight glow effect on hover */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#2A3320] border-b-2 border-[#C9B98A]/40 group-hover:border-[#C9B98A] transition-all duration-500">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle soft gold ambient glow frame on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(201,185,138,0.35)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#34431F] via-transparent to-transparent pointer-events-none" />

                  {/* Badges on photo */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#34431F]/90 backdrop-blur-md text-[#C9B98A] rounded-md border border-[#C9B98A]/40 group-hover:border-[#C9B98A] transition-colors">
                      {doc.departmentName.split(' ')[0]}
                    </span>
                    {doc.headOfDepartment && (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#C9B98A] text-[#2A3320] rounded-md flex items-center gap-1 shadow-md border border-[#F5F0E1]/40">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Head Clinician</span>
                      </span>
                    )}
                  </div>

                  {/* Experience badge */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#F5F0E1] bg-[#44562A]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C9B98A]/40 group-hover:border-[#C9B98A] transition-colors z-10">
                    <Award className="w-3.5 h-3.5 text-[#C9B98A]" />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#F5F0E1] group-hover:text-white transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#C9B98A] uppercase tracking-wider mt-1">
                    {doc.role}
                  </p>
                  <p className="text-[11px] text-[#F5F0E1]/70 font-mono mt-0.5">
                    {doc.qualifications}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#F5F0E1]/80 leading-relaxed font-light line-clamp-3">
                    {doc.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {doc.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-[#34431F] text-[#F5F0E1]/80 px-2 py-0.5 rounded border border-[#6B7F4A]/30"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Available Days */}
                  <div className="mt-4 pt-3 border-t border-[#6B7F4A]/30 flex items-center gap-2 text-xs text-[#F5F0E1]/70">
                    <Clock className="w-3.5 h-3.5 text-[#C9B98A] shrink-0" />
                    <span className="truncate">
                      <strong>Clinic Days:</strong> {doc.availableDays.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookDoctor(doc)}
                  className="w-full py-2.5 px-4 bg-[#F5F0E1] text-[#34431F] hover:bg-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#44562A]" />
                  <span>Book with {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
