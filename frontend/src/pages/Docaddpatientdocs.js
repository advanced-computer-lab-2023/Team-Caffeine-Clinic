import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const DocumentUpload = () => {
  const [patients, setPatients] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [documents, setDocuments] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/doctorinfo/myPatients', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPatients(data.patientUsernames);
        } else {
          console.error('Error fetching patients:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching patients:', error.message);
      }
    };

    fetchPatients();
  }, [user.token]);

  const addFileField = () => {
    setDocuments([...documents, null]);
    setDescriptions([...descriptions, '']);
  };

  const handleDescriptionChange = (event, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPatient) {
      setSuccessMessage('Please select a patient.');
      return;
    }

    setLoading(true);

    const data = {
      patientUsername: selectedPatient,
      documents: base64Strings,
      descriptions: descriptions,
    };

    try {
      const response = await fetch(`/api/doctorinfo/saveDocumentsForPatient`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
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

  const resetForm = () => {
    setUsername('');
    setSelectedPatient('');
    setDocuments([]);
    setDescriptions([]);
    setBase64Strings([]);
    setSuccessMessage('');
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Select Patient:</label>
    //       <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
    //         <option value="">Select Patient</option>
    //         {patients.map((patient, index) => (
    //           <option key={index} value={patient}>
    //             {patient}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     {selectedPatient && (
    //       <>
    //         {documents.map((_, index) => (
    //           <div key={index}>
    //             <label>Description:</label>
    //             <input
    //               type="text"
    //               value={descriptions[index]}
    //               onChange={(e) => handleDescriptionChange(e, index)}
    //             />
    //             <label>Document:</label>
    //             <input type="file" onChange={(e) => handleFileChange(e, index)} accept=".pdf" />
    //             <button type="button" onClick={() => handleCancel(index)}>
    //               Cancel
    //             </button>
    //           </div>
    //         ))}
    //         <button type="button" onClick={addFileField}>
    //           Add Document
    //         </button>
    //       </>
    //     )}
    //     <button type="submit" disabled={loading}>
    //       {loading ? 'Saving...' : 'Submit'}
    //     </button>
    //   </form>
    //   <div>{successMessage && <p>{successMessage}</p>}</div>
    // </div>
    <>
    <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Upload Patient Documents</h2>
        <ol>
          <li><Link to="/seedoc">Home</Link></li>
          <li>Patietnt DOCS</li>
        </ol>
      </div>
    </div>
  </section>

<section class="inner-page">
<div class="container">
 <section id="appointment" className="appointment section-bg">
  <div className="container">
    <div className="section-title">
      <h2>Add To Your Patient Documents</h2>
      {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
    </div>
    <form onSubmit={handleSubmit} method="post" role="form" className="php-email-form">
        <div className="col-md-4 form-group mt-3">
          <select name="department" id="department" className="form-select" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value>Select Patient</option>
            {patients.map((patient, index) => (
               <option key={index} value={patient}>
                 {patient}
               </option>
             ))}
          </select>
        </div>
        {selectedPatient && (
          <>
            {documents.map((_, index) => (
              <div key={index}>
                <label>Description:</label>
                <input
                  type="text"
                  value={descriptions[index]}
                  onChange={(e) => handleDescriptionChange(e, index)}
                />
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
          </>
        )}   
        <button type="submit" disabled={loading}>
           {loading ? 'Saving...' : 'Submit'}
            </button>     
      {/* <div className="text-center"><button type="submit">Make an Appointment</button></div> */}
    </form>
    <div>{successMessage && <p>{successMessage}</p>}</div>
  </div>
</section>
</div>
</section>
</>
  );
};

export default DocumentUpload;
