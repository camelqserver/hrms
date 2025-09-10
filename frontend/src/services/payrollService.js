import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payrolls';

export const createPayroll = (data) => axios.post(API_URL, data);
export const getPayrolls = () => axios.get(API_URL);
export const deletePayroll = (id) => axios.delete(`${API_URL}/${id}`);
