
import React, { useEffect, useState } from 'react';
import { getAllPolicies } from '../../services/policyService';

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    getAllPolicies().then(res => setPolicies(res.data));
  }, []);

  return (
    <div>
      <h2>Company Policies</h2>
      <ul>
        {policies.map(policy => (
          <li key={policy.id}>
            <strong>{policy.title}</strong> - <a href={policy.fileUrl} target="_blank" rel="noreferrer">View</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyList;
 