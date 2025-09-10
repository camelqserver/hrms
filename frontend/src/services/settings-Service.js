import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/settings';

export const getSettings = () => axios.get(BASE_URL);
export const saveSettings = (data) => axios.post(BASE_URL, data);
