import React, { useState } from 'react';
import axios from 'axios';

export default function AssignRole() {
  const [form, setForm] = useState({ userId: '', roleId: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAssign = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/assign-role', form);
    alert('Role assigned');
  };

  return (
    <form onSubmit={handleAssign} style={{ padding: '2rem' }}>
      <h3>Assign Role</h3>
      <input name="userId" placeholder="User ID" onChange={handleChange} required />
      <input name="roleId" placeholder="Role ID" onChange={handleChange} required />
      <button type="submit">Assign</button>
    </form>
  );
}
