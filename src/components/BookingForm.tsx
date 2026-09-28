import React, { useState, useEffect, useMemo } from 'react';
import { DEPARTMENTS, SERVICES, DOCTORS, TIME_SLOTS, CLINIC_CONTACT } from '../data/clinicData';
import { BookingFormData, BookingConfirmation } from '../types';
import { saveAppointmentToSupabase, SQL_APPOINTMENTS_SCHEMA } from '../lib/supabase';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Stethoscope,
  Copy,
  Check,
  Database,
  Info,
  Code
} from 'lucide-react';

interface BookingFormProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
  initialServiceId?: string;
  onSuccess?: (confirmation: BookingConfirmation) => void;
  isModal?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialDepartmentId,
  initialDoctorId,
  initialServiceId,
  onSuccess,
  isModal = false
}) => {
  // Steps: 1: Personal Info, 2: Appointment Specifics, 3: Review & Confirm
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedRef, setCopiedRef] = useState(false);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    departmentId: initialDepartmentId || 'general-dentistry',
    doctorId: initialDoctorId || 'any',
    serviceId: initialServiceId || '',
    preferredDate: '',
    timeSlot: '',
    visitType: 'First Visit',
    notes: '',
    consent: false
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    synced: boolean;
    error?: string;
  } | null>(null);
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Sync initial props if changed
  useEffect(() => {
    if (initialDepartmentId) {
      setFormData(prev => ({
        ...prev,
        departmentId: initialDepartmentId,
        doctorId: initialDoctorId || 'any',
        serviceId: initialServiceId || ''
      }));
    }
  }, [initialDepartmentId, initialDoctorId, initialServiceId]);

  // If department changes, ensure service matches or pick first
  const availableServices = useMemo(() => {
    return SERVICES.filter(s => s.departmentId === formData.departmentId);
  }, [formData.departmentId]);

  const availableDoctors = useMemo(() => {
    return DOCTORS.filter(d => d.departmentId === formData.departmentId);
  }, [formData.departmentId]);

  useEffect(() => {
    // If selected service does not belong to new department, reset or select first
    const serviceExists = availableServices.some(s => s.id === formData.serviceId);
    if (!serviceExists && availableServices.length > 0) {
      setFormData(prev => ({ ...prev, serviceId: availableServices[0].id }));
    }
  }, [formData.departmentId, availableServices]);

  // Validation functions
  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'fullName':
        if (!value || value.trim().length < 2) return 'Full name is required (min 2 characters).';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required.';
        // Match standard phone numbers (at least 9 digits, allows +, -, spaces)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
          return 'Please enter a valid phone number (e.g. 0321 0052424).';
        }
        return '';
      case 'email':
        if (!value) return 'Email address is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address.';
        return '';
      case 'departmentId':
        if (!value) return 'Please select a clinical department.';
        return '';
      case 'serviceId':
        if (!value) return 'Please select a treatment/service.';
        return '';
      case 'preferredDate':
        if (!value) return 'Please select an appointment date.';
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) return 'Appointment date cannot be in the past.';
        return '';
      case 'timeSlot':
        if (!value) return 'Please select a preferred time slot.';
        return '';
      case 'consent':
        if (!value) return 'You must agree to be contacted for appointment confirmation.';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field]);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: errorMsg }));
    }
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const nameErr = validateField('fullName', formData.fullName);
    const phoneErr = validateField('phone', formData.phone);
    const emailErr = validateField('email', formData.email);

    setTouched({ fullName: true, phone: true, email: true });
    setErrors({ fullName: nameErr, phone: phoneErr, email: emailErr });

    return !nameErr && !phoneErr && !emailErr;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const deptErr = validateField('departmentId', formData.departmentId);
    const servErr = validateField('serviceId', formData.serviceId);
    const dateErr = validateField('preferredDate', formData.preferredDate);
    const timeErr = validateField('timeSlot', formData.timeSlot);

    setTouched(prev => ({
      ...prev,
      departmentId: true,
      serviceId: true,
      preferredDate: true,
      timeSlot: true
    }));

    setErrors(prev => ({
      ...prev,
      departmentId: deptErr,
      serviceId: servErr,
      preferredDate: dateErr,
      timeSlot: timeErr
    }));

    return !deptErr && !servErr && !dateErr && !timeErr;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      return;
    }
    const consentErr = validateField('consent', formData.consent);
    if (consentErr) {
      setErrors(prev => ({ ...prev, consent: consentErr }));
      return;
    }

    setIsSubmitting(true);
    setSupabaseStatus(null);

    const refNum = `VOG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Save to Supabase backend table 'appointments'
    const supabaseResult = await saveAppointmentToSupabase(formData, refNum);
    setSupabaseStatus({
      synced: supabaseResult.success,
      error: supabaseResult.error
    });

    const result: BookingConfirmation = {
      referenceNumber: refNum,
      data: { ...formData },
      submittedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    console.log('--- VOGUE CLINIC BOOKING SUBMITTED ---', result, 'Supabase Status:', supabaseResult);
    setConfirmation(result);
    setIsSubmitting(false);

    if (onSuccess) {
      onSuccess(result);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setSupabaseStatus(null);
    setShowSqlSchema(false);
    setCopiedSql(false);
    setCurrentStep(1);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      age: '',
      gender: '',
      departmentId: 'general-dentistry',
      doctorId: 'any',
      serviceId: '',
      preferredDate: '',
      timeSlot: '',
      visitType: 'First Visit',
      notes: '',
      consent: false
    });
    setErrors({});
    setTouched({});
  };

  const copyReference = () => {
    if (confirmation?.referenceNumber) {
      navigator.clipboard.writeText(confirmation.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Min date for date picker (today in YYYY-MM-DD)
  const minDate = new Date().toISOString().split('T')[0];

  // Lookup details for summary
  const selectedDeptObj = DEPARTMENTS.find(d => d.id === formData.departmentId);
  const selectedDoctorObj = DOCTORS.find(d => d.id === formData.doctorId);
  const selectedServiceObj = SERVICES.find(s => s.id === formData.serviceId);

  // If Booking is Confirmed, render Confirmation View
  if (confirmation) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#44562A]/20 shadow-2xl text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#44562A]/10 text-[#44562A] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#6B7F4A]">
          Appointment Request Received
        </span>
        <h3 className="font-serif text-3xl font-bold text-[#2A3320] mt-1">
          You're Booked at VOGUE
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#2A3320]/75 leading-relaxed">
          Thank you, <strong>{confirmation.data.fullName}</strong>. Our clinical concierge will contact you via WhatsApp/Phone within 2 hours to confirm your scheduled slot.
        </p>

        {/* Reference Code Box */}
        <div className="mt-6 p-4 rounded-xl bg-[#F5F0E1] border border-[#C9B98A]/40 flex items-center justify-between">
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-[#2A3320]/60 tracking-wider">
              Booking Reference Code
            </p>
            <p className="font-mono text-lg font-bold text-[#44562A]">
              {confirmation.referenceNumber}
            </p>
          </div>
          <button
            onClick={copyReference}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#44562A]/20 hover:bg-[#44562A] hover:text-white transition-colors cursor-pointer"
          >
            {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRef ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Booking Summary Card */}
        <div className="mt-6 text-left p-5 rounded-xl border border-[#44562A]/15 bg-[#FBF9F3] space-y-2.5 text-xs text-[#2A3320]/80">
          <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
            <span className="font-medium">Department:</span>
            <span className="font-semibold text-[#2A3320]">{selectedDeptObj?.name}</span>
          </div>
          <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
            <span className="font-medium">Treatment:</span>
            <span className="font-semibold text-[#2A3320]">{selectedServiceObj?.name}</span>
          </div>
          <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
            <span className="font-medium">Specialist:</span>
            <span className="font-semibold text-[#2A3320]">{selectedDoctorObj?.name || 'Any Available Specialist'}</span>
          </div>
          <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
            <span className="font-medium">Scheduled Date:</span>
            <span className="font-semibold text-[#2A3320]">{confirmation.data.preferredDate}</span>
          </div>
          <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
            <span className="font-medium">Time Slot:</span>
            <span className="font-semibold text-[#2A3320]">{confirmation.data.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Clinic Location:</span>
            <span className="font-semibold text-[#2A3320]">{CLINIC_CONTACT.address}</span>
          </div>
        </div>

        {/* Supabase Backend Sync Status Card */}
        <div className="mt-4 text-left transition-all">
          {supabaseStatus?.synced ? (
            <div className="flex items-center justify-between text-emerald-800 bg-emerald-50/90 border border-emerald-200 p-3 rounded-xl shadow-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs">
                  <strong>Supabase Backend Synchronized:</strong> Saved to <code className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded text-[11px] font-mono">appointments</code> table (Project: <span className="font-mono text-[11px] font-semibold">ddibkibjxbgkjhjzsejl</span>)
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded shrink-0 ml-2">
                Saved
              </span>
            </div>
          ) : (
            <div className="bg-[#44562A]/5 border border-[#44562A]/20 p-3.5 rounded-xl text-xs space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-[#44562A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2A3320]">
                      Supabase Integration: Project ddibkibjxbgkjhjzsejl
                    </p>
                    <p className="text-[11px] text-[#2A3320]/75 mt-0.5">
                      {supabaseStatus?.error ? (
                        <span>Database note: {supabaseStatus.error}. If the table hasn't been created yet in your Supabase dashboard, click "View SQL Schema" to copy the setup script.</span>
                      ) : (
                        <span>Appointment submitted to Supabase client. Ensure the <code className="font-mono">appointments</code> table exists in your project.</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSqlSchema(!showSqlSchema)}
                  className="text-[11px] font-semibold text-[#44562A] hover:underline flex items-center gap-1 shrink-0 cursor-pointer pt-0.5"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{showSqlSchema ? 'Hide SQL' : 'View SQL Schema'}</span>
                </button>
              </div>

              {showSqlSchema && (
                <div className="mt-2 pt-2 border-t border-[#44562A]/15">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#44562A]">
                      Run this in Supabase SQL Editor:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(SQL_APPOINTMENTS_SCHEMA);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2000);
                      }}
                      className="text-[11px] font-semibold text-[#34431F] bg-[#F5F0E1] hover:bg-[#44562A] hover:text-white px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#2A3320] text-[#F5F0E1] rounded-lg text-[10px] font-mono overflow-x-auto max-h-40 leading-relaxed">
                    {SQL_APPOINTMENTS_SCHEMA}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={CLINIC_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#20bd5a] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Message on WhatsApp</span>
          </a>
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-4 bg-[#44562A] text-[#F5F0E1] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#34431F] transition-all shadow-md cursor-pointer"
          >
            <span>Book Another Appointment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl ${isModal ? 'p-6 sm:p-8' : 'p-6 sm:p-10 border border-[#44562A]/20 shadow-xl'} max-w-3xl mx-auto`}>
      {/* Multi-step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#44562A]">
            Step {currentStep} of 3: {currentStep === 1 ? 'Personal Details' : currentStep === 2 ? 'Appointment Selection' : 'Review & Confirm'}
          </span>
          <span className="text-xs font-semibold text-[#2A3320]/60">
            {Math.round((currentStep / 3) * 100)}% Completed
          </span>
        </div>
        <div className="w-full h-2 bg-[#F5F0E1] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#44562A] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <h4 className="font-serif text-2xl font-bold text-[#2A3320]">
              Patient Contact Information
            </h4>
            <p className="text-xs text-[#2A3320]/70">
              Please enter your contact details so our clinic team can verify your booking and send reminders.
            </p>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Amina Khalid"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border rounded-xl focus:outline-none transition-all ${
                    touched.fullName && errors.fullName
                      ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                      : 'border-[#44562A]/20 focus:ring-2 focus:ring-[#44562A]'
                  }`}
                />
                <User className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
              </div>
              {touched.fullName && errors.fullName && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="0321 0052424"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border rounded-xl focus:outline-none transition-all ${
                      touched.phone && errors.phone
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-[#44562A]/20 focus:ring-2 focus:ring-[#44562A]'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
                </div>
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="amina@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border rounded-xl focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-[#44562A]/20 focus:ring-2 focus:ring-[#44562A]'
                    }`}
                  />
                  <Mail className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Age / Date of Birth <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Gender <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                >
                  <option value="">Prefer not to say</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Visit Type */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Visit Type
              </label>
              <div className="flex gap-4">
                {['First Visit', 'Follow-up'].map((type) => (
                  <label
                    key={type}
                    className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                      formData.visitType === type
                        ? 'bg-[#44562A] text-[#F5F0E1] border-[#44562A]'
                        : 'bg-[#FBF9F3] text-[#2A3320] border-[#44562A]/20 hover:border-[#44562A]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visitType"
                      value={type}
                      checked={formData.visitType === type}
                      onChange={() => handleChange('visitType', type as any)}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: APPOINTMENT SPECIFICS */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <h4 className="font-serif text-2xl font-bold text-[#2A3320]">
              Select Department, Specialist &amp; Slot
            </h4>
            <p className="text-xs text-[#2A3320]/70">
              Customize your clinical visit. Treatments and doctor availability adapt dynamically.
            </p>

            {/* Department Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.departmentId}
                  onChange={(e) => {
                    handleChange('departmentId', e.target.value);
                    handleChange('doctorId', 'any');
                  }}
                  onBlur={() => handleBlur('departmentId')}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <Stethoscope className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Service & Doctor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Treatment / Service <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.serviceId}
                    onChange={(e) => handleChange('serviceId', e.target.value)}
                    onBlur={() => handleBlur('serviceId')}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border rounded-xl focus:outline-none transition-all ${
                      touched.serviceId && errors.serviceId
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-[#44562A]/20 focus:ring-2 focus:ring-[#44562A]'
                    }`}
                  >
                    <option value="">-- Choose Treatment --</option>
                    {availableServices.map((serv) => (
                      <option key={serv.id} value={serv.id}>
                        {serv.name} ({serv.duration})
                      </option>
                    ))}
                  </select>
                  <Sparkles className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
                </div>
                {touched.serviceId && errors.serviceId && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.serviceId}
                  </p>
                )}
              </div>

              {/* Doctor Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                  Preferred Specialist
                </label>
                <div className="relative">
                  <select
                    value={formData.doctorId}
                    onChange={(e) => handleChange('doctorId', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
                  >
                    <option value="any">Any Available Specialist</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.role.split('/')[0]}
                      </option>
                    ))}
                  </select>
                  <User className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  min={minDate}
                  value={formData.preferredDate}
                  onChange={(e) => handleChange('preferredDate', e.target.value)}
                  onBlur={() => handleBlur('preferredDate')}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F3] border rounded-xl focus:outline-none transition-all ${
                    touched.preferredDate && errors.preferredDate
                      ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                      : 'border-[#44562A]/20 focus:ring-2 focus:ring-[#44562A]'
                  }`}
                />
                <CalendarIcon className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-3" />
              </div>
              {touched.preferredDate && errors.preferredDate && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Preferred Time Slot Chips */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Preferred Time Slot <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleChange('timeSlot', slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      formData.timeSlot === slot
                        ? 'bg-[#44562A] text-[#F5F0E1] shadow-sm ring-2 ring-[#44562A]'
                        : 'bg-[#FBF9F3] text-[#2A3320] border border-[#44562A]/20 hover:border-[#44562A]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {touched.timeSlot && errors.timeSlot && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.timeSlot}
                </p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#2A3320] uppercase tracking-wider mb-1.5">
                Additional Notes or Clinical Concerns <span className="text-xs text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Mention any dental sensitivities, allergies, or questions..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full px-4 py-2 text-xs sm:text-sm bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-[#44562A]/30 text-[#44562A] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#44562A]/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Review &amp; Confirm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h4 className="font-serif text-2xl font-bold text-[#2A3320]">
              Review Your Appointment Details
            </h4>
            <p className="text-xs text-[#2A3320]/70">
              Please double-check your booking specifics before submitting.
            </p>

            {/* Summary Review Card */}
            <div className="bg-[#FBF9F3] rounded-2xl p-5 border border-[#44562A]/20 space-y-3 text-xs sm:text-sm text-[#2A3320]">
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Patient Name:</span>
                <strong className="font-semibold">{formData.fullName}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Phone &amp; WhatsApp:</span>
                <strong className="font-semibold">{formData.phone}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Email Address:</span>
                <strong className="font-semibold">{formData.email}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Department:</span>
                <strong className="font-semibold text-[#44562A]">{selectedDeptObj?.name}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Procedure / Service:</span>
                <strong className="font-semibold text-[#44562A]">{selectedServiceObj?.name}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Doctor / Specialist:</span>
                <strong className="font-semibold">{selectedDoctorObj?.name || 'Any Available Specialist'}</strong>
              </div>
              <div className="flex justify-between border-b border-[#44562A]/10 pb-2">
                <span className="text-[#2A3320]/70">Date &amp; Time:</span>
                <strong className="font-semibold text-[#44562A]">
                  {formData.preferredDate} at {formData.timeSlot}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2A3320]/70">Visit Category:</span>
                <span className="font-medium">{formData.visitType}</span>
              </div>
              {formData.notes && (
                <div className="pt-2 border-t border-[#44562A]/10">
                  <span className="text-[#2A3320]/70 block mb-1">Notes:</span>
                  <p className="italic text-xs text-[#2A3320]/90">{formData.notes}</p>
                </div>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleChange('consent', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#44562A] focus:ring-[#44562A] border-gray-300"
                />
                <span className="text-xs text-[#2A3320]/80 leading-relaxed">
                  I agree to be contacted via WhatsApp/Phone by VOGUE Dental &amp; Aesthetics regarding this appointment and acknowledge the clinic's 24-hour rescheduling policy.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.consent}
                </p>
              )}
            </div>

            {/* Navigation & Submit */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-[#44562A]/30 text-[#44562A] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#44562A]/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !formData.consent}
                className="px-8 py-3.5 bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xl active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Saving to Supabase &amp; Securing Slot...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#C9B98A]" />
                    <span>Complete Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
