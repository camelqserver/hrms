import axios from 'axios';

export const uploadPolicy = (data) =>
  axios.post('/api/policies', data);

export const getAllPolicies = () =>
  axios.get('/api/policies');
