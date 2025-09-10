import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

// Apply for leave
export const applyLeave = async (leaveData) => {
  try {
    const response = await axios.post(API_URL, leaveData);
    return response.data;
  } catch (error) {
    console.error("Error applying leave:", error);
    throw error;
  }
};

// Get all leaves
export const getAllLeaves = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaves:", error);
    throw error;
  }
};

// Update leave status (Admin)
export const updateLeaveStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating leave status:", error);
    throw error;
  }
};
