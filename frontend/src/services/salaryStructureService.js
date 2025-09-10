import axios from "axios";

const API = "http://localhost:5000/api/salaries";


export const getSalaries = () => axios.get(API);
export const createSalary = (data) => axios.post(API, data);
export const updateSalary = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteSalary = (id) => axios.delete(`${API}/${id}`);
