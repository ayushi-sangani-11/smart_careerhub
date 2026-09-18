import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import ProfilePage from './pages/ProfilePage';
import ResumePage from './pages/ResumePage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import SkillGapPage from './pages/SkillGapPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import SkillsLearningPage from './pages/SkillsLearningPage';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminJobsPage from './pages/AdminJobsPage';
import AdminSkillsCoursesPage from './pages/AdminSkillsCoursesPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';

// Protected Route Wrapper for Authenticated Users
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-slate-400 text-xs">
        Authenticating...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? "/admin/dashboard" : "/dashboard"} replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Protected Routes inside DashboardLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><StudentDashboard /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><ProfilePage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-upload"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><ResumePage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-analysis"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><ResumeAnalysisPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill-gap"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><SkillGapPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><RecommendationsPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><SavedJobsPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><ApplicationsPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills-learning"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout><SkillsLearningPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Jobs Marketplace (Accessible to both Guest & Logged In) */}
          <Route path="/jobs" element={<DashboardLayout><JobsPage /></DashboardLayout>} />
          <Route path="/jobs/:id" element={<DashboardLayout><JobDetailsPage /></DashboardLayout>} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminDashboard /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminUsersPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminJobsPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminSkillsCoursesPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminSkillsCoursesPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout><AdminApplicationsPage /></DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
