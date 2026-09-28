import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { Logo } from './Logo';
import { CLINIC_CONTACT } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Why Vogue', href: '#why-vogue' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = navLinks.map(link => link.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#44562A]/95 backdrop-blur-md shadow-lg border-b border-[#6B7F4A]/30 py-2.5'
            : 'bg-[#44562A] md:bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on the left */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9B98A] rounded-lg"
          >
            <Logo variant="cream" size={isScrolled ? 'sm' : 'md'} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors rounded-md relative ${
                    isActive
                      ? 'text-[#F5F0E1] font-semibold'
                      : 'text-[#F5F0E1]/80 hover:text-[#F5F0E1] hover:bg-[#34431F]/30'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C9B98A] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_CONTACT.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#F5F0E1] hover:text-[#C9B98A] transition-colors"
              title="Call Vogue Clinic"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9B98A]" />
              <span className="hidden xl:inline">{CLINIC_CONTACT.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#34431F] bg-[#F5F0E1] hover:bg-white active:scale-95 transition-all shadow-md rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#44562A]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#34431F] bg-[#F5F0E1] rounded-lg shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F0E1] hover:text-[#C9B98A] hover:bg-[#34431F]/50 rounded-lg transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#34431F] text-[#F5F0E1] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#6B7F4A]/30">
                <Logo variant="cream" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#F5F0E1]/80 hover:text-white rounded-lg"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-2.5 text-sm font-medium text-[#F5F0E1] hover:bg-[#44562A] rounded-lg transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#6B7F4A]/30 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-sm font-semibold uppercase tracking-wider text-[#34431F] bg-[#F5F0E1] hover:bg-white rounded-xl shadow-md text-center block"
              >
                Book Appointment
              </button>

              <div className="text-center text-xs text-[#F5F0E1]/70">
                <p>C43/11, 2nd Floor, Lake City</p>
                <p className="mt-1 font-semibold text-[#C9B98A]">{CLINIC_CONTACT.phoneDisplay}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
