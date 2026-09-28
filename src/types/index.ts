export interface Department {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  serviceCount: number;
  doctorCount: number;
}

export interface Service {
  id: string;
  departmentId: string;
  departmentName: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  recommendedFor: string;
  popular?: boolean;
}

export interface Doctor {
  id: string;
  departmentId: string;
  departmentName: string;
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  bio: string;
  image: string;
  availableDays: string[];
  specialties: string[];
  headOfDepartment?: boolean;
}

export interface BeforeAfterCase {
  id: string;
  category: 'cosmetic' | 'aesthetics' | 'ortho';
  title: string;
  treatment: string;
  doctor: string;
  timeline: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  department: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface PricingPackage {
  id: string;
  title: string;
  department: string;
  priceNote: string;
  tag?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  age?: string;
  gender?: string;
  departmentId: string;
  doctorId: string;
  serviceId: string;
  preferredDate: string;
  timeSlot: string;
  visitType: 'First Visit' | 'Follow-up';
  notes: string;
  consent: boolean;
}

export interface BookingConfirmation {
  referenceNumber: string;
  data: BookingFormData;
  submittedAt: string;
}
