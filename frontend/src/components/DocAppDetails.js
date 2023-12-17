import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DoctorImage from '../assets/img/doctors/doctor.jpg';

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
    let base64WithoutPrefix;
if (data) {
   base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
  // Rest of your code that uses base64WithoutPrefix
} else {
  // Handle the case when data is undefined or null
  console.error('Data is undefined or null');
}
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
<div id="doctors" className="doctors">
<div className="container">
        <div className="row">
        <div className="col-lg">
    <div className="member d-flex align-items-start">
        <div className="pic">
          <img src={DoctorImage} className="img-fluid" alt="Doctor" />
        </div>
        <div className="member-info"> 
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
      <button className="button-40" onClick={handleAccept}>
        {showFields ? 'Send' : 'Accept'}
      </button>
      <button className="button-41" onClick={handleReject}>Reject</button>


      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      </div>
        </div>
        </div>
        </div>
        </div>
    <br />
    </div>    
  );

};

export default DocAppDetails;
