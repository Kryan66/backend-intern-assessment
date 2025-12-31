// API Configuration
const API_BASE = 'http://127.0.0.1:4000/api';

export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  signup: (fullName, email, password) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password }),
    }),
  
  logout: () =>
    apiCall('/auth/logout', {
      method: 'POST',
    }),
};

// User API
export const userAPI = {
  getMe: () => apiCall('/user/me'),
  
  updateProfile: (fullName, email) =>
    apiCall('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify({ fullName, email }),
    }),
  
  changePassword: (currentPassword, newPassword) =>
    apiCall('/user/password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// Posts API
export const postsAPI = {
  getPosts: () => apiCall('/posts'),
  
  getPostById: (id) => apiCall(`/posts/${id}`),
  
  createPost: (title, description) =>
    apiCall('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),
  
  updatePost: (id, title, description) =>
    apiCall(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
    }),
  
  deletePost: (id) =>
    apiCall(`/posts/${id}`, {
      method: 'DELETE',
    }),
};

// Admin API
export const adminAPI = {
  getUsers: (page = 1) => apiCall(`/admin/users?page=${page}`),
  
  activateUser: (id) =>
    apiCall(`/admin/users/${id}/activate`, {
      method: 'PATCH',
    }),
  
  deactivateUser: (id) =>
    apiCall(`/admin/users/${id}/deactivate`, {
      method: 'PATCH',
    }),
};
