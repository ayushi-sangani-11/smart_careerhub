import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplicationsApi } from '../services/api';
import { CheckCircle2, Clock, Calendar, Briefcase, FileText, ChevronRight } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getMyApplicationsApi();
      if (res.data.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Shortlisted': return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'Interview': return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Under Review': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Rejected': return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-sky-400" />
          <span>Application Tracker</span>
        </h1>
        <p className="text-xs text-slate-400">Track your hiring pipeline stage, review notes, and interview progress.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading application pipeline...
        </div>
      ) : applications.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-400 space-y-3 border border-slate-800">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No active applications</h3>
          <p className="text-xs">Browse jobs to submit your first application.</p>
          <Link to="/jobs" className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold gradient-btn mt-2">
            Explore Jobs Marketplace
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = app.jobId || {};
            const currentIdx = statusSteps.indexOf(app.status);

            return (
              <div key={app._id} className="glass-card p-6 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">{job.company}</span>
                    <h3 className="text-base font-bold text-white">{job.title || 'Position'}</h3>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{job.location} • {job.type}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* TIMELINE VISUAL PROGRESSION */}
                {app.status !== 'Rejected' && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between relative">
                      {statusSteps.map((step, idx) => {
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={step} className="flex flex-col items-center space-y-1 relative z-10">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                              isCurrent
                                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/40'
                                : isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className={`text-[10px] font-medium ${isCurrent ? 'text-sky-400 font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-600'}`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {app.notes && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400 block mb-0.5">Admin Note:</span>
                    <p>{app.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
