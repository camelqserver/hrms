import axios from 'axios';
const API_URL = 'http://localhost:5000/api/announcements';

export const getAnnouncements = () => axios.get(API_URL);
export const addAnnouncement = (data) => axios.post(API_URL, data);
export const deleteAnnouncement = (id) => axios.delete(`${API_URL}/${id}`);

// Add error interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);