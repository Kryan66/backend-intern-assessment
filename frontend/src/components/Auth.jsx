import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Loading } from "./Loading";

export function Auth() {
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!loginForm.password) {
      showToast("Password is required", "error");
      return;
    }

    setLoading(true);

    try {
      await login(loginForm.email.trim(), loginForm.password);
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
          <form onSubmit={handleLogin} noValidate>
            <h2>Welcome Back</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button type="submit">Login</button>
          </form>
        )}

        {activeTab === "signup" && (
          <form onSubmit={handleSignup} noValidate>
            <h2>Create Account</h2>

            <input
              type="text"
              placeholder="Full Name (min 3 characters)"
              value={signupForm.fullName}
              onChange={(e) =>
                setSignupForm({ ...signupForm, fullName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}
