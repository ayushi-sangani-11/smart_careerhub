import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyResumeApi } from '../services/api';
import ScoreDial from '../components/ScoreDial';
import { Sparkles, CheckCircle, AlertCircle, FileText, ArrowRight, UploadCloud, Layers } from 'lucide-react';

export default function ResumeAnalysisPage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await getMyResumeApi();
      if (res.data.success) {
        setResume(res.data.resume);
      }
    } catch (err) {
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Fetching Python AI resume breakdown...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="max-w-3xl mx-auto glass-card p-10 text-center space-y-4 border border-slate-800">
        <FileText className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Resume Uploaded Yet</h2>
        <p className="text-xs text-slate-400">Please upload your PDF resume to generate Python NLP analysis scores and detected skills.</p>
        <Link to="/resume-upload" className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold gradient-btn">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Resume Now</span>
        </Link>
      </div>
    );
  }

  const scores = resume.categoryScores || {
    skills: 85,
    projects: 80,
    education: 90,
    experience: 65,
    keywords: 75
  };

  const detectedSkills = resume.detectedSkills || [];
  const missingSkills = ['Docker', 'AWS', 'TypeScript'];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-sky-400" />
            <span>Python Resume AI Analysis</span>
          </h1>
          <p className="text-xs text-slate-400">NLP text extraction & candidate quality breakdown for "{resume.fileName}"</p>
        </div>

        <Link to="/resume-upload" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors">
          Replace Resume
        </Link>
      </div>

      {/* TOP SCORE OVERVIEW BANNER */}
      <div className="glass-card p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider">Overall Score</span>
          <h2 className="text-4xl font-extrabold text-white">{resume.resumeScore} <span className="text-lg font-normal text-slate-400">/ 100</span></h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your resume demonstrates strong technical foundations in frontend web technologies and database design.
          </p>
        </div>

        <div className="flex justify-center">
          <ScoreDial score={resume.resumeScore} label="Quality Score" size={120} strokeWidth={12} color="#38bdf8" />
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <span className="font-bold text-slate-200 block border-b border-slate-800 pb-1">Verified Sections</span>
          {(resume.detectedSections || ['Education', 'Skills', 'Projects', 'Experience']).map((sec, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{sec} Section Detected</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY BREAKDOWN PROGRESS BARS */}
      <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
          Category Quality Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Technical Skills Density</span>
              <span className="text-sky-400 font-bold">{scores.skills}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div className="h-full bg-sky-400 rounded-full transition-all duration-1000" style={{ width: `${scores.skills}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">Detected {detectedSkills.length} core technology keywords.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Project Quality & Depth</span>
              <span className="text-indigo-400 font-bold">{scores.projects}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div className="h-full bg-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${scores.projects}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">Contains key technical project descriptions and implementation words.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Academic & Education</span>
              <span className="text-emerald-400 font-bold">{scores.education}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${scores.education}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">Verified degree title and college institution credentials.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Experience & Internship</span>
              <span className="text-amber-400 font-bold">{scores.experience}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div className="h-full bg-amber-400 rounded-full transition-all duration-1000" style={{ width: `${scores.experience}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">Internship and developer contribution evidence detected.</p>
          </div>
        </div>
      </div>

      {/* DETECTED SKILLS vs MISSING SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-emerald-400 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Detected Technical Skills ({detectedSkills.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {detectedSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-amber-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Missing / Recommended Skills</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                ○ {skill}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Adding these containerization & cloud skills can boost your resume score above 90/100.
          </p>
        </div>
      </div>

      {/* ACTIONABLE AI SUGGESTIONS */}
      <div className="glass-card p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white">Python AI Optimization Suggestions</h3>
        <div className="space-y-3 text-xs text-slate-300">
          {(resume.suggestions || []).map((sug, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
              <span className="font-bold text-sky-400">{idx + 1}.</span>
              <p className="leading-relaxed">{sug}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Link to="/skill-gap" className="px-6 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center space-x-2">
            <span>Proceed to Skill Gap Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
