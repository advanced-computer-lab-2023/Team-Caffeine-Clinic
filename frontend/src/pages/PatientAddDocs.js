import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';

const DocumentUpload = () => {
  const [username, setUsername] = useState('');
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();


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

  const handleFileChange = (event, index) => {
    const newDocuments = [...document];
    newDocuments[index] = event.target.files[0];
    setDocument(newDocuments);

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
    setDocument([...document, null]);
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
    const newDocuments = [...document];
    newDocuments.splice(index, 1);
    setDocument(newDocuments);

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
    setDocument([]);
    setDescriptions([]);
    setBase64Strings([]);
    setSuccessMessage('');
  };

  return (
    <div>
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

    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {document.map((_, index) => (
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
    </div>
  );
};

export default DocumentUpload;


// import { useAuthContext } from '../hooks/useAuthContext';
// import React, { useState, useEffect } from 'react';


// const DocumentUpload = () => {
//   const [username, setUsername] = useState('');
//   const [documents, setDocuments] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [base64Strings, setBase64Strings] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuthContext();


//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         setLoading(true); // Set loading to true when fetching documents
//         const response = await fetch(`/api/patient/viewMyDocuments`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setDocuments(data.documents);
//         } else {
//           console.error('Error fetching documents:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching documents:', error.message);
//       } finally {
//         setLoading(false); // Set loading to false when fetching is done
//       }
//     };

//     fetchDocuments();
//   }, [user.token]);

//   const viewDocument = (base64String) => {
//     const blob = base64toBlob(base64String);
//     const url = URL.createObjectURL(blob);
//     window.open(url, '_blank');
//   };

//   const base64toBlob = (data) => {
//     const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

//     const bytes = atob(base64WithoutPrefix);
//     let length = bytes.length;
//     let out = new Uint8Array(length);

//     while (length--) {
//       out[length] = bytes.charCodeAt(length);
//     }

//     return new Blob([out], { type: 'application/pdf' });
//   };

//   const deleteDocument = async (description) => {
//     try {
//       setLoading(true); // Set loading to true when deleting document
//       const response = await fetch(`/api/patient/deleteDocument?description=${description}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       if (response.ok) {
//         // Refresh the page after successful deletion
//         window.location.reload();
//       } else {
//         console.error('Error deleting document:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting document:', error.message);
//     } finally {
//       setLoading(false); // Set loading to false when deletion is done
//     }
//   };

//   const handleFileChange = (event, index) => {
//     const newDocuments = [...documents];
//     newDocuments[index] = event.target.files[0];
//     setDocuments(newDocuments);

//     fileToBase64(event.target.files[0], (err, result) => {
//       if (result) {
//         const newBase64Strings = [...base64Strings];
//         newBase64Strings[index] = result;
//         setBase64Strings(newBase64Strings);
//       }
//     });
//   };

//   const handleDescriptionChange = (event, index) => {
//     const newDescriptions = [...descriptions];
//     newDescriptions[index] = event.target.value;
//     setDescriptions(newDescriptions);
//   };

//   const addFileField = () => {
//     setDocuments([...documents, null]);
//     setDescriptions([...descriptions, '']);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setLoading(true);

//     const data = {
//       documents: base64Strings,
//       descriptions: descriptions,
//     };

//     try {
//       const response = await fetch(`/api/patient/saveDocuments/`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`,
//         },
//       });

//       if (!response.ok) {
//         setSuccessMessage('Error in the Inputs');
//       } else {
//         setSuccessMessage(`Successfully Uploaded ${base64Strings.length} documents`);
//         resetForm(); // Call the resetForm function on success
//       }
//     } catch (error) {
//       console.error('Error uploading documents:', error.message);
//       setSuccessMessage('Error uploading documents');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = (index) => {
//     const newDocuments = [...documents];
//     newDocuments.splice(index, 1);
//     setDocuments(newDocuments);

//     const newDescriptions = [...descriptions];
//     newDescriptions.splice(index, 1);
//     setDescriptions(newDescriptions);

//     const newBase64Strings = [...base64Strings];
//     newBase64Strings.splice(index, 1);
//     setBase64Strings(newBase64Strings);
//   };

//   const fileToBase64 = (file, cb) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       cb(null, reader.result);
//     };
//     reader.onerror = function (error) {
//       cb(error, null);
//     };
//   };

//   // Function to reset the form state
//   const resetForm = () => {
//     setUsername('');
//     setDocuments([]);
//     setDescriptions([]);
//     setBase64Strings([]);
//     setSuccessMessage('');
//   };

//   return (
//     <div>
//       <div>
//       <h2>Your Documents</h2>
//       {loading && <div>Loading...</div>}
//       {documents.map((document, index) => (
//         <div key={index}>
//           <p>{document.description}</p>
//           <button onClick={() => viewDocument(document.content)}>View Document</button>
//           <button onClick={() => deleteDocument(document.description)}>Delete Document</button>
//         </div>
//       ))}
//     </div>

//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         {documents.map((_, index) => (
//           <div key={index}>
//             <label>Description:</label>
//             <input type="text" value={descriptions[index]} onChange={(e) => handleDescriptionChange(e, index)} />
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
//         <button type="submit" disabled={loading}>
//           {loading ? 'Saving...' : 'Submit'}
//         </button>
//       </form>
//       <div>{successMessage && <p>{successMessage}</p>}</div>
//     </div>
//     </div>
//   );
// };

// export default DocumentUpload;



