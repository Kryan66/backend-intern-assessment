import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Loading } from './Loading';

export const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(loginForm.email, loginForm.password);
      showToast('Logged in successfully!', 'success');
      navigate('/posts');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    try {
      await signup(signupForm.fullName, signupForm.email, signupForm.password);
      showToast('Account created successfully!', 'success');
      navigate('/posts');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loading show={loading} />
      <section className="page active">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {activeTab === 'login' ? (
              <div className="auth-form active">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to your account</p>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="login-email">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      placeholder="your@email.com"
                      required
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                      type="password"
                      id="login-password"
                      placeholder="••••••••"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div className="auth-form active">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join our community today</p>
                <form onSubmit={handleSignup}>
                  <div className="form-group">
                    <label htmlFor="signup-name">Full Name</label>
                    <input
                      type="text"
                      id="signup-name"
                      placeholder="John Doe"
                      required
                      value={signupForm.fullName}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-email">Email</label>
                    <input
                      type="email"
                      id="signup-email"
                      placeholder="your@email.com"
                      required
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <input
                      type="password"
                      id="signup-password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      value={signupForm.password}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      value={signupForm.confirmPassword}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                      }
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
      </section>
    </>
  );
};
