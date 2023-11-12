import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const DocAppDetails = ({ Appl }) => {
  const { user } = useAuthContext();
  const [showFields, setShowFields] = useState(false);
  const [contractDetails, setContractDetails] = useState('');
  const [markup, setMarkup] = useState(0);
  const [clinicProfit, setClinicProfit] = useState(0);
  const [error, setError] = useState('');



  const createDoc = async () => {
    const response = await fetch('/api/doctorInfo/createDoctor', {
      method: 'POST',
      body: JSON.stringify(Appl),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    // const json = await response.json;
  };

  const handleAccept = async () => {
   if(showFields){
      createDoc();
      const response = await fetch(`/api/emplymentContract/createEmploymentContract?doctor=${Appl.username}&contractDetails=${contractDetails}&markup=${markup}&clinicProfit=${clinicProfit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      if(!response.ok){
        setError('Error fetching patient data.');
      }else {
        const response1 = await fetch(`/api/Admin/deleteApp/${Appl._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response1.json();
        window.location.reload();
      }}
      else {
        setShowFields(true);
      }

      // Handle the response accordingly
   
  };
  const base64toBlob = (data) => {
    // Cut the prefix data:application/pdf;base64 from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
  };
  const viewID = async () => {
    const blob = base64toBlob(Appl.ID);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    }
    const viewMedical_degree = async () => {
      const blob = base64toBlob(Appl.Medical_degree);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      }

      const viewMedical_licenses = async () => {
        const blob = base64toBlob(Appl.Medical_licenses);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        }

  const handleReject = async () => {
    const response = await fetch(`/api/Admin/deleteApp/${Appl._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    window.location.reload();
  };

  return (
    <div className="Admin-details">
      <h4></h4>
      <p><strong>Username: </strong>{Appl.username}</p>
      <p><strong>Password: </strong>{Appl.password}</p>
      <p><strong>Name: </strong>{Appl.name}</p>
      <p><strong>Speciality: </strong>{Appl.speciality}</p>
      <p><strong>Rate: </strong>{Appl.rate}</p>
      <p><strong>Affiliation: </strong>{Appl.affiliation}</p>
      <p><strong>Education: </strong>{Appl.education}</p>
      <p><strong>Available Dates: </strong>{Appl.availableDates}</p>
      <p><strong>Created At: </strong>{Appl.createdAt}</p>
      <strong> View Doctor's ID</strong> <text onClick={viewID} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>
      <strong> View Medical_licenses</strong> <text onClick={viewMedical_licenses} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>
      <strong> View Medical_degree</strong> <text onClick={viewMedical_degree} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>

      {showFields && (
        <>
          <input
            type="text"
            placeholder="Contract Details"
            value={contractDetails}
            onChange={(e) => setContractDetails(e.target.value)}
          />
          <input
            type="number"
            placeholder="Markup"
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
          />
          <input
            type="number"
            placeholder="Clinic Profit"
            value={clinicProfit}
            onChange={(e) => setClinicProfit(e.target.value)}
          />
        </>
      )}
      <span className="accept-button" onClick={handleAccept}>
        {showFields ? 'Send' : 'Send Employment Contract'}
      </span>
      <span className="reject-button" onClick={handleReject}>Reject</span>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
    
  );

};

export default DocAppDetails;
