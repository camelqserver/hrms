import axios from 'axios';

export const sendNotification = (data) =>
  axios.post('/api/notifications', data);

export const getNotifications = (employeeId) =>
  axios.get(`/api/notifications/${employeeId}`);

export const markNotificationRead = (id) =>
  axios.put(`/api/notifications/${id}/read`);
