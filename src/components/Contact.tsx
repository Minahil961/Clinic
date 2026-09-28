import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { CLINIC_CONTACT } from '../data/clinicData';
import { saveInquiryToSupabase } from '../lib/supabase';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageSquare,
  Send,
  CheckCircle2
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [msgData, setMsgData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgData.name || !msgData.phone) return;
    setIsSending(true);

    // Save to Supabase backend 'inquiries' table
    await saveInquiryToSupabase(msgData);

    setIsSending(false);
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setMsgData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FBF9F3] text-[#2A3320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Visit Our Sanctuary"
          title="Connect with Vogue Dental &amp; Aesthetics"
          subtitle="Located in Lake City, our state-of-the-art facility offers dedicated parking, elevator access, and a calm boutique environment."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards, Working Hours Table */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#44562A]/15 shadow-sm space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#2A3320]">
                Clinic Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#2A3320]/80">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#44562A]/10 text-[#44562A] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#2A3320] block font-semibold">Clinic Address</strong>
                    <span>{CLINIC_CONTACT.address}</span>
                    <p className="text-[11px] text-[#6B7F4A]">{CLINIC_CONTACT.city}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#44562A]/10 text-[#44562A] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#2A3320] block font-semibold">Direct Telephone</strong>
                    <a
                      href={`tel:${CLINIC_CONTACT.phone}`}
                      className="hover:text-[#44562A] font-medium transition-colors"
                    >
                      {CLINIC_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#2A3320] block font-semibold">WhatsApp Concierge</strong>
                    <a
                      href={CLINIC_CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] font-semibold hover:underline"
                    >
                      Click to Chat (+92 321 0052424)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#44562A]/10 text-[#44562A] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#2A3320] block font-semibold">Email Desk</strong>
                    <a
                      href={`mailto:${CLINIC_CONTACT.email}`}
                      className="hover:text-[#44562A] transition-colors"
                    >
                      {CLINIC_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#2A3320] block font-semibold">Official Instagram</strong>
                    <a
                      href={CLINIC_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E1306C] font-medium hover:underline"
                    >
                      {CLINIC_CONTACT.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Table */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#44562A]/15 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#44562A]" />
                <h4 className="font-serif text-xl font-bold text-[#2A3320]">
                  Clinical Working Hours
                </h4>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#44562A]/10">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#44562A]/10 text-[#2A3320] uppercase font-bold tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Day</th>
                      <th className="p-3">Operating Timing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#44562A]/10">
                    {CLINIC_CONTACT.hours.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FBF9F3]'}>
                        <td className="p-3 font-semibold text-[#2A3320]">{row.days}</td>
                        <td className="p-3 text-[#2A3320]/80">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[#6B7F4A] italic">
                * {CLINIC_CONTACT.emergencyNote}
              </p>
            </div>
          </div>

          {/* Right Column: Google Maps Iframe + Quick Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Google Maps Container */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#44562A]/15 shadow-sm h-80 sm:h-96 relative">
              <iframe
                title="Vogue Dental & Aesthetics Clinic Location Lake City"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13627.53696788874!2d74.2289!3d31.3654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855a9b9a65d5f%3A0x6b63d115e0fb142a!2sLake%20City%2C%20Lahore!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#44562A]/15 shadow-md max-w-xs text-xs">
                <p className="font-bold text-[#2A3320]">VOGUE Dental &amp; Aesthetics</p>
                <p className="text-[#2A3320]/70 text-[11px] mt-0.5">C43/11, 2nd Floor, Lake City</p>
                <a
                  href="https://maps.google.com/?q=Lake+City+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[11px] font-semibold text-[#44562A] underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Quick General Inquiry Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#44562A]/15 shadow-sm">
              <h4 className="font-serif text-xl font-bold text-[#2A3320] mb-1">
                Send a Direct Inquiry
              </h4>
              <p className="text-xs text-[#2A3320]/70 mb-5">
                Have a question regarding treatments, pre-consultation guidance, or travel directions? Write to our concierge.
              </p>

              {formSent ? (
                <div className="p-4 rounded-xl bg-[#44562A]/10 border border-[#44562A]/20 text-center text-xs text-[#2A3320] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#44562A]" />
                  <span>Thank you! Your message has been routed to our clinic desk. We will respond promptly.</span>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={msgData.name}
                      onChange={(e) => setMsgData({ ...msgData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number *"
                      required
                      value={msgData.phone}
                      onChange={(e) => setMsgData({ ...msgData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Your inquiry or consultation question..."
                    value={msgData.message}
                    onChange={(e) => setMsgData({ ...msgData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-6 py-2.5 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] disabled:opacity-50 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
