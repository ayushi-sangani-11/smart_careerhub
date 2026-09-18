import React, { useState, useEffect } from 'react';
import { getSkillsApi, getCoursesApi, createSkillApi, createCourseApi } from '../services/api';
import { Layers, BookOpen, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function AdminSkillsCoursesPage() {
  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', level: 'Intermediate', importance: 8 });
  const [courseForm, setCourseForm] = useState({ title: '', skill: 'Docker', level: 'Beginner', description: '', duration: '4 Weeks', resourceUrl: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sRes, cRes] = await Promise.all([getSkillsApi(), getCoursesApi()]);
      if (sRes.data.success) setSkills(sRes.data.skills || []);
      if (cRes.data.success) setCourses(cRes.data.courses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await createSkillApi(skillForm);
      if (res.data.success) {
        setSkills([...skills, res.data.skill]);
        setSkillForm({ name: '', category: 'Frontend', level: 'Intermediate', importance: 8 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await createCourseApi(courseForm);
      if (res.data.success) {
        setCourses([...courses, res.data.course]);
        setCourseForm({ title: '', skill: 'Docker', level: 'Beginner', description: '', duration: '4 Weeks', resourceUrl: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Layers className="w-6 h-6 text-purple-400" />
          <span>Skill Taxonomy & Learning Resources Management</span>
        </h1>
        <p className="text-xs text-slate-400">Manage technical skill catalogs and learning resources for student gap analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ADD SKILL FORM & SKILLS CATALOG */}
        <div className="space-y-6">
          <form onSubmit={handleAddSkill} className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-sky-400" />
              <span>Add Skill To Taxonomy</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="Kubernetes"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Tools & Workflow">Tools & Workflow</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl font-bold gradient-btn text-xs">
              Add Skill to Taxonomy
            </button>
          </form>

          {/* SKILLS LIST */}
          <div className="glass-card p-6 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-xs text-slate-300 uppercase tracking-wider">Catalog Skills ({skills.length})</h4>
            <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
              {skills.map((s) => (
                <span key={s._id} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                  {s.name} <span className="text-[9px] text-slate-500">({s.category})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ADD COURSE FORM & COURSES CATALOG */}
        <div className="space-y-6">
          <form onSubmit={handleAddCourse} className="glass-card p-6 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Add Recommended Learning Course</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="Mastering Docker & Containerization"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Target Skill</label>
                  <input
                    type="text"
                    required
                    value={courseForm.skill}
                    onChange={(e) => setCourseForm({ ...courseForm, skill: e.target.value })}
                    placeholder="Docker"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Resource URL</label>
                  <input
                    type="text"
                    value={courseForm.resourceUrl}
                    onChange={(e) => setCourseForm({ ...courseForm, resourceUrl: e.target.value })}
                    placeholder="https://docker.com/getting-started"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Description</label>
                <textarea
                  rows={2}
                  required
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Containerization fundamentals and multi-container orchestration..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl font-bold gradient-btn text-xs">
              Add Learning Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
