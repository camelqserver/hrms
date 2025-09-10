import axios from 'axios';

const API = 'http://localhost:5000/api/settings';

export const getSettings = () => axios.get(API);
export const updateSettings = (data) => axios.put(API, data);
