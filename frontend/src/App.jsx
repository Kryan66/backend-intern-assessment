import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider, useToast } from "./context/ToastContext";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Auth } from "./components/Auth";
import { Posts } from "./components/Posts";
import { Profile } from "./components/Profile";
import { Admin } from "./components/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastContainer } from "./components/Toast";

function AppContent() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
