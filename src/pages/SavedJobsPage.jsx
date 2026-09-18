import React, { useState, useEffect } from 'react';
import { getSavedJobsApi } from '../services/api';
import JobCard from '../components/JobCard';
import { Bookmark, Briefcase } from 'lucide-react';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await getSavedJobsApi();
      if (res.data.success) {
        setSavedJobs(res.data.savedJobs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToggle = (jobId, isSavedNow) => {
    if (!isSavedNow) {
      setSavedJobs(savedJobs.filter(item => (item.jobId?._id || item.jobId?.id) !== jobId));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Bookmark className="w-6 h-6 text-emerald-400" />
          <span>Saved Jobs</span>
        </h1>
        <p className="text-xs text-slate-400">Bookmarked opportunities saved for later review and application.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading saved jobs...
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-400 space-y-3 border border-slate-800">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No saved jobs yet</h3>
          <p className="text-xs">Explore recommended jobs to find and bookmark your next opportunity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((item) => (
            item.jobId && (
              <JobCard
                key={item._id}
                job={item.jobId}
                isSaved={true}
                onSaveToggle={handleSaveToggle}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}
