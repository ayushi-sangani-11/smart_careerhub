import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobByIdApi, applyJobApi, saveJobApi, unsaveJobApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ScoreDial from '../components/ScoreDial';
import {
  Briefcase, MapPin, DollarSign, Calendar, Sparkles, CheckCircle, AlertCircle,
  Bookmark, ArrowLeft, Send, Check
} from 'lucide-react';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const res = await getJobByIdApi(id);
      if (res.data.success) {
        setJob(res.data.job);
        setMatchDetails(res.data.matchDetails);
        setIsSaved(res.data.isSaved);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    setApplying(true);
    setError('');
    try {
      const res = await applyJobApi({ jobId: id, notes });
      if (res.data.success) {
        setApplied(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!isAuthenticated) return navigate('/login');
    try {
      if (isSaved) {
        await unsaveJobApi(id);
        setIsSaved(false);
      } else {
        await saveJobApi({ jobId: id });
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading job specification & candidate match score...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Job position not found.
      </div>
    );
  }

  const matchPct = matchDetails?.matchPercentage || 88;
  const matchedSkills = matchDetails?.matchedRequired || [];
  const missingSkills = matchDetails?.missingRequired || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link to="/jobs" className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Job Marketplace</span>
      </Link>

      {/* HEADER CARD */}
      <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">{job.company}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span>{job.type}</span>
              </span>
              {job.salary && (
                <span className="flex items-center space-x-1 text-slate-200 font-semibold">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{job.salary}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleSaveToggle}
              className={`p-3 rounded-xl border transition-colors ${
                isSaved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-emerald-400' : ''}`} />
            </button>

            {applied ? (
              <div className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Application Submitted!</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex-1 sm:flex-initial px-8 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20"
              >
                <Send className="w-4 h-4" />
                <span>{applying ? 'Submitting...' : 'Apply Now'}</span>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* CANDIDATE SKILL MATCH BREAKDOWN BANNER */}
      <div className="glass-card p-6 border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Job Match Breakdown</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">{matchPct}% Skill Compatibility</h3>
          <p className="text-xs text-slate-300">
            Matching <strong className="text-emerald-400">{matchedSkills.length}</strong> of <strong className="text-slate-200">{job.requiredSkills?.length || 0}</strong> required position skills.
          </p>
        </div>

        <div className="shrink-0">
          <ScoreDial score={matchPct} label="Match Score" size={110} strokeWidth={10} color="#38bdf8" />
        </div>
      </div>

      {/* TWO COLUMN SPECIFICATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Job Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Job Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{job.description}</p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="space-y-2 pt-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Key Responsibilities</h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed">{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Required Skills & Match */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Required Prerequisites
            </h3>

            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block">Matching Your Profile:</span>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {missingSkills.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Missing Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      ✗ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
