import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Sparkles, FileText, Target, Briefcase, Award, CheckCircle, ArrowRight,
  TrendingUp, Users, BookOpen, Search, ShieldCheck
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      <div>
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-24 overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Subtle background glow circles */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-semibold shadow-lg shadow-sky-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack MERN + Python NLP AI Career Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Build Your Career. <br />
              <span className="gradient-text">Discover Your Opportunities.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Smart CareerHub parses your resume with Python NLP, identifies critical skill gaps for your target role, calculates transparent job match percentages, and delivers personalized job recommendations.
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

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-slate-950/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Everything You Need for Career Success
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Powered by a modular microservice architecture using Node.js REST API & Python FastAPI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 border border-slate-800 hover:border-sky-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">AI Resume Analysis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extract technical & soft skills from PDF resumes with section quality scoring across Skills, Projects, Education, Experience & Keywords.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Skill Gap Detection</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Compare your detected skills against benchmark career role matrices (Full Stack, Python AI, DevOps, Data Analyst) to pinpoint missing requirements.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Smart Job Matching</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receive transparent job compatibility percentages (e.g. 94% Match) with exact breakdown of matching vs missing prerequisite skills.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-amber-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Personalized Recommendations</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI recommendation ranking prioritizes high-matching jobs tailored to your target career role and saved preferences.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-rose-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Application Tracker</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monitor application hiring pipeline from Applied → Under Review → Shortlisted → Interview → Selected with system notifications.
                </p>
              </div>

              <div className="glass-card p-6 border border-slate-800 hover:border-purple-500/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Learning Paths</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Discover curated learning courses mapped to missing skills (Docker, AWS, TypeScript) to systematically close skill gaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">How Smart CareerHub Works</h2>
              <p className="text-sm text-slate-400">A seamless 4-step path from resume upload to job application.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="glass-card p-6 border border-slate-800 text-center space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 font-extrabold text-lg flex items-center justify-center mx-auto">1</div>
                <h4 className="font-bold text-slate-100 text-sm">Create Profile</h4>
                <p className="text-xs text-slate-400">Register as a student and select your target career goal role.</p>
              </div>

              <div className="glass-card p-6 border border-slate-800 text-center space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 font-extrabold text-lg flex items-center justify-center mx-auto">2</div>
                <h4 className="font-bold text-slate-100 text-sm">Upload Resume</h4>
                <p className="text-xs text-slate-400">Upload your PDF resume for instant Python AI parsing and scoring.</p>
              </div>

              <div className="glass-card p-6 border border-slate-800 text-center space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-lg flex items-center justify-center mx-auto">3</div>
                <h4 className="font-bold text-slate-100 text-sm">Analyze Skills</h4>
                <p className="text-xs text-slate-400">Review detected skills, section scores, and identified skill gaps.</p>
              </div>

              <div className="glass-card p-6 border border-slate-800 text-center space-y-3 relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-lg flex items-center justify-center mx-auto">4</div>
                <h4 className="font-bold text-slate-100 text-sm">Discover & Apply</h4>
                <p className="text-xs text-slate-400">Apply to high-compatibility job matches and track your applications.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM STATISTICS SECTION */}
        <section className="py-16 bg-slate-950/80 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold gradient-text">15+</span>
              <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Tech Jobs Active</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-sky-400">40+</span>
              <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Skills Taxonomy</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-indigo-400">8+</span>
              <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Career Benchmark Roles</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-emerald-400">100%</span>
              <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Full-Stack SaaS Architecture</span>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto glass-card p-10 border border-sky-500/30 bg-gradient-to-tr from-sky-950/30 via-slate-900 to-indigo-950/30 space-y-6">
            <h2 className="text-3xl font-extrabold text-white">Ready to Boost Your Career Readiness?</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Join Smart CareerHub today. Analyze your resume, close skill gaps, and discover your next software engineering opportunity.
            </p>
            <div className="flex justify-center">
              <Link to="/register" className="px-8 py-4 rounded-2xl text-sm font-bold gradient-btn shadow-xl shadow-sky-500/25">
                Create Free Career Profile →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
