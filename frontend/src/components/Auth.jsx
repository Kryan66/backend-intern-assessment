import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Loading } from "./Loading";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

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
    setLoading(true);

    try {
      await login(loginForm.email, loginForm.password);
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

    if (signupForm.password !== signupForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      await signup(
        signupForm.fullName,
        signupForm.email,
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
      <div className="auth-box">
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
            Signup
          </button>
        </div>

        {loading && <Loading />}

        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              required
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              required
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button type="submit">Login</button>
          </form>
        )}

        {activeTab === "signup" && (
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={signupForm.fullName}
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, fullName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={signupForm.email}
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={signupForm.password}
              required
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              required
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button type="submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
