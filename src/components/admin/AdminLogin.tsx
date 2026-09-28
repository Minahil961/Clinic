import React, { useState, useEffect } from 'react';
import {
  isAdminSlotClaimed,
  registerSingleAdminSlot,
  loginAdmin,
  AdminUser
} from '../../lib/adminAuth';
import { Logo } from '../Logo';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite
}) => {
  const [isSlotClaimed, setIsSlotClaimed] = useState<boolean | null>(null);
  const [claimedEmail, setClaimedEmail] = useState<string | undefined>(undefined);
  const [isSetupMode, setIsSetupMode] = useState<boolean>(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    checkSlot();
  }, []);

  const checkSlot = async () => {
    const status = await isAdminSlotClaimed();
    setIsSlotClaimed(status.isClaimed);
    setClaimedEmail(status.adminEmail);
    if (!status.isClaimed) {
      setIsSetupMode(true);
    } else {
      setIsSetupMode(false);
      if (status.adminEmail) {
        setEmail(status.adminEmail);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (isSetupMode) {
      // Single slot registration
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      setLoading(true);
      const res = await registerSingleAdminSlot(email, password);
      setLoading(false);

      if (res.success && res.user) {
        setSuccessMsg('Master admin account successfully established and secured!');
        setTimeout(() => {
          onLoginSuccess(res.user!);
        }, 800);
      } else {
        setErrorMsg(res.error || 'Failed to claim admin slot.');
      }
    } else {
      // Standard login
      setLoading(true);
      const res = await loginAdmin(email, password);
      setLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Login failed. Please verify your credentials.');
      }
    }
  };

  if (isSlotClaimed === null) {
    return (
      <div className="min-h-screen bg-[#34431F] flex items-center justify-center text-[#F5F0E1]">
        <div className="animate-pulse text-sm">Verifying security portal status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2A3320] via-[#34431F] to-[#2A3320] text-[#F5F0E1] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar with Logo & Return Link */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6">
        <div className="cursor-pointer" onClick={onBackToSite}>
          <Logo variant="cream" size="sm" />
        </div>
        <button
          onClick={onBackToSite}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E1]/80 hover:text-white transition-colors cursor-pointer bg-[#44562A]/40 px-3.5 py-2 rounded-xl border border-[#6B7F4A]/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-[#44562A]/60 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#C9B98A]/30 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C9B98A]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Icon & Title */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-[#34431F] border border-[#C9B98A]/40 text-[#C9B98A] flex items-center justify-center mx-auto mb-3 shadow-lg">
              {isSetupMode ? <UserCheck className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>

            {isSetupMode ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9B98A]/20 text-[#C9B98A] text-[10px] font-bold uppercase tracking-wider mb-2 border border-[#C9B98A]/40">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Single Slot Available</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E1]">
                  Create Master Admin
                </h2>
                <p className="mt-2 text-xs text-[#F5F0E1]/80 leading-relaxed font-light">
                  Establish the singular administrator account for <strong>VOGUE Dental &amp; Aesthetics</strong>. Once this account is created, all further registrations will be permanently disabled.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#34431F] text-[#C9B98A] text-[10px] font-bold uppercase tracking-wider mb-2 border border-[#6B7F4A]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Registration Locked</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E1]">
                  Clinic Management Login
                </h2>
                <p className="mt-2 text-xs text-[#F5F0E1]/80 leading-relaxed font-light">
                  Sign in to view, manage, and confirm all patient appointment bookings from the Supabase backend.
                </p>
              </>
            )}
          </div>

          {/* Error / Success Notifications */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9B98A] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@voguedental.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#34431F]/90 border border-[#6B7F4A]/50 rounded-xl text-[#F5F0E1] placeholder-[#F5F0E1]/40 focus:outline-none focus:ring-2 focus:ring-[#C9B98A]"
                />
                <Mail className="w-4 h-4 text-[#C9B98A] absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9B98A] mb-1.5">
                {isSetupMode ? 'Create Master Password' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#34431F]/90 border border-[#6B7F4A]/50 rounded-xl text-[#F5F0E1] placeholder-[#F5F0E1]/40 focus:outline-none focus:ring-2 focus:ring-[#C9B98A]"
                />
                <Key className="w-4 h-4 text-[#C9B98A] absolute left-3.5 top-3" />
              </div>
              {isSetupMode && (
                <p className="mt-1 text-[11px] text-[#F5F0E1]/60">Minimum 6 characters.</p>
              )}
            </div>

            {/* Confirm Password (Only during Setup Mode) */}
            {isSetupMode && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C9B98A] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#34431F]/90 border border-[#6B7F4A]/50 rounded-xl text-[#F5F0E1] placeholder-[#F5F0E1]/40 focus:outline-none focus:ring-2 focus:ring-[#C9B98A]"
                  />
                  <Key className="w-4 h-4 text-[#C9B98A] absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#F5F0E1] text-[#34431F] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : isSetupMode ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#44562A]" />
                    <span>Create &amp; Seal Single Admin Account</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#44562A]" />
                    <span>Sign In to Admin Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-[#44562A]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice Footer */}
          <div className="mt-6 pt-5 border-t border-[#6B7F4A]/30 text-center">
            {isSlotClaimed ? (
              <div className="text-[11px] text-[#F5F0E1]/60 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Single admin slot active. New registrations are blocked.</span>
              </div>
            ) : (
              <div className="text-[11px] text-[#C9B98A] flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Single slot setup. Only the primary administrator may register.</span>
              </div>
            )}
          </div>
        </div>

        {/* Database Sync Note */}
        <div className="mt-4 text-center text-xs text-[#F5F0E1]/60">
          <span>Connected to Supabase Project: <code className="font-mono text-[#C9B98A]">ddibkibjxbgkjhjzsejl</code></span>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-6xl mx-auto w-full pt-6 text-center text-xs text-[#F5F0E1]/50">
        <p>© 2025 VOGUE Dental &amp; Aesthetics · Internal Clinical Management System</p>
      </div>
    </div>
  );
};
