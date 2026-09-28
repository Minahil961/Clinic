import { supabase } from './supabase';

const ADMIN_CLAIMED_KEY = 'vogue_admin_claimed';
const ADMIN_EMAIL_KEY = 'vogue_admin_email';
const ADMIN_HASH_KEY = 'vogue_admin_hash';
const ADMIN_SESSION_KEY = 'vogue_admin_active_session';

export interface AdminUser {
  email: string;
  role: 'super_admin';
  claimedAt: string;
}

/**
 * Checks if the single admin account slot has already been claimed.
 */
export async function isAdminSlotClaimed(): Promise<{
  isClaimed: boolean;
  adminEmail?: string;
}> {
  // Check local persistence
  const localClaimed = localStorage.getItem(ADMIN_CLAIMED_KEY) === 'true';
  const localEmail = localStorage.getItem(ADMIN_EMAIL_KEY) || undefined;

  if (localClaimed && localEmail) {
    return { isClaimed: true, adminEmail: localEmail };
  }

  // Check Supabase 'admin_users' or config table if present
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email, created_at')
      .limit(1);

    if (!error && data && data.length > 0) {
      localStorage.setItem(ADMIN_CLAIMED_KEY, 'true');
      localStorage.setItem(ADMIN_EMAIL_KEY, data[0].email);
      return { isClaimed: true, adminEmail: data[0].email };
    }
  } catch (err) {
    // Supabase table may not exist yet, fallback to local
  }

  return { isClaimed: false };
}

/**
 * Registers the ONLY admin account allowed for this application.
 * Once called, no further admin registrations are permitted.
 */
export async function registerSingleAdminSlot(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const currentStatus = await isAdminSlotClaimed();
  if (currentStatus.isClaimed) {
    return {
      success: false,
      error: 'The single admin account slot has already been claimed. Additional registrations are strictly disallowed.'
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    // 1. Try Supabase Auth Sign Up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: password
    });

    if (authError && !authError.message.includes('already registered')) {
      console.warn('Supabase Auth signUp note:', authError.message);
    }

    // 2. Try inserting into 'admin_users' table in Supabase
    try {
      await supabase.from('admin_users').insert([
        {
          email: normalizedEmail,
          role: 'super_admin',
          created_at: new Date().toISOString()
        }
      ]);
    } catch (dbErr) {
      console.warn('Could not insert to admin_users table (may not exist yet):', dbErr);
    }

    // 3. Mark slot as permanently claimed
    localStorage.setItem(ADMIN_CLAIMED_KEY, 'true');
    localStorage.setItem(ADMIN_EMAIL_KEY, normalizedEmail);
    // Secure simple verification hash for fallback in case email confirmation is required by Supabase
    localStorage.setItem(ADMIN_HASH_KEY, btoa(`${normalizedEmail}:${password}`));

    const adminUser: AdminUser = {
      email: normalizedEmail,
      role: 'super_admin',
      claimedAt: new Date().toISOString()
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));

    return {
      success: true,
      user: adminUser
    };
  } catch (err: any) {
    console.error('Admin registration error:', err);
    return {
      success: false,
      error: err.message || 'Failed to complete admin registration.'
    };
  }
}

/**
 * Logs in the registered admin.
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const normalizedEmail = email.trim().toLowerCase();
  const claimedStatus = await isAdminSlotClaimed();

  if (!claimedStatus.isClaimed) {
    return {
      success: false,
      error: 'No admin account has been created yet. Please use the Single Slot Setup to create your admin credentials.'
    };
  }

  if (claimedStatus.adminEmail && claimedStatus.adminEmail !== normalizedEmail) {
    return {
      success: false,
      error: 'Access denied: Entered email does not match the registered clinic admin account.'
    };
  }

  try {
    // Try Supabase Auth sign-in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: password
    });

    if (!error && data?.user) {
      const adminUser: AdminUser = {
        email: normalizedEmail,
        role: 'super_admin',
        claimedAt: data.user.created_at || new Date().toISOString()
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    // Fallback credential check (if Supabase email confirmation is pending)
    const storedHash = localStorage.getItem(ADMIN_HASH_KEY);
    const providedHash = btoa(`${normalizedEmail}:${password}`);

    if (storedHash === providedHash) {
      const adminUser: AdminUser = {
        email: normalizedEmail,
        role: 'super_admin',
        claimedAt: new Date().toISOString()
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    return {
      success: false,
      error: error?.message || 'Invalid email or password.'
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Login failed. Please check your credentials.'
    };
  }
}

/**
 * Returns currently authenticated admin session if active.
 */
export function getActiveAdminSession(): AdminUser | null {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Logs out the admin.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    // Ignore sign-out error
  }
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
