import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const ViewDocuments = () => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true); // Set loading to true when fetching documents
        const response = await fetch(`/api/patient/viewMyDocuments`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDocuments(data.documents);
        } else {
          console.error('Error fetching documents:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchDocuments();
  }, [user.token]);

  const viewDocument = (base64String) => {
    const blob = base64toBlob(base64String);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const base64toBlob = (data) => {
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };

  const deleteDocument = async (description) => {
    try {
      setLoading(true); // Set loading to true when deleting document
      const response = await fetch(`/api/patient/deleteDocument?description=${description}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        // Refresh the page after successful deletion
        window.location.reload();
      } else {
        console.error('Error deleting document:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting document:', error.message);
    } finally {
      setLoading(false); // Set loading to false when deletion is done
    }
  };

  return (
    <div>
      <h2>Your Documents</h2>
      {loading && <div>Loading...</div>}
      {documents.map((document, index) => (
        <div key={index}>
          <p>{document.description}</p>
          <button onClick={() => viewDocument(document.content)}>View Document</button>
          <button onClick={() => deleteDocument(document.description)}>Delete Document</button>
        </div>
      ))}
    </div>
  );
};

export default ViewDocuments;
