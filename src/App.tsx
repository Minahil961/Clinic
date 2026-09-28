/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Departments } from './components/Departments';
import { Services } from './components/Services';
import { Doctors } from './components/Doctors';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { BookingForm } from './components/BookingForm';
import { BookingModal } from './components/BookingModal';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { SectionHeading } from './components/SectionHeading';
import { AdminPortal } from './components/admin/AdminPortal';
import { Service, Doctor, PricingPackage } from './types';

export default function App() {
  // Admin portal state
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'appointments' | 'environment'>('appointments');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<{
    departmentId?: string;
    doctorId?: string;
    serviceId?: string;
  }>({});

  // Department filter state (shared between Departments, Services, and Doctors)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('all');

  // Check URL hash for direct #admin and #admin/env navigation
  React.useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminViewOpen(true);
        setAdminInitialTab('appointments');
      } else if (window.location.hash === '#admin/env' || window.location.hash === '#env') {
        setIsAdminViewOpen(true);
        setAdminInitialTab('environment');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Handlers
  const handleOpenBooking = (data?: { departmentId?: string; doctorId?: string; serviceId?: string }) => {
    setModalInitialData(data || {});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDepartmentSelect = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    // Smooth scroll to services section
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookService = (service: Service) => {
    handleOpenBooking({
      departmentId: service.departmentId,
      serviceId: service.id
    });
  };

  const handleBookDoctor = (doctor: Doctor) => {
    handleOpenBooking({
      departmentId: doctor.departmentId,
      doctorId: doctor.id
    });
  };

  const handleBookPackage = (pkg: PricingPackage) => {
    // Map pricing package to closest department
    let deptId = 'cosmetic-smile';
    if (pkg.id.includes('aesthetic')) deptId = 'dermatology';
    if (pkg.id.includes('invisalign')) deptId = 'orthodontics';
    if (pkg.id.includes('oral')) deptId = 'general-dentistry';

    handleOpenBooking({
      departmentId: deptId
    });
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDoctors = () => {
    const el = document.getElementById('doctors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAdminViewOpen) {
    return (
      <AdminPortal
        initialTab={adminInitialTab}
        onBackToSite={() => {
          setIsAdminViewOpen(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F3] text-[#2A3320] flex flex-col font-sans selection:bg-[#44562A] selection:text-[#F5F0E1]">
      {/* 1. Sticky Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={scrollToServices}
        />

        {/* 3. About the Clinic */}
        <About
          onLearnMoreServices={scrollToServices}
          onMeetDoctors={scrollToDoctors}
        />

        {/* 4. Departments */}
        <Departments onSelectDepartment={handleDepartmentSelect} />

        {/* 5. Services / Treatments */}
        <Services
          selectedDepartmentId={selectedDepartmentId}
          onDepartmentChange={setSelectedDepartmentId}
          onBookService={handleBookService}
        />

        {/* 6. Doctors / Our Specialists */}
        <Doctors
          selectedDepartmentId={selectedDepartmentId}
          onDepartmentChange={setSelectedDepartmentId}
          onBookDoctor={handleBookDoctor}
        />

        {/* 7. Why Choose Vogue */}
        <WhyChooseUs />

        {/* 8. Before & After Gallery */}
        <BeforeAfterGallery onBookTreatment={() => handleOpenBooking()} />

        {/* 9. Dedicated Appointment Booking Section */}
        <section id="booking" className="py-20 lg:py-28 bg-[#34431F] text-[#F5F0E1] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              theme="dark"
              badge="Direct Clinical Concierge"
              title="Schedule Your Private Consultation"
              subtitle="Select your preferred department, doctor, and convenient time slot below. Our medical desk will confirm your appointment promptly."
            />

            <div className="mt-14">
              <BookingForm
                initialDepartmentId={selectedDepartmentId !== 'all' ? selectedDepartmentId : 'general-dentistry'}
              />
            </div>
          </div>
        </section>

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. Pricing & Packages */}
        <Pricing onBookPackage={handleBookPackage} />

        {/* 12. FAQ */}
        <FAQ />

        {/* 13. Contact & Location */}
        <Contact />
      </main>

      {/* 14. Footer (Contains the only Admin Login link) */}
      <Footer
        onSelectDepartment={handleDepartmentSelect}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={(tab = 'appointments') => {
          setAdminInitialTab(tab);
          setIsAdminViewOpen(true);
          window.location.hash = tab === 'environment' ? 'admin/env' : 'admin';
        }}
      />

      {/* Floating Action Buttons (Back to top + Mobile quick bar) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Reusable Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialDepartmentId={modalInitialData.departmentId}
        initialDoctorId={modalInitialData.doctorId}
        initialServiceId={modalInitialData.serviceId}
      />
    </div>
  );
}
