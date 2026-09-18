import React, { useState, useEffect } from 'react';
import { getJobsApi } from '../services/api';
import JobCard from '../components/JobCard';
import { Search, Filter, Briefcase, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    fetchJobs();
  }, [search, location, type, sort]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobsApi({ search, location, type, sort });
      if (res.data.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to load jobs marketplace:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-sky-400" />
          <span>Job Marketplace & AI Match</span>
        </h1>
        <p className="text-xs text-slate-400">Discover Software Engineering & Tech opportunities scored against your candidate profile.</p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="glass-card p-4 sm:p-6 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search text */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, company, or skill..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Location filter */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Filter location (Remote, SF...)"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Job Type filter */}
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* JOBS GRID */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Searching jobs database...
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-400 space-y-3 border border-slate-800">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No jobs found matching your filters</h3>
          <p className="text-xs">Try clearing search inputs or exploring all job categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
