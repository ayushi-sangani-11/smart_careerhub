import React, { useState, useEffect } from 'react';
import { getAdminStatsApi } from '../services/api';
import { Shield, Users, Briefcase, FileText, CheckCircle2, TrendingUp, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getAdminStatsApi();
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
        Loading platform administrator analytics...
      </div>
    );
  }

  const stats = data?.stats || {};
  const categoryData = data?.categoryDistribution || [];
  const topSkills = data?.topSkills || [];
  const statusDist = data?.statusDistribution || {};

  const COLORS = ['#38bdf8', '#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#a855f7'];

  const statusPieData = Object.keys(statusDist).map(key => ({
    name: key,
    value: statusDist[key]
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Shield className="w-6 h-6 text-indigo-400" />
          <span>Admin Analytics & Platform Overview</span>
        </h1>
        <p className="text-xs text-slate-400">Monitor platform growth, user engagement, job postings, and application pipelines.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Students</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-white block">{stats.totalUsers || 0}</span>
          <span className="text-[10px] text-slate-500">Registered users</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Jobs</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-400 block">{stats.totalJobs || 0}</span>
          <span className="text-[10px] text-slate-500">{stats.activeJobs || 0} Active postings</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Applications</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 block">{stats.totalApplications || 0}</span>
          <span className="text-[10px] text-slate-500">Submitted by students</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Resumes Parsed</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400 block">{stats.totalResumes || 0}</span>
          <span className="text-[10px] text-slate-500">Python NLP processed</span>
        </div>

        <div className="glass-card p-5 border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Platform Health</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xl font-extrabold text-emerald-400 block">100% Online</span>
          <span className="text-[10px] text-slate-500">Microservice active</span>
        </div>
      </div>

      {/* RECHARTS VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Jobs by Category Bar Chart */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white">Jobs Distribution by Category</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Hiring Pipeline Pie Chart */}
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-white">Applications Hiring Pipeline Breakdown</h3>
          <div className="h-64 w-full flex items-center justify-center">
            {statusPieData.length === 0 ? (
              <span className="text-xs text-slate-500">No application data yet</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
