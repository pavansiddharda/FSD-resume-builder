import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error interceptor for better error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      error.message = 'Cannot connect to server. Please make sure JSON-Server is running on port 3001.';
    }
    return Promise.reject(error);
  }
);

// Resume CRUD operations
export const resumeService = {
  // Get all resumes for current user
  getAll: async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      const response = await api.get('/resumes');
      // Filter resumes by userId
      const allResumes = Array.isArray(response.data) ? response.data : [];
      return allResumes.filter(resume => resume.userId === user.id);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  },

  // Get a single resume by ID (with user check)
  getById: async (id) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      const response = await api.get(`/resumes/${id}`);
      const resume = response.data;
      // Check if resume belongs to user
      if (resume.userId !== user.id) {
        throw new Error('Resume not found or access denied');
      }
      return resume;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  },

  // Create a new resume
  create: async (resumeData) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      const response = await api.post('/resumes', {
        ...resumeData,
        userId: user.id
      });
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Update an existing resume
  update: async (id, resumeData) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      // First check if resume belongs to user
      const existingResume = await api.get(`/resumes/${id}`);
      if (existingResume.data.userId !== user.id) {
        throw new Error('Resume not found or access denied');
      }
      const response = await api.put(`/resumes/${id}`, {
        ...resumeData,
        userId: user.id
      });
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  },

  // Delete a resume
  delete: async (id) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      // First check if resume belongs to user
      const existingResume = await api.get(`/resumes/${id}`);
      if (existingResume.data.userId !== user.id) {
        throw new Error('Resume not found or access denied');
      }
      const response = await api.delete(`/resumes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  },
};

// Authentication service
export const authService = {
  // Login
  login: async (username, password) => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        return { id: user.id, username: user.username, email: user.email };
      }
      throw new Error('Invalid username or password');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      // Check if username already exists
      const usersResponse = await api.get('/users');
      const users = usersResponse.data;
      if (users.find(u => u.username === userData.username)) {
        throw new Error('Username already exists');
      }
      if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }

      const response = await api.post('/users', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
      });
      return { id: response.data.id, username: response.data.username, email: response.data.email };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('user');
  }
};

export default api;

