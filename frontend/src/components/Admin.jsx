import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { Loading } from './Loading';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const loadUsers = async (page = 1) => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsers(page);
      setUsers(data.users || data);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    try {
      await adminAPI.activateUser(id);
      showToast('User activated successfully!', 'success');
      loadUsers(currentPage);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;

    try {
      await adminAPI.deactivateUser(id);
      showToast('User deactivated successfully!', 'success');
      loadUsers(currentPage);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <>
      <Loading show={loading} />
      <section className="page active">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-container">
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>{totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{activeUsers}</h3>
                <p>Active Users</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-info">
                <h3>{inactiveUsers}</h3>
                <p>Inactive Users</p>
              </div>
            </div>
          </div>

          <div className="admin-table-container">
            <div className="table-header">
              <h2>Users Management</h2>
              <input
                type="text"
                className="search-input"
                placeholder="Search users..."
              />
            </div>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => {
                      const date = new Date(user.createdAt || user.created_at).toLocaleDateString();
                      return (
                        <tr key={user._id}>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge role-${user.role}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-badge status-${user.isActive ? 'active' : 'inactive'}`}
                            >
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>{date}</td>
                          <td>
                            {user.isActive ? (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeactivate(user._id)}
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleActivate(user._id)}
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
