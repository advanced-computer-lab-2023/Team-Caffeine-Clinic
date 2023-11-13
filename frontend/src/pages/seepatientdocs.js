import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const DoctorDocuments = () => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDocuments = async () => {
      try {
        const response = await fetch(`/api/doctorInfo/getDocumentsForLoggedInDoctorPatients`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setDocuments(data);
          }
        } catch (error) {
        console.error('Error fetching doctor documents:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDocuments();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Documents</h2>
      {documents&&documents.map((patientData, index) => (
        <div key={index}>
          <h3>{`Patient: ${patientData.patientUsername}`}</h3>
          {patientData.documents.map((document, docIndex) => (
            <div key={docIndex}>
              <p>{document.description}</p>
              <button onClick={() => viewDocument(document.content)}>View Document</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DoctorDocuments;
