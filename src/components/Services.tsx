import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { DEPARTMENTS, SERVICES } from '../data/clinicData';
import { Clock, Calendar, Check, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  selectedDepartmentId: string;
  onDepartmentChange: (deptId: string) => void;
  onBookService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({
  selectedDepartmentId,
  onDepartmentChange,
  onBookService
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter services by department and search
  const filteredServices = SERVICES.filter((service) => {
    const matchesDept = selectedDepartmentId === 'all' || service.departmentId === selectedDepartmentId;
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FBF9F3] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clinical Treatments &amp; Procedures"
          title="Curated Services for Dental &amp; Facial Perfection"
          subtitle="Explore our comprehensive range of conservative dentistry, smile architecture, and medical-grade aesthetic therapies."
        />

        {/* Department Filter Tabs (Segmented Control) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onDepartmentChange('all')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              selectedDepartmentId === 'all'
                ? 'bg-[#44562A] text-[#F5F0E1] shadow-md'
                : 'bg-white text-[#2A3320]/80 border border-[#44562A]/15 hover:border-[#44562A]'
            }`}
          >
            All Services ({SERVICES.length})
          </button>

          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onDepartmentChange(dept.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartmentId === dept.id
                  ? 'bg-[#44562A] text-[#F5F0E1] shadow-md'
                  : 'bg-white text-[#2A3320]/80 border border-[#44562A]/15 hover:border-[#44562A]'
              }`}
            >
              {dept.name.split(' ')[0]} {dept.name.includes('&') ? '& ' + dept.name.split('&')[1].trim().split(' ')[0] : ''}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search treatments (e.g. Whitening, Veneers, HydraFacial, Implants)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 text-xs bg-white border border-[#44562A]/20 rounded-xl text-[#2A3320] placeholder-[#2A3320]/50 focus:outline-none focus:ring-2 focus:ring-[#44562A] focus:border-transparent transition-all shadow-xs"
          />
        </div>

        {/* Services Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#44562A]/10 p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#44562A]/30 transition-all duration-300 relative group"
            >
              {/* Popular indicator */}
              {service.popular && (
                <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#44562A]/10 text-[#44562A] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#C9B98A]" />
                  <span>Popular</span>
                </div>
              )}

              <div>
                {/* Department label */}
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7F4A] mb-1">
                  {service.departmentName}
                </p>

                {/* Service Name */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A3320] group-hover:text-[#44562A] transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Subtitle */}
                <p className="text-xs font-medium text-[#C9B98A] mt-1">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-[#2A3320]/75 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Recommended for */}
                <div className="mt-4 pt-3 border-t border-[#44562A]/10">
                  <p className="text-[11px] text-[#2A3320]/70 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#44562A] shrink-0 mt-0.5" />
                    <span><strong className="font-semibold text-[#2A3320]">Ideal for:</strong> {service.recommendedFor}</span>
                  </p>
                </div>
              </div>

              {/* Card Footer: Duration & Book Action */}
              <div className="mt-6 pt-4 border-t border-[#44562A]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#2A3320]/70">
                  <Clock className="w-3.5 h-3.5 text-[#44562A]" />
                  <span>{service.duration}</span>
                </div>

                <button
                  onClick={() => onBookService(service)}
                  className="px-4 py-2 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9B98A]" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-12 text-center py-12 bg-white rounded-2xl border border-[#44562A]/10 max-w-md mx-auto p-6">
            <p className="text-sm font-medium text-[#2A3320]">
              No treatments match "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                onDepartmentChange('all');
              }}
              className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#44562A] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
