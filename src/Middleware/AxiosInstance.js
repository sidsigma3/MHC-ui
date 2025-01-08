import axios from 'axios';

// Base URL and default Axios configuration
const API_URL = process.env.REACT_APP_API_URL || 'https://mhc-backend-six.vercel.app';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with each request
});

export default axiosInstance;
