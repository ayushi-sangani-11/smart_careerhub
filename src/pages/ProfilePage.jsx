import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfileApi, updateProfileApi } from '../services/api';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUserState } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    education: '',
    college: '',
    degree: '',
    gradYear: '',
    careerGoal: 'Software Engineer',
    skillsStr: '',
    bio: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfileApi();
      if (res.data.success) {
        const u = res.data.user;
        setFormData({
          name: u.name || '',
          phone: u.phone || '',
          location: u.location || '',
          education: u.education || '',
          college: u.college || '',
          degree: u.degree || '',
          gradYear: u.gradYear || '',
          careerGoal: u.careerGoal || 'Software Engineer',
          skillsStr: (u.skills || []).join(', '),
          bio: u.bio || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      const skillsArray = formData.skillsStr.split(',').map(s => s.trim()).filter(Boolean);
      const res = await updateProfileApi({
        ...formData,
        skills: skillsArray
      });

      if (res.data.success) {
        setSuccess('Profile updated successfully!');
        updateUserState(res.data.user);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading career profile...
      </div>
    );
  }

  const roles = [
    'Software Engineer',
    'MERN Developer',
    'Java Developer',
    'Python Developer',
    'Data Analyst',
    'Data Scientist',
    'UI/UX Designer',
    'Graphic Designer',
    'Cloud Engineer',
    'Cybersecurity Analyst',
    'Digital Marketing',
    'Business Analyst',
    'QA / Testing',
    'HR Specialist',
    'Finance Analyst'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Student Career Profile</h1>
          <p className="text-xs text-slate-400">Manage your educational background, target career goal, and skills</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        {success && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* BASIC INFORMATION */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 415-555-0142"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Seattle, WA"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* ACADEMICS & GOALS */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2">
            Academic Background & Career Goal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Washington State University"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Bachelor of Technology"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Graduation Year</label>
              <input
                type="text"
                name="gradYear"
                value={formData.gradYear}
                onChange={handleChange}
                placeholder="2025"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Target Career Role Goal</label>
            <select
              name="careerGoal"
              value={formData.careerGoal}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              {roles.map((role, idx) => (
                <option key={idx} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SKILLS & BIO */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-2">
            Skills & Professional Summary
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Skills (Comma-separated)</label>
            <input
              type="text"
              name="skillsStr"
              value={formData.skillsStr}
              onChange={handleChange}
              placeholder="Java, SQL, Git, Data Structures, Python, React"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Bio / About Me</label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enthusiastic candidate seeking opportunities in software development, data analytics, or cloud computing..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center space-x-2 shadow-lg shadow-sky-500/20"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
