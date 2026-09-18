import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import {
  Sparkles, Briefcase, FileText, Target, Award, Bookmark, UserCheck, Shield,
  LogOut, User, Menu, X, ChevronDown, Compass
} from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 glass-nav border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">Smart<span className="gradient-text">CareerHub</span></span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">AI Career Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-1">
              {!isAdmin ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/jobs"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/jobs') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/resume-analysis"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/resume-analysis') || isActive('/resume-upload') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Resume AI
                  </Link>
                  <Link
                    to="/skill-gap"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/skill-gap') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Skill Gap
                  </Link>
                  <Link
                    to="/recommendations"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/recommendations') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    AI Matches
                  </Link>
                  <Link
                    to="/applications"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/applications') ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Applications
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/dashboard') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Admin Stats
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/jobs') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Manage Jobs
                  </Link>
                  <Link
                    to="/admin/users"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/users') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Manage Users
                  </Link>
                  <Link
                    to="/admin/applications"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/applications') ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Applications
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</Link>
              <Link to="/jobs" className="text-sm text-slate-300 hover:text-white transition-colors">Explore Jobs</Link>
            </div>
          )}

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <NotificationDropdown />

                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2.5 p-1.5 pl-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-colors focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isAdmin ? 'bg-indigo-600 text-white' : 'bg-sky-600 text-white'
                    }`}>
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden sm:block text-left pr-1">
                      <span className="block text-xs font-semibold text-slate-200 leading-tight">{user?.name}</span>
                      <span className={`block text-[10px] uppercase font-bold tracking-wider ${
                        isAdmin ? 'text-indigo-400' : 'text-sky-400'
                      }`}>
                        {user?.role}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass-card border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-200">
                      <div className="px-4 py-2 border-b border-slate-800 text-xs">
                        <span className="block font-semibold text-slate-100">{user?.name}</span>
                        <span className="block text-slate-400 truncate">{user?.email}</span>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs hover:bg-slate-800/70 text-slate-300 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 text-sky-400" />
                        <span>My Career Profile</span>
                      </Link>

                      <Link
                        to="/saved-jobs"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs hover:bg-slate-800/70 text-slate-300 hover:text-white transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-emerald-400" />
                        <span>Saved Jobs</span>
                      </Link>

                      <Link
                        to="/skills-learning"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs hover:bg-slate-800/70 text-slate-300 hover:text-white transition-colors"
                      >
                        <Award className="w-4 h-4 text-indigo-400" />
                        <span>Skills & Courses</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-xs hover:bg-indigo-950/40 text-indigo-300 transition-colors border-t border-slate-800/80"
                        >
                          <Shield className="w-4 h-4 text-indigo-400" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs hover:bg-rose-950/40 text-rose-400 transition-colors border-t border-slate-800/80 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-xs font-semibold gradient-btn shadow-lg shadow-sky-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-2 text-slate-200">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Dashboard</Link>
              <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Jobs Marketplace</Link>
              <Link to="/resume-analysis" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Resume AI Analysis</Link>
              <Link to="/skill-gap" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Skill Gap</Link>
              <Link to="/recommendations" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Job Recommendations</Link>
              <Link to="/applications" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Application Tracker</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">My Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-950/30">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-slate-300">Explore Jobs</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-slate-300">Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-sky-400">Create Account</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
