import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getAnalysisByIdApi, getSkillGapAnalysisApi, getCoursesApi, applyJobApi } from '../services/api';
import ScoreDial from '../components/ScoreDial';
import {
  Target, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Sparkles,
  Info, Send, FileText, Briefcase, Check, AlertCircle, ArrowLeft
} from 'lucide-react';

export default function SkillGapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const analysisId = queryParams.get('analysisId');

  const [analysis, setAnalysis] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Application action state
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysisData();
  }, [analysisId]);

  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      if (analysisId) {
        const res = await getAnalysisByIdApi(analysisId);
        if (res.data.success) {
          setAnalysis(res.data.analysis);
        }
      } else {
        const res = await getSkillGapAnalysisApi();
        if (res.data.success) {
          setAnalysis(res.data.analysis);
        }
      }

      // Fetch matching courses
      const courseRes = await getCoursesApi();
      if (courseRes.data.success) {
        setCourses(courseRes.data.courses || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!analysis?.jobId?._id && !analysis?.jobId) return;
    const jobId = analysis.jobId._id || analysis.jobId;

    setApplying(true);
    setError('');
    try {
      const res = await applyJobApi({ jobId });
      if (res.data.success) {
        setApplied(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading job-specific skill gap analysis report...
      </div>
    );
  }

  // Extract analysis data safely
  const jobTitle = analysis?.jobTitle || analysis?.targetRole || 'Selected Job Position';
  const company = analysis?.company || analysis?.jobId?.company || 'Target Company';
  const matchPct = analysis?.matchPercentage || analysis?.readinessScore || 65;
  const matchedSkills = analysis?.matchedSkills || analysis?.strongSkills || [];
  const missingSkills = analysis?.missingSkills || analysis?.missingRequiredSkills || [];
  const partialSkills = analysis?.partialSkills || [];
  const recommendations = analysis?.recommendations || [];
  const disclaimer = analysis?.disclaimer || 'This match percentage is an AI-assisted skill comparison based on job requirements and resume text, not a guarantee of employment.';

  // Filter recommended courses matching missing skills
  const missingLower = missingSkills.map(s => s.toLowerCase());
  const recommendedCourses = courses.filter(course =>
    missingLower.some(m => m === course.skill.toLowerCase() || course.title.toLowerCase().includes(m))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/jobs" className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Job Board</span>
        </Link>

        <div className="flex items-center space-x-3">
          <Link to="/resume-upload" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
            Update Master Resume
          </Link>
        </div>
      </div>

      {/* REPORT TITLE BANNER */}
      <div className="glass-card p-6 sm:p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Job Skill Gap Analysis Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{jobTitle}</h1>
          <p className="text-xs text-slate-300 font-semibold">{company}</p>

          <p className="text-xs text-slate-400 max-w-xl leading-relaxed pt-1">
            Skill comparison between your uploaded resume and the specific job requirements for <strong>{jobTitle}</strong>.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-center">
          <ScoreDial score={matchPct} label="Job Match" size={135} strokeWidth={12} color={matchPct >= 70 ? "#10b981" : matchPct >= 50 ? "#38bdf8" : "#f59e0b"} />
        </div>
      </div>

      {/* DISCLAIMER BANNER */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs flex items-start space-x-3">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{disclaimer}</span>
      </div>

      {/* MATCHED vs MISSING vs PARTIAL SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Matched Skills */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Matched Skills ({matchedSkills.length})</span>
            </h3>
          </div>

          {matchedSkills.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No skills matched directly from your resume.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                  <span>✓</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-rose-400 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Missing Skills ({missingSkills.length})</span>
            </h3>
          </div>

          {missingSkills.length === 0 ? (
            <p className="text-xs text-emerald-400 font-semibold">Great job! You possess all key required skills for this role.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                  <span>✗</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Partial / Related Skills */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-amber-400 flex items-center space-x-1.5">
              <Target className="w-4 h-4" />
              <span>Partial / Related Skills ({partialSkills.length})</span>
            </h3>
          </div>

          {partialSkills.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No partial skill overlap detected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {partialSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                  <span>~</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SKILLS TO IMPROVE FOR THIS JOB */}
      <div className="glass-card p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Skills to Improve for This Job</span>
        </h3>

        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start space-x-3 text-xs">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-slate-200 font-semibold">{rec}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Required technology in the selected job description.</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No major skill gaps detected for this position.</p>
        )}
      </div>

      {/* RECOMMENDED LEARNING RESOURCES */}
      <div className="glass-card p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Recommended Learning</span>
            </h3>
            <p className="text-xs text-slate-400">Curated learning resources to bridge your missing skills for this job.</p>
          </div>

          <Link to="/skills-learning" className="text-xs font-semibold text-sky-400 hover:underline flex items-center space-x-1">
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recommendedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedCourses.map((course, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Skill: {course.skill}
                  </span>
                  <span className="text-[10px] text-slate-500">{course.duration}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">{course.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{course.description}</p>
                {course.resourceUrl && (
                  <a
                    href={course.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold text-sky-400 hover:text-sky-300"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/40 text-xs text-slate-400 flex items-center justify-between">
            <span>Explore general learning resources and skill certifications.</span>
            <Link to="/skills-learning" className="text-sky-400 font-bold">Browse Catalog →</Link>
          </div>
        )}
      </div>

      {/* FINAL ACTION BAR */}
      <div className="glass-card p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-white">Ready to Apply for {jobTitle}?</h4>
          <p className="text-xs text-slate-400">Make an informed decision and submit your application.</p>
        </div>

        {error && (
          <div className="text-rose-400 text-xs">{error}</div>
        )}

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link
            to="/jobs"
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 text-center"
          >
            Explore Other Jobs
          </Link>

          {applied ? (
            <div className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Application Saved!</span>
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
    </div>
  );
}
