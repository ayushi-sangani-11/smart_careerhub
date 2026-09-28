import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Sparkles, FileText, Target, Briefcase, Award, CheckCircle, ArrowRight,
  TrendingUp, Users, BookOpen, Search, ShieldCheck, Code, Database, Layout, Cloud, Shield, BarChart2
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      <div>
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-semibold shadow-lg shadow-sky-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Job Platform & Skill Gap Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Find the Right Job. <br />
              <span className="gradient-text">Understand Your Skill Gaps. Build the Skills You Need.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Smart CareerHub helps candidates across Software Engineering, Data Science, Design, Cloud & DevOps, Digital Marketing, Finance, and HR find jobs, compare their resume against specific job requirements, and bridge their skill gaps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold gradient-btn shadow-xl shadow-sky-500/25 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/jobs"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore Jobs</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CAREER FIELDS SHOWCASE */}
        <section className="py-12 bg-slate-900/40 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6 text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Explore Opportunities Across Multiple Career Fields
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Software Development', icon: Code },
                { name: 'Data Science & Analytics', icon: Database },
                { name: 'UI/UX & Graphic Design', icon: Layout },
                { name: 'Cloud & DevOps', icon: Cloud },
                { name: 'Cybersecurity', icon: Shield },
                { name: 'Digital Marketing', icon: BarChart2 },
                { name: 'Finance & Business', icon: TrendingUp },
                { name: 'QA & Testing', icon: CheckCircle }
              ].map((field, idx) => {
                const IconComponent = field.icon;
                return (
                  <Link
                    key={idx}
                    to={`/jobs?category=${encodeURIComponent(field.name)}`}
                    className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 text-xs font-semibold text-slate-300 hover:text-white flex items-center space-x-2 transition-all"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-sky-400" />
                    <span>{field.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Job-Specific Resume & Skill Gap Analysis
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                No single static score. Compare your candidate resume against real job requirements for tailored insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 border border-slate-800 hover:border-sky-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">1. Select Any Job</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Browse openings across software development, data science, design, cloud, marketing, finance, or HR.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">2. Analyze Your Resume</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Python AI extracts your skills and compares them against the specific job description and required prerequisites.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">3. Get Skill Gap Report</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  See matched skills (✓), missing skills (✗), match percentage, and targeted learning recommendations before applying.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
