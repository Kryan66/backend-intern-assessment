import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Loading } from "./Loading";

export const Auth = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Trim and validate email
    const email = loginForm.email.trim();
    if (!email) {
      showToast("Email is required", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!loginForm.password) {
      showToast("Password is required", "error");
      return;
    }

    setLoading(true);

    try {
      await login(email, loginForm.password);
      showToast("Logged in successfully", "success");
      navigate("/posts");
    } catch (err) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate full name
    if (!signupForm.fullName || signupForm.fullName.trim().length < 3) {
      showToast("Full name must be at least 3 characters", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupForm.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    // Validate password
    if (!signupForm.password || signupForm.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    // Validate password confirmation
    if (signupForm.password !== signupForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      await signup(
        signupForm.fullName.trim(),
        signupForm.email.trim(),
        signupForm.password
      );
      showToast("Account created successfully", "success");
      navigate("/posts");
    } catch (err) {
      showToast(err.message || "Signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {loading && <Loading />}

        {activeTab === "login" && (
          <div className="auth-form active">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to your account</p>
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="text"
                  id="login-email"
                  placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        )}

        {activeTab === "signup" && (
          <div className="auth-form active">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join our community today</p>
            <form onSubmit={handleSignup} noValidate>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  placeholder="John Doe"
                  value={signupForm.fullName}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, fullName: e.target.value })
                  }
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="text"
                  id="signup-email"
                  placeholder="your@email.com"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="•••••••• (min 6 characters)"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
