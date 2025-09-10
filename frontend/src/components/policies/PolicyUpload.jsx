
import React, { useState } from 'react';
import { uploadPolicy } from '../../services/policyService';

const PolicyUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    // You should upload to S3 and get file URL here
    const fileUrl = `/uploads/${file.name}`; // example if local
    await uploadPolicy({ title, fileUrl });
    alert('Uploaded');
    setTitle('');
    setFile(null);
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Company Policy</h2>
      <input
        type="text"
        placeholder="Policy Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default PolicyUpload;
