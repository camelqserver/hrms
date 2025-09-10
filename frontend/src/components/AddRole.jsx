import React, { useState } from 'react';
import axios from 'axios';

export default function AddRole() {
  const [name, setName] = useState('');

  const handleAddRole = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/roles', { name });
    alert('Role created');
    setName('');
  };

  return (
    <form onSubmit={handleAddRole} style={{ padding: '2rem' }}>
      <h3>Add Role</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Role name" required />
      <button type="submit">Add Role</button>
    </form>
  );
}
