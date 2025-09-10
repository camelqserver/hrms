import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // adjust port if needed

// Holiday services
export const addHoliday = (data) => axios.post(`${API_URL}/holidays`, data);
export const getHolidays = () => axios.get(`${API_URL}/holidays`);
export const deleteHoliday = (id) => axios.delete(`${API_URL}/holidays/${id}`);

// Organization settings services
export const saveOrgSettings = (data) => axios.post(`${API_URL}/org-settings`, data);
export const getOrgSettings = () => axios.get(`${API_URL}/org-settings`);
