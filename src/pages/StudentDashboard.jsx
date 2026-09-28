import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStatsApi, getUserAnalysesApi } from '../services/api';
import ScoreDial from '../components/ScoreDial';
import JobCard from '../components/JobCard';
import {
  Sparkles, Target, Bookmark, CheckCircle2, Award, ArrowRight,
  TrendingUp, AlertCircle, FileText, Briefcase
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboardStatsApi();
      if (res.data.success) {
        setData(res.data);
      }

      const analysesRes = await getUserAnalysesApi();
      if (analysesRes.data.success) {
        setAnalyses(analysesRes.data.analyses || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-3">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs">Loading Smart CareerHub Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const skillGap = data?.skillGap || {};
  const topJobs = data?.topRecommendedJobs || [];
  const recentApps = data?.recentApplications || [];

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="glass-card p-6 sm:p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Preferred Role: {user?.careerGoal || stats.careerGoal || 'Software Engineer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Find opportunities across diverse career fields, run job-specific resume comparisons, and bridge your skill gaps.
          </p>
        </div>

        <div className="flex items-center space-x-6 relative z-10 shrink-0 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <ScoreDial score={stats.resumeScore || 82} label="Master Resume" size={96} color="#38bdf8" />
          <div className="h-12 w-px bg-slate-800" />
          <ScoreDial score={stats.skillMatchPct || 75} label="Avg Job Match" size={96} color="#10b981" />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Jobs Analyzed</span>
            <Sparkles className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{analyses.length || 0}</span>
          <span className="text-[10px] text-slate-500">Job-specific comparisons</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Applied Jobs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 block">{stats.totalApplications || 0}</span>
          <span className="text-[10px] text-slate-500">Applications submitted</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Saved Jobs</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400 block">{stats.savedJobsCount || 0}</span>
          <span className="text-[10px] text-slate-500">Bookmarked listings</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Shortlisted</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-400 block">{stats.shortlistedCount || 0}</span>
          <span className="text-[10px] text-slate-500">Moving forward</span>
        </div>
      </div>

      {/* RECENT JOB SKILL GAP ANALYSES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Recent Job Skill Gap Analyses</span>
            </h2>
            <p className="text-xs text-slate-400">Your resume matched against specific job requirements</p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-sky-400 hover:underline flex items-center space-x-1">
            <span>Analyze Another Job</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyses.length === 0 ? (
            <div className="col-span-3 glass-card p-8 text-center text-slate-400 text-xs space-y-3">
              <p>No job-specific analyses run yet. Open any job posting and click "Analyze My Resume".</p>
              <Link to="/jobs" className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold gradient-btn">
                Browse Jobs Now
              </Link>
            </div>
          ) : (
            analyses.slice(0, 3).map((item) => (
              <div key={item._id} className="glass-card p-5 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.company}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.jobTitle}</h3>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-b border-slate-800/80">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-semibold text-slate-400">Match:</span>
                    <span className={`text-base font-extrabold ${item.matchPercentage >= 70 ? 'text-emerald-400' : 'text-sky-400'}`}>
                      {item.matchPercentage}%
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-rose-400">
                    {item.missingSkills?.length || 0} skill gaps
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={`/skill-gap?analysisId=${item._id}`}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center space-x-1"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <span>Recommended Jobs For You</span>
              </h2>
              <p className="text-xs text-slate-400">Jobs matched across diverse career fields</p>
            </div>
            <Link to="/jobs" className="text-xs font-bold text-sky-400 hover:underline">View All →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topJobs.length === 0 ? (
              <div className="col-span-2 glass-card p-8 text-center text-slate-400 text-xs">
                No job recommendations available yet. Browse jobs directly from the job board.
              </div>
            ) : (
              topJobs.slice(0, 4).map((job) => (
                <JobCard
                  key={job.jobId || job._id}
                  job={job}
                  matchPercentage={job.matchPercentage}
                  recommendationReason={job.recommendationReason}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar: Master Resume & Skills to Learn */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-sky-400">
              <FileText className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-white">Master Resume</h3>
            </div>
            <p className="text-xs text-slate-400">
              Keep your master resume updated. You can compare it against any job posting instantly.
            </p>
            <Link
              to="/resume-upload"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-800 flex items-center justify-center space-x-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Manage Master Resume</span>
            </Link>
          </div>

          {/* SKILLS TO IMPROVE */}
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-white">Target Skills to Learn</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {(skillGap.recommendedSkillsToLearn || ['AWS', 'Docker', 'Power BI', 'Figma']).map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                  <span>○</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            <Link
              to="/skills-learning"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 flex items-center justify-center space-x-1 transition-colors mt-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
