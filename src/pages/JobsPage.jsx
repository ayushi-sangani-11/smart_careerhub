import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getJobsApi } from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Briefcase, Sparkles, Filter } from 'lucide-react';

export default function JobsPage() {
  const locationState = useLocation();
  const queryParams = new URLSearchParams(locationState.search);
  const categoryParam = queryParams.get('category') || '';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryParam);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchJobs();
  }, [search, category, location, type, sort]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobsApi({ search, category, location, type, sort });
      if (res.data.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to load jobs marketplace:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Software Development',
    'Data',
    'Design',
    'Cloud',
    'Cybersecurity',
    'Marketing',
    'Finance',
    'Business',
    'HR',
    'Testing',
    'Other'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Briefcase className="w-6 h-6 text-sky-400" />
          <span>Job Marketplace</span>
        </h1>
        <p className="text-xs text-slate-400">
          Browse jobs freely across all career fields and run AI job-specific resume skill gap analyses.
        </p>
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
              placeholder="Search TCS, Accenture, Software Developer, Data Analyst..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Category filter */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="">All Career Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Job Type filter */}
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="">All Employment Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* QUICK CATEGORY PILLS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
            !category ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          All Fields
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              category === cat ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
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
          <p className="text-xs">Try selecting 'All Fields' or clearing search terms.</p>
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
