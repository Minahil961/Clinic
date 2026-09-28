import { createClient } from '@supabase/supabase-js';
import { BookingFormData } from '../types';
import { DEPARTMENTS, DOCTORS, SERVICES } from '../data/clinicData';

const SUPABASE_PROJECT_ID = 'ddibkibjxbgkjhjzsejl';
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_duiRlIbV2t_9AhAEwo6rjA_nPqS_Z86';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseAppointmentPayload {
  reference_number: string;
  full_name: string;
  phone: string;
  email: string;
  age?: string | null;
  gender?: string | null;
  department_id: string;
  department_name: string;
  doctor_id: string;
  doctor_name: string;
  service_id: string;
  service_name: string;
  preferred_date: string;
  time_slot: string;
  visit_type: string;
  notes?: string | null;
  consent: boolean;
  status: string;
}

/**
 * Saves a new appointment booking to Supabase
 */
export async function saveAppointmentToSupabase(
  formData: BookingFormData,
  referenceNumber: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const department = DEPARTMENTS.find(d => d.id === formData.departmentId);
    const doctor = DOCTORS.find(d => d.id === formData.doctorId);
    const service = SERVICES.find(s => s.id === formData.serviceId);

    const payload: SupabaseAppointmentPayload = {
      reference_number: referenceNumber,
      full_name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      age: formData.age ? formData.age.trim() : null,
      gender: formData.gender || null,
      department_id: formData.departmentId,
      department_name: department?.name || formData.departmentId,
      doctor_id: formData.doctorId,
      doctor_name: doctor?.name || (formData.doctorId === 'any' ? 'Any Available Specialist' : formData.doctorId),
      service_id: formData.serviceId,
      service_name: service?.name || formData.serviceId,
      preferred_date: formData.preferredDate,
      time_slot: formData.timeSlot,
      visit_type: formData.visitType,
      notes: formData.notes ? formData.notes.trim() : null,
      consent: formData.consent,
      status: 'pending'
    };

    // Attempt insert into 'appointments' table
    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase insert to "appointments" table returned error:', error);
      
      // Fallback: try inserting with camelCase keys in case the table uses camelCase columns
      const camelPayload = {
        referenceNumber: referenceNumber,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        age: formData.age || null,
        gender: formData.gender || null,
        departmentId: formData.departmentId,
        departmentName: department?.name || formData.departmentId,
        doctorId: formData.doctorId,
        doctorName: doctor?.name || (formData.doctorId === 'any' ? 'Any Available Specialist' : formData.doctorId),
        serviceId: formData.serviceId,
        serviceName: service?.name || formData.serviceId,
        preferredDate: formData.preferredDate,
        timeSlot: formData.timeSlot,
        visitType: formData.visitType,
        notes: formData.notes || null,
        consent: formData.consent,
        status: 'pending'
      };

      const fallbackResult = await supabase
        .from('appointments')
        .insert([camelPayload])
        .select();

      if (fallbackResult.error) {
        console.error('Supabase fallback insert failed:', fallbackResult.error);
        return {
          success: false,
          error: error.message || fallbackResult.error.message
        };
      }

      return { success: true, data: fallbackResult.data };
    }

    console.log('Successfully saved appointment to Supabase:', data);
    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected error saving to Supabase:', err);
    return {
      success: false,
      error: err?.message || 'Failed to connect to Supabase database.'
    };
  }
}

/**
 * Saves a general contact inquiry to Supabase
 */
export async function saveInquiryToSupabase(inquiry: {
  name: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: inquiry.name,
        phone: inquiry.phone,
        message: inquiry.message,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.warn('Could not insert into "inquiries" table:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Unexpected error saving inquiry to Supabase:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * SQL schema script for the appointments table in Supabase
 */
export const SQL_APPOINTMENTS_SCHEMA = `-- Run this in your Supabase SQL Editor if the table is not created yet:
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  reference_number text not null,
  full_name text not null,
  phone text not null,
  email text not null,
  age text,
  gender text,
  department_id text,
  department_name text,
  doctor_id text,
  doctor_name text,
  service_id text,
  service_name text,
  preferred_date text,
  time_slot text,
  visit_type text,
  notes text,
  consent boolean default true,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table appointments enable row level security;

-- Policy to allow anonymous users to submit appointments
create policy "Allow public appointment insert"
  on appointments for insert
  with check (true);

-- Policy to allow reading appointments
create policy "Allow read appointments"
  on appointments for select
  using (true);`;
