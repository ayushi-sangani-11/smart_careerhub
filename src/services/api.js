import axios from 'axios';

// Backend API URL from Vercel environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, '')}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to attach JWT Bearer token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const loginApi = (data) => API.post('/auth/login', data);
export const registerApi = (data) => API.post('/auth/register', data);
export const getMeApi = () => API.get('/auth/me');

// Profile & Dashboard APIs
export const getProfileApi = () => API.get('/users/profile');
export const updateProfileApi = (data) => API.put('/users/profile', data);
export const getDashboardStatsApi = () => API.get('/users/dashboard');

// Resume APIs
export const uploadResumeApi = (formData) =>
  API.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getMyResumeApi = () => API.get('/resumes/my-resume');
export const deleteResumeApi = () => API.delete('/resumes/my-resume');

// Job APIs
export const getJobsApi = (params) => API.get('/jobs', { params });
export const getJobByIdApi = (id) => API.get(`/jobs/${id}`);
export const getRecommendationsApi = () => API.get('/jobs/recommendations');
export const createJobApi = (data) => API.post('/jobs', data);
export const updateJobApi = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJobApi = (id) => API.delete(`/jobs/${id}`);

// Application APIs
export const applyJobApi = (data) =>
  API.post('/applications/apply', data);

export const getMyApplicationsApi = () =>
  API.get('/applications/my-applications');

export const getAllApplicationsAdminApi = () =>
  API.get('/applications/admin/all');

export const updateApplicationStatusAdminApi = (id, data) =>
  API.put(`/applications/admin/${id}/status`, data);

// Saved Job APIs
export const saveJobApi = (data) =>
  API.post('/saved-jobs/save', data);

export const unsaveJobApi = (jobId) =>
  API.delete(`/saved-jobs/${jobId}`);

export const getSavedJobsApi = () =>
  API.get('/saved-jobs');

// Skills & Courses APIs
export const getSkillsApi = (params) =>
  API.get('/skills', { params });

export const getSkillGapAnalysisApi = () =>
  API.get('/skills/gap-analysis');

export const getCoursesApi = () =>
  API.get('/courses');

export const createSkillApi = (data) =>
  API.post('/skills', data);

export const createCourseApi = (data) =>
  API.post('/courses', data);

// Notification APIs
export const getNotificationsApi = () =>
  API.get('/notifications');

export const markNotificationReadApi = (id) =>
  API.put(`/notifications/${id}/read`);

export const markAllNotificationsReadApi = () =>
  API.put('/notifications/read-all');

// Admin APIs
export const getAdminStatsApi = () =>
  API.get('/admin/stats');

export const getAdminUsersApi = () =>
  API.get('/admin/users');

export const toggleUserStatusApi = (id) =>
  API.put(`/admin/users/${id}/toggle-status`);

export const deleteUserApi = (id) =>
  API.delete(`/admin/users/${id}`);

export default API;
