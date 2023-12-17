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
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ fontSize: '2em' }}>Loading... <i className="bx bx-loader bx-spin" /></div>
  </div>

  }

  return (
    // <div>
    //   <h2>Your Documents</h2>
    //   {documents&&documents.map((patientData, index) => (
    //     <div key={index}>
    //       <h3>{`Patient: ${patientData.patientUsername}`}</h3>
    //       {patientData.documents.map((document, docIndex) => (
    //         <div key={docIndex}>
    //           <p>{document.description}</p>
    //           <button onClick={() => viewDocument(document.content)}>View Document</button>
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
<>
    <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>View Patient Documents</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Patietnt DOCS</li>
        </ol>
      </div>
    </div>
  </section>

<section class="inner-page">
<div class="container">
  <section id="faq" className="faq section-bg">
  <div className="container">
    <div className="section-title">
      <h2>Your Patients Documents</h2>
      <p>Click on View Documents to view the documents of a patient.</p>
    </div>
    <div className="faq-list">
    {documents&&documents.map((patientData, index) => (
      <ul>
        <li data-aos="fade-up" key={index}>
          <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">{`Patient: ${patientData.patientUsername}`} <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
          <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
          {patientData.documents.map((document, docIndex) => (
              <div key={docIndex}>
               <p><strong>Description: </strong>{document.description}</p>
              <button  onClick={() => viewDocument(document.content)}>View Document</button>
         </div>
            ))}
          </div>
        </li>
      </ul>
      ))}
    </div>
  </div>
</section>

</div>
</section>

</>

  );
};

export default DoctorDocuments;
