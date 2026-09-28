import React, { useState } from 'react';
import { Logo } from './Logo';
import { CLINIC_CONTACT, DEPARTMENTS } from '../data/clinicData';
import { Instagram, Phone, Mail, MapPin, Send, Check, Lock, Database } from 'lucide-react';

interface FooterProps {
  onSelectDepartment: (deptId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: (tab?: 'appointments' | 'environment') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDepartment, onOpenBooking, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Specialties', href: '#departments' },
    { name: 'Treatments', href: '#services' },
    { name: 'Our Specialists', href: '#doctors' },
    { name: 'Why Vogue', href: '#why-vogue' },
    { name: 'Smile Gallery', href: '#gallery' },
    { name: 'Patient Reviews', href: '#testimonials' },
    { name: 'Pricing & Packages', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact & Location', href: '#contact' },
  ];

  return (
    <footer className="bg-[#34431F] text-[#F5F0E1] border-t border-[#6B7F4A]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#6B7F4A]/30">
          {/* Brand & Narrative */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="inline-block">
              <Logo variant="cream" size="md" />
            </a>
            <p className="text-xs sm:text-sm text-[#F5F0E1]/80 leading-relaxed font-light max-w-sm">
              Lake City's premier dental &amp; aesthetic clinic. Under the clinical leadership of Dr. Maha Farman, we unite master cosmetic dentistry with advanced facial aesthetic medicine in a tranquil, hospital-grade sanitized haven.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={CLINIC_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#44562A] hover:bg-[#6B7F4A] text-[#F5F0E1] flex items-center justify-center transition-colors border border-[#6B7F4A]/40"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CLINIC_CONTACT.phone}`}
                className="w-9 h-9 rounded-xl bg-[#44562A] hover:bg-[#6B7F4A] text-[#F5F0E1] flex items-center justify-center transition-colors border border-[#6B7F4A]/40"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={CLINIC_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#44562A] hover:bg-[#6B7F4A] text-[#F5F0E1] flex items-center justify-center transition-colors border border-[#6B7F4A]/40 text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C9B98A] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E1]/80">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#C9B98A] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Departments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#C9B98A] uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E1]/80">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => onSelectDepartment(dept.id)}
                    className="hover:text-[#C9B98A] transition-colors text-left cursor-pointer"
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Snippet */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-[#C9B98A] uppercase tracking-wider">
              Vogue Journal &amp; Updates
            </h4>
            <p className="text-xs text-[#F5F0E1]/75 leading-relaxed font-light">
              Receive seasonal oral health advice, cosmetic smile breakthroughs, and exclusive wellness invitations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#44562A] border border-[#6B7F4A] text-xs text-[#F5F0E1] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9B98A]" />
                <span>Thank you for subscribing to Vogue Journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 text-xs bg-[#44562A]/60 border border-[#6B7F4A]/40 rounded-xl text-[#F5F0E1] placeholder-[#F5F0E1]/40 focus:outline-none focus:ring-1 focus:ring-[#C9B98A]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-[#C9B98A] hover:bg-white text-[#34431F] rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs text-[#F5F0E1]/70 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9B98A]" />
                <span>{CLINIC_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C9B98A]" />
                <span>{CLINIC_CONTACT.phoneDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E1]/60">
          <p>© 2025 VOGUE Dental &amp; Aesthetics. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="hover:text-[#F5F0E1] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#F5F0E1] transition-colors cursor-pointer">
              Terms of Medical Service
            </span>
            <span className="hover:text-[#F5F0E1] transition-colors cursor-pointer">
              Infection Control Protocol
            </span>
            <span className="text-[#6B7F4A]">·</span>
            <button
              onClick={() => onOpenAdmin('appointments')}
              className="inline-flex items-center gap-1.5 text-[#C9B98A] hover:text-white transition-colors cursor-pointer font-medium"
              title="Staff &amp; Doctor Portal"
            >
              <Lock className="w-3 h-3 text-[#C9B98A]" />
              <span>Admin Portal</span>
            </button>
            <span className="text-[#6B7F4A]">·</span>
            <button
              onClick={() => onOpenAdmin('environment')}
              className="inline-flex items-center gap-1.5 text-[#C9B98A] hover:text-white transition-colors cursor-pointer font-medium"
              title="View Supabase Environment Values"
            >
              <Database className="w-3 h-3 text-[#C9B98A]" />
              <span>Environment Values</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
