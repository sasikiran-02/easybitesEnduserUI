import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:8083', // Set your API base URL
});

// ✅ Add Axios interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (token) {
      console.log('Axios: Adding Authorization header. Token:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn(
        'Axios: No token found. Sending request without Authorization header.'
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; // Export Axios instance
