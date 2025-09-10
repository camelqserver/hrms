import axios from 'axios';
const API_URL = 'http://localhost:5000/api/anouncement';

export const getEmployees = () => axios.get(API_URL);
export const addEmployee = (data) => axios.post(API_URL, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
