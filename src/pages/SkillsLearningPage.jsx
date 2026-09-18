import React, { useState, useEffect } from 'react';
import { getCoursesApi, getSkillsApi } from '../services/api';
import { Award, BookOpen, ExternalLink, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function SkillsLearningPage() {
  const [courses, setCourses] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, skillsRes] = await Promise.all([
        getCoursesApi(),
        getSkillsApi()
      ]);

      if (coursesRes.data.success) {
        setCourses(coursesRes.data.courses || []);
        setMissingSkills(coursesRes.data.missingSkills || []);
      }

      if (skillsRes.data.success) {
        setSkills(skillsRes.data.skills || []);
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
        Loading skills progress & recommended courses...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
          <Award className="w-6 h-6 text-indigo-400" />
          <span>Skills & Learning Recommendations</span>
        </h1>
        <p className="text-xs text-slate-400">Master missing skills required by your target career role with curated learning resources.</p>
      </div>

      {/* SKILL PROGRESS SECTION */}
      <div className="glass-card p-6 sm:p-8 border border-slate-800 space-y-6">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
          Your Core Skill Proficiency Levels
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'React.js', level: 'Advanced', pct: 90, color: 'bg-sky-400' },
            { name: 'JavaScript (ES6+)', level: 'Advanced', pct: 85, color: 'bg-indigo-400' },
            { name: 'MongoDB', level: 'Intermediate', pct: 75, color: 'bg-emerald-400' },
            { name: 'Node.js & Express', level: 'Intermediate', pct: 65, color: 'bg-amber-400' },
            { name: 'Docker Containerization', level: 'Beginner', pct: 25, color: 'bg-rose-400' },
            { name: 'AWS Cloud Services', level: 'Beginner', pct: 20, color: 'bg-purple-400' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-200">{item.name}</span>
                <span className="text-slate-400 text-[11px]">{item.level} ({item.pct}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED COURSES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>Recommended Courses for Skill Gaps</span>
          </h2>
          {missingSkills.length > 0 && (
            <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
              Targeting: {missingSkills.slice(0, 3).join(', ')}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className={`glass-card p-6 border transition-all flex flex-col justify-between ${
                course.isRecommended ? 'border-sky-500/40 bg-sky-950/10 shadow-lg shadow-sky-500/5' : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-sky-400 border border-slate-800">
                    {course.skill}
                  </span>
                  {course.isRecommended && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Recommended</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-100">{course.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{course.description}</p>

                <div className="flex items-center space-x-4 text-[11px] text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration || '4 Weeks'}</span>
                  </span>
                  <span>Level: {course.level}</span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80">
                <a
                  href={course.resourceUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-sky-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start Learning Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
