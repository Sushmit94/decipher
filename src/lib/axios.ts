import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  withCredentials: true, // This is crucial - it includes cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Clear localStorage on auth errors
      if (typeof window !== 'undefined') {
        localStorage.removeItem('completedQuestions');
        localStorage.removeItem('totalScore');
        localStorage.removeItem('unlockedLevel');
        // Redirect to login - you might want to handle this in components instead
      }
    }
    return Promise.reject(error);
  }
);

export default api;