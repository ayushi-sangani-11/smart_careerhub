import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Bookmark, Sparkles, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { saveJobApi, unsaveJobApi } from '../services/api';

export default function JobCard({ job, matchPercentage, onSaveToggle, isSaved: initialIsSaved = false, recommendationReason }) {
  const [saved, setSaved] = useState(initialIsSaved);
  const [saving, setSaving] = useState(false);

  const matchPct = matchPercentage !== undefined ? matchPercentage : (job.matchPercentage || 85);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setSaving(true);
      if (saved) {
        await unsaveJobApi(job._id || job.id);
        setSaved(false);
      } else {
        await saveJobApi({ jobId: job._id || job.id });
        setSaved(true);
      }
      if (onSaveToggle) onSaveToggle(job._id || job.id, !saved);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getMatchColor = (pct) => {
    if (pct >= 85) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (pct >= 70) return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  };

  return (
    <div className="glass-card p-5 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-sky-500/5 group flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-400">{job.company}</span>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors mt-0.5">
              {job.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`px-2.5 py-1 rounded-full text-xs font-extrabold border flex items-center space-x-1 ${getMatchColor(matchPct)}`}>
              <Sparkles className="w-3 h-3" />
              <span>{matchPct}% Match</span>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`p-2 rounded-xl border transition-colors ${
                saved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={saved ? "Unsave Job" : "Save Job"}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Location, Type & Experience metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-3">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.type}</span>
          </span>
          {job.salary && (
            <span className="flex items-center space-x-1 text-slate-300 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{job.salary}</span>
            </span>
          )}
        </div>

        {/* Recommendation explanation if available */}
        {recommendationReason && (
          <div className="mt-3 text-[11px] bg-sky-950/30 text-sky-300 p-2 rounded-lg border border-sky-900/40 flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{recommendationReason}</span>
          </div>
        )}

        {/* Required skills tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(job.requiredSkills || []).slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/80 border border-slate-800 text-slate-300"
            >
              {skill}
            </span>
          ))}
          {(job.requiredSkills || []).length > 5 && (
            <span className="px-2 py-0.5 text-[11px] text-slate-500 font-medium">
              +{(job.requiredSkills || []).length - 5} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
        </span>
        <Link
          to={`/jobs/${job._id || job.id}`}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-sky-600 hover:text-white transition-colors"
        >
          View Job Details →
        </Link>
      </div>
    </div>
  );
}
