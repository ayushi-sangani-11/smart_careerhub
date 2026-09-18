import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyResumeApi, uploadResumeApi, deleteResumeApi } from '../services/api';
import { FileText, UploadCloud, Trash2, Sparkles, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await getMyResumeApi();
      if (res.data.success) {
        setResume(res.data.resume);
      }
    } catch (err) {
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.name.toLowerCase().endsWith('.pdf') && selected.type !== 'application/pdf') {
        setError('Please select a valid PDF file.');
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5 MB limit.');
        return;
      }
      setError('');
      setFile(selected);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return setError('Please select a PDF resume file to upload.');
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadResumeApi(formData);
      if (res.data.success) {
        setSuccess('Resume uploaded & analyzed by Python NLP service!');
        setResume(res.data.resume);
        setTimeout(() => navigate('/resume-analysis'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Resume upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your uploaded resume?')) {
      try {
        await deleteResumeApi();
        setResume(null);
        setFile(null);
        setSuccess('Resume deleted.');
      } catch (err) {
        setError(err.message || 'Failed to delete resume');
      }
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Checking resume status...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Upload Resume</h1>
        <p className="text-xs text-slate-400">Upload your PDF resume to trigger Python FastAPI NLP parsing, skill extraction, and scoring.</p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* UPLOAD ZONE */}
      <div className="glass-card p-8 border border-slate-800 space-y-6 text-center">
        <div className="border-2 border-dashed border-slate-700 hover:border-sky-500/60 rounded-2xl p-8 transition-colors bg-slate-900/40 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">Select PDF Resume File</h3>
            <p className="text-xs text-slate-400 mt-1">Supports PDF format (Max size: 5MB)</p>
          </div>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            id="resumeInput"
            className="hidden"
          />

          <label
            htmlFor="resumeInput"
            className="inline-block px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            {file ? file.name : "Choose PDF File"}
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-8 py-3 rounded-xl text-xs font-bold gradient-btn flex items-center space-x-2 shadow-lg shadow-sky-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{uploading ? 'Analyzing with Python AI...' : 'Analyze Resume Now'}</span>
            </button>
          </div>
        )}
      </div>

      {/* CURRENT RESUME PREVIEW STATUS */}
      {resume && (
        <div className="glass-card p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{resume.fileName}</h4>
                <p className="text-[11px] text-slate-400">
                  Parsed on {new Date(resume.updatedAt || resume.createdAt).toLocaleDateString()} • Score: {resume.resumeScore}/100
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/resume-analysis')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500/25 transition-colors flex items-center space-x-1"
              >
                <span>View Full Analysis</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={handleDelete}
                className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
                title="Delete Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
            <span className="font-semibold text-slate-300 block">Detected Technical & Soft Skills:</span>
            <div className="flex flex-wrap gap-1.5">
              {(resume.detectedSkills || []).map((skill, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-950/40 border border-sky-500/30 text-sky-300">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
