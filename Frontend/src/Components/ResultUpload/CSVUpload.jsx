import React, { useState } from 'react';
import axios from 'axios';

const CSVUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Adjust the URL to match your back-end endpoint
      const response = await axios.post('http://localhost:9080/api/results-upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CSVUpload;
