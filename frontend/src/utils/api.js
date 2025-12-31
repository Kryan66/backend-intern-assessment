// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Auth API
export const authAPI = {
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signup: (fullName, email, password) =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    }),

  logout: () =>
    apiCall("/auth/logout", {
      method: "POST"),
};

// User API
export const userAPI = {
  getMe: () => apiCall("/user/me"),

  updateProfile: (fullName, email) =>
    apiCall("/user/profile", {
      method: "PATCH",
      body: JSON.stringify({ fullName, email }),
    }),

  changePassword: (oldPassword, newPassword) =>
    apiCall("/user/password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    }),
};
