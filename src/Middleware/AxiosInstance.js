import axios from 'axios';

const API_URL = 'https://api.mediprobehealthcare.life';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});


axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      
      alert("Session expired. Please log in again.");
      window.location.href = "/"; 
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
