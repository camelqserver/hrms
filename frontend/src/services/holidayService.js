import axios from 'axios';
const API  = 'http://localhost:5000/api/holidays';

export const createHoliday = (data) => axios.post(API, data);
export const getHolidays = () => axios.get(API);
export const deleteHoliday = (id) => axios.delete(`${API}/${id}`);
