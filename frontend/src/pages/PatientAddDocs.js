import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const DocumentUpload = () => {
  const [username, setUsername] = useState('');
  const [documents, setDocuments] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const handleFileChange = (event, index) => {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.files[0];
    setDocuments(newDocuments);

    fileToBase64(event.target.files[0], (err, result) => {
      if (result) {
        const newBase64Strings = [...base64Strings];
        newBase64Strings[index] = result;
        setBase64Strings(newBase64Strings);
      }
    });
  };

  const handleDescriptionChange = (event, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

  const addFileField = () => {
    setDocuments([...documents, null]);
    setDescriptions([...descriptions, '']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const data = {
      documents: base64Strings,
      descriptions: descriptions,
    };

    try {
      const response = await fetch(`/api/patient/saveDocuments/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        setSuccessMessage('Error in the Inputs');
      } else {
        setSuccessMessage(`Successfully Uploaded ${base64Strings.length} documents`);
        resetForm(); // Call the resetForm function on success
      }
    } catch (error) {
      console.error('Error uploading documents:', error.message);
      setSuccessMessage('Error uploading documents');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);

    const newDescriptions = [...descriptions];
    newDescriptions.splice(index, 1);
    setDescriptions(newDescriptions);

    const newBase64Strings = [...base64Strings];
    newBase64Strings.splice(index, 1);
    setBase64Strings(newBase64Strings);
  };

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  // Function to reset the form state
  const resetForm = () => {
    setUsername('');
    setDocuments([]);
    setDescriptions([]);
    setBase64Strings([]);
    setSuccessMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {documents.map((_, index) => (
          <div key={index}>
            <label>Description:</label>
            <input type="text" value={descriptions[index]} onChange={(e) => handleDescriptionChange(e, index)} />
            <label>Document:</label>
            <input type="file" onChange={(e) => handleFileChange(e, index)} accept=".pdf" />
            <button type="button" onClick={() => handleCancel(index)}>
              Cancel
            </button>
          </div>
        ))}
        <button type="button" onClick={addFileField}>
          Add Document
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
      <div>{successMessage && <p>{successMessage}</p>}</div>
    </div>
  );
};

export default DocumentUpload;
