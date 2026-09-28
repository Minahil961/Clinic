import React, { useState, useEffect } from 'react';
import { AdminUser, getActiveAdminSession } from '../../lib/adminAuth';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminPortalProps {
  onBackToSite: () => void;
  initialTab?: 'appointments' | 'environment';
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite, initialTab = 'appointments' }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const session = getActiveAdminSession();
    if (session) {
      setCurrentUser(session);
    }
    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#34431F] flex items-center justify-center text-[#F5F0E1]">
        <div className="text-sm animate-pulse">Initializing Vogue Clinical Console...</div>
      </div>
    );
  }

  if (currentUser) {
    return (
      <AdminDashboard
        admin={currentUser}
        onLogout={handleLogout}
        onBackToSite={onBackToSite}
        initialTab={initialTab}
      />
    );
  }

  return (
    <AdminLogin
      onLoginSuccess={handleLoginSuccess}
      onBackToSite={onBackToSite}
    />
  );
};
