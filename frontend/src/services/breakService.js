import axios from 'axios';

const API = 'http://localhost:5000/api/breaks';

export const startBreak = async (employeeId) => {
  const date = new Date().toISOString().split('T')[0];
  const breakStart = new Date().toLocaleTimeString('en-GB');
  return await axios.post(`${API}/start`, { employeeId, date, breakStart });
};

export const endBreak = async (employeeId) => {
  const date = new Date().toISOString().split('T')[0];
  const breakEnd = new Date().toLocaleTimeString('en-GB');
  return await axios.post(`${API}/end`, { employeeId, date, breakEnd });
};

export const getBreaks = async (employeeId) => {
  return await axios.get(`${API}/${employeeId}`);
};
