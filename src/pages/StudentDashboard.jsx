import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStatsApi } from '../services/api';
import ScoreDial from '../components/ScoreDial';
import JobCard from '../components/JobCard';
import {
  Sparkles, Target, Briefcase, Bookmark, CheckCircle2, Award, ArrowRight,
  TrendingUp, AlertCircle, FileText, CheckCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
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
  const skills = data?.skills || [];
  const topJobs = data?.topRecommendedJobs || [];
  const recentApps = data?.recentApplications || [];

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="glass-card p-6 sm:p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Target Role: {stats.careerGoal || 'Full Stack Developer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Your career readiness dashboard is up to date. Explore your Python NLP resume score, skill gaps, and active job recommendations below.
          </p>
        </div>

        <div className="flex items-center space-x-6 relative z-10 shrink-0 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <ScoreDial score={stats.resumeScore || 82} label="Resume Score" size={96} color="#38bdf8" />
          <div className="h-12 w-px bg-slate-800" />
          <ScoreDial score={stats.skillMatchPct || 78} label="Skill Match" size={96} color="#10b981" />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Applications</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{stats.totalApplications || 0}</span>
          <span className="text-[10px] text-slate-500">Tracked in hiring pipeline</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Shortlisted</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 block">{stats.shortlistedCount || 0}</span>
          <span className="text-[10px] text-slate-500">Moving to interviews</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Interviews</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-400 block">{stats.interviewCount || 0}</span>
          <span className="text-[10px] text-slate-500">Scheduled rounds</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Saved Jobs</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400 block">{stats.savedJobsCount || 0}</span>
          <span className="text-[10px] text-slate-500">Bookmarked opportunities</span>
        </div>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Jobs & Recent Applications */}
        <div className="lg:col-span-2 space-y-8">
          {/* TOP RECOMMENDED JOBS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                  <span>Recommended Jobs For You</span>
                </h2>
                <p className="text-xs text-slate-400">AI-ranked opportunities matching your skills & career goal</p>
              </div>
              <Link to="/recommendations" className="text-xs font-bold text-sky-400 hover:underline flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topJobs.length === 0 ? (
                <div className="col-span-2 glass-card p-8 text-center text-slate-400 text-xs">
                  No job recommendations found yet. Try adding more skills or updating your resume.
                </div>
              ) : (
                topJobs.map((job) => (
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

          {/* RECENT APPLICATIONS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white">Recent Applications</h2>
              <Link to="/applications" className="text-xs font-bold text-sky-400 hover:underline">Track All →</Link>
            </div>

            <div className="glass-card overflow-hidden border border-slate-800">
              <div className="divide-y divide-slate-800">
                {recentApps.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No applications submitted yet. Explore jobs to submit your first application.
                  </div>
                ) : (
                  recentApps.map((app) => (
                    <div key={app._id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                      <div>
                        <span className="font-bold text-xs text-slate-100 block">{app.jobId?.title || 'Position'}</span>
                        <span className="text-[11px] text-slate-400 block">{app.jobId?.company} • {app.jobId?.type}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          app.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          app.status === 'Under Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-[10px] text-slate-500">{new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Progress & Missing Skills */}
        <div className="space-y-6">
          {/* SKILL PROGRESS */}
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white">Your Skill Proficiency</h3>
              <Link to="/skills-learning" className="text-[11px] text-sky-400 font-semibold hover:underline">Manage</Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'React.js', pct: 90, color: 'bg-sky-400' },
                { name: 'JavaScript', pct: 85, color: 'bg-indigo-400' },
                { name: 'MongoDB', pct: 75, color: 'bg-emerald-400' },
                { name: 'Node.js & Express', pct: 65, color: 'bg-amber-400' }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>{skill.name}</span>
                    <span>{skill.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full transition-all duration-1000`} style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS TO IMPROVE */}
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-white">Skills To Improve</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              These missing skills were detected during Python gap analysis for {stats.careerGoal || 'Full Stack Developer'}:
            </p>

            <div className="flex flex-wrap gap-2">
              {(skillGap.recommendedSkillsToLearn || ['Docker', 'AWS', 'TypeScript']).map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                  <span>○</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            <Link
              to="/skills-learning"
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 hover:text-white flex items-center justify-center space-x-1 transition-colors mt-2"
            >
              <span>Explore Recommended Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
