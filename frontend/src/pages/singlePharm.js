import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePharmacist = () => {
  const { username } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacist = async () => {
      try {
        // console.log(username);
        const response = await fetch(`/api/pharmacists/getSinglePharmacist/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPharmacist(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPharmacist();
  }, [username]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!pharmacist) {
    return <p>Loading...</p>;
  }
  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
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
  const blob = base64toBlob(pharmacist.ID);
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');	
  }
  const viewDegree = async () => {
    const blob = base64toBlob(pharmacist.Degree);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');	
    }
    const viewLicense = async () => {
      const blob = base64toBlob(pharmacist.License);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');	
      }

  return (
    <div className="single-doctor-details">
      <div className="name">{pharmacist.name}</div>
      <div className="details"><strong>speciality: </strong>{pharmacist.speciality}</div>
      <div className="details"><strong>rate: </strong>{pharmacist.rate}</div>
      <div className="details"><strong>affiliation: </strong>{pharmacist.affiliation}</div>
      <div className="details"><strong>email: </strong>{pharmacist.email}</div>
      <div className="details"><strong>education: </strong>{pharmacist.education}</div> 
      <strong> ID: </strong><text onClick={viewID} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
      <strong> Degree: </strong> <text onClick={viewDegree} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
      <strong> Working Licenses: </strong> <text onClick={viewLicense} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>
    </div>
  );
};

export default SinglePharmacist;
