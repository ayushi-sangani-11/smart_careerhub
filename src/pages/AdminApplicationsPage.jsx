import React, { useState, useEffect } from 'react';
import { getAllApplicationsAdminApi, updateApplicationStatusAdminApi } from '../services/api';
import { CheckCircle2, User, Briefcase, Edit3, Send } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getAllApplicationsAdminApi();
      if (res.data.success) {
        setApplications(res.data.applications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStatusModal = (app) => {
    setSelectedApp(app);
    setStatus(app.status);
    setNotes(app.notes || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    try {
      const res = await updateApplicationStatusAdminApi(selectedApp._id, { status, notes });
      if (res.data.success) {
        setApplications(applications.map(a => a._id === selectedApp._id ? { ...a, status, notes } : a));
        setSelectedApp(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <span>Candidate Applications Review</span>
        </h1>
        <p className="text-xs text-slate-400">Review student job applications, examine candidate skills, and update hiring pipeline statuses.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading candidate applications...
        </div>
      ) : (
        <div className="glass-card border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Job Applied</th>
                  <th className="px-4 py-3">Education & Skills</th>
                  <th className="px-4 py-3">Current Status</th>
                  <th className="px-4 py-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.map((app) => {
                  const candidate = app.userId || {};
                  const job = app.jobId || {};

                  return (
                    <tr key={app._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-100 block">{candidate.name || 'Candidate'}</span>
                        <span className="text-slate-400 text-[11px]">{candidate.email}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-sky-400 block">{job.title || 'Position'}</span>
                        <span className="text-slate-400 text-[11px]">{job.company}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="block text-slate-300">{candidate.education || 'B.Tech'}</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {(candidate.skills || []).slice(0, 3).map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-900 text-slate-400">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-sky-500/10 text-sky-400 border-sky-500/30">
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleOpenStatusModal(app)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-sky-600 hover:text-white text-[11px] font-semibold transition-colors"
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">
              Update Hiring Status: {selectedApp.userId?.name}
            </h3>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Application Pipeline Stage</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Admin Feedback Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Passed initial resume review. Technical interview scheduled for next week..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold gradient-btn"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
