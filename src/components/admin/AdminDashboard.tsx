import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { AdminUser, logoutAdmin } from '../../lib/adminAuth';
import { AdminEnvironment } from './AdminEnvironment';
import { Logo } from '../Logo';
import { DEPARTMENTS, CLINIC_CONTACT } from '../../data/clinicData';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  RefreshCw,
  Download,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  MessageSquare,
  Eye,
  FileSpreadsheet,
  Stethoscope,
  Sparkles,
  ChevronDown,
  Sliders,
  Database
} from 'lucide-react';

interface AdminDashboardProps {
  admin: AdminUser;
  onLogout: () => void;
  onBackToSite: () => void;
  initialTab?: 'appointments' | 'environment';
}

export interface AppointmentRecord {
  id?: string;
  reference_number?: string;
  referenceNumber?: string;
  full_name?: string;
  fullName?: string;
  phone: string;
  email: string;
  age?: string | null;
  gender?: string | null;
  department_id?: string;
  departmentId?: string;
  department_name?: string;
  departmentName?: string;
  doctor_id?: string;
  doctorId?: string;
  doctor_name?: string;
  doctorName?: string;
  service_id?: string;
  serviceId?: string;
  service_name?: string;
  serviceName?: string;
  preferred_date?: string;
  preferredDate?: string;
  time_slot?: string;
  timeSlot?: string;
  visit_type?: string;
  visitType?: string;
  notes?: string | null;
  status?: string;
  created_at?: string;
  createdAt?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  admin,
  onLogout,
  onBackToSite,
  initialTab = 'appointments'
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'environment'>(initialTab);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  // Selected for detail modal
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not query Supabase appointments table:', error.message);
        setErrorMessage(
          `Supabase notice: ${error.message}. (If table 'appointments' is not created yet, please create it in your Supabase dashboard).`
        );
        // Fallback: check localStorage for any recently cached bookings
        const localCached = localStorage.getItem('vogue_local_bookings');
        if (localCached) {
          try {
            setAppointments(JSON.parse(localCached));
          } catch (e) {}
        }
      } else if (data) {
        setAppointments(data);
        localStorage.setItem('vogue_local_bookings', JSON.stringify(data));
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch appointments from Supabase.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const handleUpdateStatus = async (item: AppointmentRecord, newStatus: string) => {
    const id = item.id;
    const refNum = item.reference_number || item.referenceNumber;

    setUpdatingId(id || refNum || 'current');

    try {
      if (id) {
        await supabase
          .from('appointments')
          .update({ status: newStatus })
          .eq('id', id);
      } else if (refNum) {
        await supabase
          .from('appointments')
          .update({ status: newStatus })
          .eq('reference_number', refNum);
      }

      // Update local state
      setAppointments((prev) =>
        prev.map((a) => {
          if ((id && a.id === id) || (refNum && (a.reference_number === refNum || a.referenceNumber === refNum))) {
            return { ...a, status: newStatus };
          }
          return a;
        })
      );

      if (selectedAppointment) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper getters for normalized fields (supporting both snake_case and camelCase)
  const getRef = (a: AppointmentRecord) => a.reference_number || a.referenceNumber || 'VOG-PENDING';
  const getName = (a: AppointmentRecord) => a.full_name || a.fullName || 'Anonymous Patient';
  const getDept = (a: AppointmentRecord) => a.department_name || a.departmentName || a.department_id || 'General Dentistry';
  const getDoc = (a: AppointmentRecord) => a.doctor_name || a.doctorName || 'Any Specialist';
  const getService = (a: AppointmentRecord) => a.service_name || a.serviceName || 'Consultation';
  const getDate = (a: AppointmentRecord) => a.preferred_date || a.preferredDate || 'N/A';
  const getTime = (a: AppointmentRecord) => a.time_slot || a.timeSlot || 'N/A';
  const getStatus = (a: AppointmentRecord) => (a.status || 'pending').toLowerCase();
  const getCreatedAt = (a: AppointmentRecord) => a.created_at || a.createdAt || new Date().toISOString();

  // Filtered List
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const status = getStatus(a);
      const matchesStatus = statusFilter === 'all' || status === statusFilter.toLowerCase();

      const dept = getDept(a);
      const matchesDept = deptFilter === 'all' || dept.toLowerCase().includes(deptFilter.toLowerCase());

      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !query ||
        getName(a).toLowerCase().includes(query) ||
        a.phone.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query) ||
        getRef(a).toLowerCase().includes(query) ||
        getDoc(a).toLowerCase().includes(query) ||
        getService(a).toLowerCase().includes(query);

      return matchesStatus && matchesDept && matchesSearch;
    });
  }, [appointments, statusFilter, deptFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => getStatus(a) === 'pending').length;
    const confirmed = appointments.filter((a) => getStatus(a) === 'confirmed').length;
    const completed = appointments.filter((a) => getStatus(a) === 'completed').length;
    return { total, pending, confirmed, completed };
  }, [appointments]);

  // CSV Export
  const exportToCSV = () => {
    if (appointments.length === 0) return;

    const headers = [
      'Reference Number',
      'Patient Name',
      'Phone',
      'Email',
      'Age',
      'Gender',
      'Department',
      'Service',
      'Doctor',
      'Date',
      'Time Slot',
      'Visit Type',
      'Status',
      'Notes',
      'Created At'
    ];

    const rows = appointments.map((a) => [
      `"${getRef(a)}"`,
      `"${getName(a)}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.age || ''}"`,
      `"${a.gender || ''}"`,
      `"${getDept(a)}"`,
      `"${getService(a)}"`,
      `"${getDoc(a)}"`,
      `"${getDate(a)}"`,
      `"${getTime(a)}"`,
      `"${a.visit_type || a.visitType || 'First Visit'}"`,
      `"${getStatus(a)}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${getCreatedAt(a)}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vogue_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-semibold">
            <XCircle className="w-3 h-3 text-red-600" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
            <Clock3 className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F3] text-[#2A3320] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-[#34431F] text-[#F5F0E1] border-b border-[#6B7F4A]/30 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="cursor-pointer" onClick={onBackToSite}>
              <Logo variant="cream" size="sm" />
            </div>
            <div className="hidden md:block border-l border-[#6B7F4A]/50 pl-4">
              <p className="text-xs uppercase tracking-wider text-[#C9B98A] font-bold">
                Clinical Admin Console
              </p>
              <p className="text-[11px] text-[#F5F0E1]/70">
                Supabase: <span className="font-mono text-[#E8DFCA]">ddibkibjxbgkjhjzsejl</span>
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#44562A] hover:bg-[#6B7F4A] text-[#F5F0E1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>

            <div className="text-right hidden lg:block">
              <p className="text-xs font-semibold text-[#F5F0E1]">{admin.email}</p>
              <p className="text-[10px] text-[#C9B98A] font-medium uppercase tracking-wider">
                Master Admin
              </p>
            </div>

            <button
              onClick={async () => {
                await logoutAdmin();
                onLogout();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#34431F] hover:bg-red-900/60 border border-[#6B7F4A]/40 text-[#F5F0E1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Subheader Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-4 pt-3 border-t border-[#6B7F4A]/30">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 py-2 px-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-[#44562A] text-[#F5F0E1] shadow-md border border-[#C9B98A]/30'
                : 'text-[#F5F0E1]/70 hover:text-white hover:bg-[#44562A]/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9B98A]" />
            <span>Patient Bookings</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#34431F] text-[#C9B98A] font-bold">
              {appointments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('environment')}
            className={`flex items-center gap-2 py-2 px-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'environment'
                ? 'bg-[#44562A] text-[#F5F0E1] shadow-md border border-[#C9B98A]/30'
                : 'text-[#F5F0E1]/70 hover:text-white hover:bg-[#44562A]/40'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-[#C9B98A]" />
            <span>Environment Values</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'environment' ? (
          <AdminEnvironment />
        ) : (
          <>
            {/* Supabase connection or table banner if any */}
            {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-xs">Supabase Database Notice</p>
                <p className="mt-0.5 text-amber-800 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={fetchBookings}
              className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded text-amber-900 font-semibold text-[11px] shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-[#44562A]/15 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7F4A]">
              Total Bookings
            </span>
            <p className="text-3xl font-serif font-bold text-[#2A3320] mt-1">
              {stats.total}
            </p>
            <p className="text-[11px] text-[#2A3320]/60 mt-1">All time patient submissions</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm bg-amber-50/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Clock3 className="w-3.5 h-3.5" />
              <span>Pending Intake</span>
            </span>
            <p className="text-3xl font-serif font-bold text-amber-900 mt-1">
              {stats.pending}
            </p>
            <p className="text-[11px] text-amber-700/80 mt-1">Requires WhatsApp/Call confirmation</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm bg-emerald-50/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmed</span>
            </span>
            <p className="text-3xl font-serif font-bold text-emerald-900 mt-1">
              {stats.confirmed}
            </p>
            <p className="text-[11px] text-emerald-700/80 mt-1">Slots locked &amp; scheduled</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#44562A]/15 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#44562A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C9B98A]" />
              <span>Completed</span>
            </span>
            <p className="text-3xl font-serif font-bold text-[#2A3320] mt-1">
              {stats.completed}
            </p>
            <p className="text-[11px] text-[#2A3320]/60 mt-1">Concluded visits</p>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white rounded-2xl p-5 border border-[#44562A]/15 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search patient, phone, ref #, doctor, treatment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#FBF9F3] border border-[#44562A]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44562A]"
              />
              <Search className="w-4 h-4 text-[#44562A]/60 absolute left-3.5 top-2.5" />
            </div>

            {/* Quick Actions (Refresh & CSV Export) */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={handleManualRefresh}
                disabled={refreshing || loading}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#FBF9F3] hover:bg-[#44562A] hover:text-white border border-[#44562A]/20 rounded-xl transition-all cursor-pointer"
                title="Refresh from Supabase"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={exportToCSV}
                disabled={appointments.length === 0}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#44562A] text-[#F5F0E1] hover:bg-[#34431F] rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-[#C9B98A]" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Status & Department Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#44562A]/10">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#44562A] text-white shadow-xs'
                      : 'bg-[#FBF9F3] text-[#2A3320]/80 hover:bg-[#44562A]/10'
                  }`}
                >
                  {st} {st !== 'all' ? `(${appointments.filter(a => getStatus(a) === st).length})` : `(${appointments.length})`}
                </button>
              ))}
            </div>

            {/* Department Dropdown Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#2A3320]/70 font-medium">Department:</span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-3 py-1 text-xs bg-[#FBF9F3] border border-[#44562A]/20 rounded-lg focus:outline-none"
              >
                <option value="all">All Departments</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-[#44562A]/15 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#44562A]/10 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#2A3320]">
              Patient Appointments ({filteredAppointments.length})
            </h3>
            <span className="text-[11px] text-[#2A3320]/60">
              Live from Supabase table <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">appointments</code>
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-[#2A3320]/60 text-xs">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#44562A]" />
              <p>Loading patient bookings from Supabase...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-[#2A3320]/70 text-xs space-y-2">
              <p className="font-medium text-sm">No appointment records found matching your filters.</p>
              <p className="text-[11px] text-[#2A3320]/50">
                When patients submit the booking form on the website, their details appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#44562A]/5 text-[#2A3320] uppercase font-bold text-[10px] tracking-wider border-b border-[#44562A]/10">
                  <tr>
                    <th className="p-4">Ref Code</th>
                    <th className="p-4">Patient Details</th>
                    <th className="p-4">Service &amp; Dept</th>
                    <th className="p-4">Specialist</th>
                    <th className="p-4">Scheduled Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#44562A]/10">
                  {filteredAppointments.map((a, idx) => {
                    const status = getStatus(a);
                    const ref = getRef(a);
                    const name = getName(a);
                    const isRowUpdating = updatingId === a.id || updatingId === ref;

                    return (
                      <tr key={a.id || idx} className="hover:bg-[#FBF9F3] transition-colors">
                        {/* Reference Number */}
                        <td className="p-4 font-mono font-bold text-[#44562A]">
                          {ref}
                        </td>

                        {/* Patient */}
                        <td className="p-4">
                          <p className="font-semibold text-[#2A3320]">{name}</p>
                          <div className="text-[11px] text-[#2A3320]/70 mt-0.5 space-y-0.5">
                            <p>{a.phone}</p>
                            <p className="text-[10px] text-gray-500 truncate max-w-[160px]">{a.email}</p>
                          </div>
                        </td>

                        {/* Service & Dept */}
                        <td className="p-4 max-w-xs">
                          <p className="font-semibold text-[#2A3320]">{getService(a)}</p>
                          <p className="text-[11px] text-[#6B7F4A]">{getDept(a)}</p>
                        </td>

                        {/* Doctor */}
                        <td className="p-4 font-medium text-[#2A3320]">
                          {getDoc(a)}
                        </td>

                        {/* Date & Time */}
                        <td className="p-4">
                          <div className="flex items-center gap-1 font-semibold text-[#2A3320]">
                            <Calendar className="w-3 h-3 text-[#44562A]" />
                            <span>{getDate(a)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-[#2A3320]/70 mt-0.5">
                            <Clock className="w-3 h-3 text-[#C9B98A]" />
                            <span>{getTime(a)}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          {getStatusBadge(status)}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Details */}
                            <button
                              onClick={() => setSelectedAppointment(a)}
                              className="p-1.5 text-[#44562A] hover:bg-[#44562A]/10 rounded-lg transition-colors cursor-pointer"
                              title="View Patient Record"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* WhatsApp Quick Chat */}
                            <a
                              href={`https://wa.me/${a.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                name
                              )}%2C%20this%20is%20VOGUE%20Dental%20%26%20Aesthetics%20regarding%20your%20appointment%20request%20(${ref}).`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Open WhatsApp with Patient"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>

                            {/* Quick Status Toggle */}
                            <div className="relative inline-block text-left">
                              <select
                                disabled={isRowUpdating}
                                value={status}
                                onChange={(e) => handleUpdateStatus(a, e.target.value)}
                                className="text-[11px] bg-white border border-[#44562A]/20 rounded-md py-1 px-1.5 focus:outline-none cursor-pointer"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}
      </main>

      {/* Patient Booking Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedAppointment(null)}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#44562A]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#44562A]/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7F4A]">
                    Clinical Record Detail
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#2A3320]">
                    {getName(selectedAppointment)}
                  </h4>
                  <p className="font-mono text-xs text-[#44562A] font-semibold mt-0.5">
                    Ref: {getRef(selectedAppointment)}
                  </p>
                </div>
                <div>{getStatusBadge(getStatus(selectedAppointment))}</div>
              </div>

              {/* Patient Fields Grid */}
              <div className="mt-5 space-y-3 text-xs text-[#2A3320]">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#FBF9F3] border border-[#44562A]/10">
                  <div>
                    <span className="text-[#2A3320]/60 block text-[10px] uppercase font-semibold">
                      Telephone
                    </span>
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="font-semibold text-[#44562A] hover:underline"
                    >
                      {selectedAppointment.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#2A3320]/60 block text-[10px] uppercase font-semibold">
                      Email
                    </span>
                    <a
                      href={`mailto:${selectedAppointment.email}`}
                      className="font-semibold text-[#44562A] hover:underline truncate block"
                    >
                      {selectedAppointment.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#FBF9F3] border border-[#44562A]/10">
                  <div>
                    <span className="text-[#2A3320]/60 block text-[10px] uppercase font-semibold">
                      Age / Gender
                    </span>
                    <span className="font-semibold">
                      {selectedAppointment.age || 'Not specified'} · {selectedAppointment.gender || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#2A3320]/60 block text-[10px] uppercase font-semibold">
                      Visit Category
                    </span>
                    <span className="font-semibold">
                      {selectedAppointment.visit_type || selectedAppointment.visitType || 'First Visit'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FBF9F3] border border-[#44562A]/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#2A3320]/60 text-[10px] uppercase font-semibold">
                      Department
                    </span>
                    <span className="font-semibold">{getDept(selectedAppointment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A3320]/60 text-[10px] uppercase font-semibold">
                      Service / Procedure
                    </span>
                    <span className="font-semibold text-[#44562A]">{getService(selectedAppointment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A3320]/60 text-[10px] uppercase font-semibold">
                      Consultant
                    </span>
                    <span className="font-semibold">{getDoc(selectedAppointment)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#44562A]/10">
                    <span className="text-[#2A3320]/60 text-[10px] uppercase font-semibold">
                      Date &amp; Time
                    </span>
                    <span className="font-bold text-[#44562A]">
                      {getDate(selectedAppointment)} at {getTime(selectedAppointment)}
                    </span>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="text-amber-800 block text-[10px] uppercase font-bold mb-0.5">
                      Patient Notes &amp; Concerns:
                    </span>
                    <p className="italic text-xs text-amber-900">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>

              {/* Status Update & Quick Contact Actions */}
              <div className="mt-6 pt-4 border-t border-[#44562A]/10 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#2A3320]">Change Status:</span>
                  <div className="flex items-center gap-1.5">
                    {['pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedAppointment, st)}
                        className={`px-2.5 py-1 text-[11px] font-semibold capitalize rounded-md transition-colors cursor-pointer ${
                          getStatus(selectedAppointment) === st
                            ? 'bg-[#44562A] text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`https://wa.me/${selectedAppointment.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                      getName(selectedAppointment)
                    )}%2C%20this%20is%20VOGUE%20Dental%20%26%20Aesthetics%20regarding%20your%20appointment%20ref%20%23${getRef(
                      selectedAppointment
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider rounded-xl text-center hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Patient</span>
                  </a>

                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="px-5 py-2.5 bg-[#FBF9F3] border border-[#44562A]/20 text-[#2A3320] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#44562A]/10 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
