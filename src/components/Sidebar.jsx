import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, FileText, Target, Briefcase, Sparkles, Bookmark,
  CheckCircle2, Award, User, Shield, Users, Layers, BookOpen
} from 'lucide-react';

export default function Sidebar() {
  const { isAdmin } = useAuth();

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Career Profile', path: '/profile', icon: User },
    { name: 'Resume AI Upload', path: '/resume-upload', icon: FileText },
    { name: 'Resume Analysis', path: '/resume-analysis', icon: Sparkles },
    { name: 'Skill Gap Analysis', path: '/skill-gap', icon: Target },
    { name: 'Job Marketplace', path: '/jobs', icon: Briefcase },
    { name: 'AI Recommended Jobs', path: '/recommendations', icon: Sparkles },
    { name: 'Saved Jobs', path: '/saved-jobs', icon: Bookmark },
    { name: 'Application Tracker', path: '/applications', icon: CheckCircle2 },
    { name: 'Skills & Courses', path: '/skills-learning', icon: Award }
  ];

  const adminLinks = [
    { name: 'Platform Stats', path: '/admin/dashboard', icon: Shield },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Manage Jobs', path: '/admin/jobs', icon: Briefcase },
    { name: 'Manage Skills', path: '/admin/skills', icon: Layers },
    { name: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Applications Review', path: '/admin/applications', icon: CheckCircle2 }
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-800 bg-slate-950/40 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <span className="px-3 text-[10px] font-extrabold tracking-wider uppercase text-slate-500 block mb-2">
            {isAdmin ? 'Admin Console' : 'Main Journey'}
          </span>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? (isAdmin
                            ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                            : 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm')
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {!isAdmin && (
          <div className="glass-card p-4 border border-sky-500/20 bg-gradient-to-b from-sky-950/20 to-indigo-950/20 text-slate-300">
            <div className="flex items-center space-x-2 text-sky-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold">Smart Career Loop</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Upload resume → Extract skills → Analyze skill gap → Apply to high match jobs.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
