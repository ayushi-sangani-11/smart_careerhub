import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSkillGapAnalysisApi } from '../services/api';
import ScoreDial from '../components/ScoreDial';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Award, BookOpen, Sparkles } from 'lucide-react';

export default function SkillGapPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillGap();
  }, []);

  const fetchSkillGap = async () => {
    try {
      setLoading(true);
      const res = await getSkillGapAnalysisApi();
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Performing Python skill gap matrix calculations...
      </div>
    );
  }

  const analysis = data?.analysis || {
    targetRole: 'Full Stack Developer',
    readinessScore: 78,
    strongSkills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
    missingRequiredSkills: ['Git', 'Docker'],
    missingPreferredSkills: ['AWS', 'TypeScript', 'Next.js'],
    guidanceAdvice: 'You already have a strong foundation in frontend and database technologies. Focus next on backend architecture, Git version control, and Docker containerization.'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <Target className="w-6 h-6 text-sky-400" />
            <span>Skill Gap & Career Readiness</span>
          </h1>
          <p className="text-xs text-slate-400">Benchmarking detected skills against target role: <strong className="text-sky-300">{analysis.targetRole}</strong></p>
        </div>

        <Link to="/profile" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
          Change Career Goal Role
        </Link>
      </div>

      {/* READINESS HEADER BANNER */}
      <div className="glass-card p-8 border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{analysis.readinessScore}% Career Readiness</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Target Role: {analysis.targetRole}</h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            "{analysis.guidanceAdvice}"
          </p>
        </div>

        <div className="shrink-0">
          <ScoreDial score={analysis.readinessScore} label="Readiness" size={130} strokeWidth={12} color="#10b981" />
        </div>
      </div>

      {/* STRONG SKILLS vs SKILLS TO IMPROVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Skills */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Strong Skills You Possess ({(analysis.strongSkills || []).length})</span>
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            Skills detected from your resume or profile matching role requirements:
          </p>

          <div className="flex flex-wrap gap-2">
            {(analysis.strongSkills || []).map((skill, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
                <span>✓</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Skills to Improve */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-amber-400 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Skills To Improve / Learn</span>
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            Prerequisites required or preferred by hiring companies for {analysis.targetRole}:
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Required Core Missing:</span>
              <div className="flex flex-wrap gap-2">
                {(analysis.missingRequiredSkills || []).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5">
                    <span>⚠</span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Preferred Bonus Skills:</span>
              <div className="flex flex-wrap gap-2">
                {(analysis.missingPreferredSkills || []).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS & NEXT STEPS */}
      <div className="glass-card p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white">Bridge Your Skill Gap</h3>
            <p className="text-xs text-slate-400">Explore curated courses mapped directly to your missing required skills.</p>
          </div>

          <Link to="/skills-learning" className="px-6 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>View Recommended Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
