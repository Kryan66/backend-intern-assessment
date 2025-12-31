import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { Loading } from './Loading';

export const Profile = () => {
  const { user, loadUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userAPI.updateProfile(profileForm.fullName, profileForm.email);
      await loadUser();
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    try {
      await userAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      showToast('Password changed successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loading show={true} />;
  }

  return (
    <>
      <Loading show={loading} />
      <section className="page active">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span>{user.fullName?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="profile-info">
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
                <span className="profile-badge">{user.role}</span>
              </div>
            </div>

            <div className="profile-tabs">
              <button
                className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                Profile Info
              </button>
              <button
                className={`profile-tab ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </button>
            </div>

            {activeTab === 'info' ? (
              <div className="profile-content active">
                <form onSubmit={handleUpdateProfile}>
                  <div className="form-group">
                    <label htmlFor="profile-name-input">Full Name</label>
                    <input
                      type="text"
                      id="profile-name-input"
                      required
                      value={profileForm.fullName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="profile-email-input">Email</label>
                    <input
                      type="email"
                      id="profile-email-input"
                      required
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </form>
              </div>
            ) : (
              <div className="profile-content active">
                <form onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input
                      type="password"
                      id="current-password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input
                      type="password"
                      id="new-password"
                      required
                      minLength={6}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      required
                      minLength={6}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Change Password
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
