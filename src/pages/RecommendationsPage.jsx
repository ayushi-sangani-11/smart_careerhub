import React, { useState, useEffect } from 'react';
import { getRecommendationsApi } from '../services/api';
import JobCard from '../components/JobCard';
import { Sparkles, Briefcase, Target } from 'lucide-react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await getRecommendationsApi();
      if (res.data.success) {
        setRecommendations(res.data.recommendations || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-sky-400" />
          <span>Smart AI Job Recommendations</span>
        </h1>
        <p className="text-xs text-slate-400">Ranked job opportunities computed from your resume skills, career goal, and target matrix.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Computing Python AI job match compatibility scores...
        </div>
      ) : recommendations.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-400 text-xs border border-slate-800">
          No recommendations found. Try adding more skills to your profile or resume.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((job) => (
            <JobCard
              key={job.jobId || job._id}
              job={job}
              matchPercentage={job.matchPercentage}
              recommendationReason={job.recommendationReason}
            />
          ))}
        </div>
      )}
    </div>
  );
}
