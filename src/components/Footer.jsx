import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Mail, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-white">Smart<span className="gradient-text">CareerHub</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-powered career, resume analysis & job recommendation platform empowering students & graduates to achieve job readiness.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/jobs" className="hover:text-sky-400 transition-colors">Browse Jobs</Link></li>
            <li><Link to="/resume-upload" className="hover:text-sky-400 transition-colors">Resume AI Analyzer</Link></li>
            <li><Link to="/skill-gap" className="hover:text-sky-400 transition-colors">Skill Gap Engine</Link></li>
            <li><Link to="/recommendations" className="hover:text-sky-400 transition-colors">AI Job Matching</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/skills-learning" className="hover:text-sky-400 transition-colors">Learning Recommendations</Link></li>
            <li><Link to="/applications" className="hover:text-sky-400 transition-colors">Application Tracker</Link></li>
            <li><a href="#how-it-works" className="hover:text-sky-400 transition-colors">How It Works</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Legal & Security</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-500 hover:text-slate-400">Privacy Policy</span></li>
            <li><span className="text-slate-500 hover:text-slate-400">Terms of Service</span></li>
            <li><span className="text-slate-500 hover:text-slate-400">JWT & Role Security</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 Smart CareerHub — AI-Powered Career Platform. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 font-medium">Built with MERN Stack & Python FastAPI NLP</p>
      </div>
    </footer>
  );
}
