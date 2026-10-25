import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const ManagementNavbar = () => {
  const { user, logout, isAdmin, isEditor } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="bg-surface-container-lowest/90 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-sm border-b border-outline-variant/30">
        <div className="flex justify-between items-center w-full px-6 py-3.5 max-w-screen-2xl mx-auto">
          {/* Brand & Management Tag */}
          <div className="flex items-center gap-4">
            <Link to="/" className="font-headline text-2xl font-bold text-primary tracking-tight flex items-center gap-3">
              <img src="/logo.jpg" alt="OD AI HUB Logo" className="w-9 h-9 rounded-full object-cover shadow-sm border border-outline-variant/30" />
              <span>OD AI HUB</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
              <span className="material-symbols-outlined text-sm">database</span>
              <span>Data Entry & Management Dashboard</span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            {/* Link to Public Portal */}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/40"
              title="Open Public Educational Portal in a new tab"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span>Open Public Portal (3000)</span>
            </a>

            {/* Auth section */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="font-label text-xs font-bold text-on-surface tracking-wide">{user.username}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="font-label text-xs font-bold px-3 py-1.5 rounded-xl border border-outline-variant hover:bg-surface-container-high text-on-surface transition-all shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="font-label text-xs font-bold px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-sm"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default ManagementNavbar;
