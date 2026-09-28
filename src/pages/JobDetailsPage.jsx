import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobByIdApi, applyJobApi, saveJobApi, unsaveJobApi, analyzeJobResumeApi, getMyResumeApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ScoreDial from '../components/ScoreDial';
import {
  Briefcase, MapPin, DollarSign, Sparkles, AlertCircle,
  Bookmark, ArrowLeft, Send, Check, UploadCloud, FileText, GraduationCap, X
} from 'lucide-react';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedResume, setSavedResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // Application state
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Resume Analysis Modal state
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [file, setFile] = useState(null);
  const [useSaved, setUseSaved] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchJobDetails();
    if (isAuthenticated) {
      checkSavedResume();
    }
  }, [id, isAuthenticated]);

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

  const checkSavedResume = async () => {
    try {
      const res = await getMyResumeApi();
      if (res.data.success && res.data.resume) {
        setSavedResume(res.data.resume);
        setUseSaved(true);
      } else {
        setUseSaved(false);
      }
    } catch (err) {
      setSavedResume(null);
      setUseSaved(false);
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

  const handleOpenAnalyzeModal = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    setShowAnalysisModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.name.toLowerCase().endsWith('.pdf') && selected.type !== 'application/pdf') {
        setModalError('Please select a valid PDF file.');
        return;
      }
      setModalError('');
      setFile(selected);
    }
  };

  const handleRunJobAnalysis = async (e) => {
    e.preventDefault();
    if (!useSaved && !file) {
      return setModalError('Please choose a PDF resume file to upload.');
    }

    setAnalyzing(true);
    setModalError('');

    try {
      let payload;
      if (!useSaved && file) {
        payload = new FormData();
        payload.append('file', file);
      } else {
        payload = { useSaved: true };
      }

      const res = await analyzeJobResumeApi(id, payload);
      if (res.data.success) {
        const analysisId = res.data.analysis._id;
        setShowAnalysisModal(false);
        navigate(`/skill-gap?analysisId=${analysisId}`);
      }
    } catch (err) {
      setModalError(err.response?.data?.message || err.message || 'Skill gap analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading job specification & candidate match details...
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

  const matchPct = matchDetails?.matchPercentage || 75;
  const matchedSkills = matchDetails?.matchedRequired || [];
  const missingSkills = matchDetails?.missingRequired || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link to="/jobs" className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Jobs</span>
      </Link>

      {/* HEADER CARD */}
      <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[11px] font-bold border border-sky-500/20">
                {job.category || 'Career Role'}
              </span>
              <span className="text-xs font-bold text-slate-400">{job.company}</span>
            </div>
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
              {job.education && (
                <span className="flex items-center space-x-1 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                  <span>{job.education}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* MAIN ACTION: ANALYZE MY RESUME */}
            <button
              onClick={handleOpenAnalyzeModal}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze My Resume</span>
            </button>

            <button
              onClick={handleSaveToggle}
              className={`p-3 rounded-xl border transition-colors ${
                isSaved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Save Job"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-emerald-400' : ''}`} />
            </button>

            {applied ? (
              <div className="px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center space-x-1.5">
                <Check className="w-4 h-4" />
                <span>Applied</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20"
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

      {/* JOB MATCH PREVIEW BANNER */}
      <div className="glass-card p-6 border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Job-Specific Resume Comparison</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">Compare Your Resume with {job.company}</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            See exactly which skills match, which skills are missing, and get AI learning recommendations specifically for this {job.title} position.
          </p>
          <div className="pt-2">
            <button
              onClick={handleOpenAnalyzeModal}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30 transition-colors inline-flex items-center space-x-1.5"
            >
              <span>Run Detailed Skill Gap Analysis</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="shrink-0">
          <ScoreDial score={matchPct} label="Quick Match" size={110} strokeWidth={10} color="#38bdf8" />
        </div>
      </div>

      {/* TWO COLUMN SPECIFICATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Job Description */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Job Description</h3>
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

        {/* Right Sidebar Required Skills */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Required Position Skills
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {(job.requiredSkills || []).map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-sky-300 border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>

            {job.preferredSkills && job.preferredSkills.length > 0 && (
              <div className="pt-3 space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Preferred / Bonus Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.preferredSkills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* JOB-SPECIFIC RESUME ANALYSIS MODAL */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 border border-slate-700 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-sky-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Job Skill Gap Analysis</h3>
              </div>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400">Targeting:</span>
              <h4 className="text-sm font-extrabold text-white">{job.title} at {job.company}</h4>
            </div>

            {modalError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleRunJobAnalysis} className="space-y-5">
              {/* Option 1: Saved Master Resume */}
              {savedResume && (
                <div
                  onClick={() => setUseSaved(true)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    useSaved ? 'bg-sky-500/10 border-sky-500/50 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-sky-400" />
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">Use Saved Resume</span>
                        <span className="text-[11px] text-slate-400">{savedResume.fileName}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="resumeChoice"
                      checked={useSaved}
                      onChange={() => setUseSaved(true)}
                      className="accent-sky-500"
                    />
                  </div>
                </div>
              )}

              {/* Option 2: Upload New PDF Resume */}
              <div
                onClick={() => setUseSaved(false)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                  !useSaved ? 'bg-sky-500/10 border-sky-500/50 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UploadCloud className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-200">Upload New PDF Resume</span>
                  </div>
                  <input
                    type="radio"
                    name="resumeChoice"
                    checked={!useSaved}
                    onChange={() => setUseSaved(false)}
                    className="accent-sky-500"
                  />
                </div>

                {!useSaved && (
                  <div className="pt-2">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      id="jobResumeFile"
                      className="hidden"
                    />
                    <label
                      htmlFor="jobResumeFile"
                      className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700"
                    >
                      {file ? file.name : 'Choose PDF File'}
                    </label>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnalysisModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={analyzing}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold gradient-btn flex items-center space-x-2 shadow-lg shadow-sky-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{analyzing ? 'Comparing with AI...' : 'Analyze Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
