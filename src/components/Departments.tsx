import React from 'react';
import { SectionHeading } from './SectionHeading';
import { DEPARTMENTS } from '../data/clinicData';
import {
  Stethoscope,
  Sparkles,
  Smile,
  ShieldCheck,
  Activity,
  Feather,
  Zap,
  ArrowRight
} from 'lucide-react';

interface DepartmentsProps {
  onSelectDepartment: (deptId: string) => void;
}

export const Departments: React.FC<DepartmentsProps> = ({ onSelectDepartment }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return Stethoscope;
      case 'Sparkles': return Sparkles;
      case 'Smile': return Smile;
      case 'ShieldCheck': return ShieldCheck;
      case 'Activity': return Activity;
      case 'Feather': return Feather;
      case 'Zap': return Zap;
      default: return Sparkles;
    }
  };

  return (
    <section id="departments" className="py-20 lg:py-28 bg-[#44562A] text-[#F5F0E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          theme="dark"
          badge="Specialized Departments"
          title="Multidisciplinary Centers of Excellence"
          subtitle="From delicate cosmetic bonding to complex surgical implantology and medical aesthetics, discover our fully equipped clinical wings."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DEPARTMENTS.map((dept, index) => {
            const Icon = getIcon(dept.iconName);
            const isFeatured = index === 0 || index === 1;

            return (
              <div
                key={dept.id}
                className="group relative rounded-2xl bg-[#34431F]/70 border border-[#6B7F4A]/30 p-7 flex flex-col justify-between hover:bg-[#34431F] hover:border-[#C9B98A]/70 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Top Bar with Icon & Counts */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#6B7F4A]/30 text-[#C9B98A] flex items-center justify-center group-hover:bg-[#C9B98A] group-hover:text-[#34431F] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#F5F0E1]/70 bg-[#44562A] px-2.5 py-1 rounded-full border border-[#6B7F4A]/30">
                      {dept.serviceCount} Treatments
                    </span>
                  </div>

                  {/* Department Title & Tagline */}
                  <h3 className="font-serif text-2xl font-medium text-[#F5F0E1] group-hover:text-white transition-colors">
                    {dept.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#C9B98A] uppercase tracking-wider">
                    {dept.tagline}
                  </p>

                  <p className="mt-3 text-sm text-[#F5F0E1]/80 leading-relaxed font-light">
                    {dept.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-5 border-t border-[#6B7F4A]/30 flex items-center justify-between">
                  <span className="text-xs text-[#F5F0E1]/60 font-light">
                    {dept.doctorCount} Specialist Doctors
                  </span>
                  <button
                    onClick={() => onSelectDepartment(dept.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C9B98A] group-hover:text-[#F5F0E1] transition-colors cursor-pointer"
                  >
                    <span>View Doctors &amp; Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
