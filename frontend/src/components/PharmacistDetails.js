import { useAuthContext } from '../hooks/useAuthContext'
const PharmacistDetails = ({ pharmacist }) => {
  const {user} = useAuthContext()
  const handleClick = async () => {
      const response = await fetch('/api/admin/deletePharmacist/' + pharmacist._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      method: 'DELETE'
      })
      const json = await response.json()
      window.location.reload();

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
      <div className="Admin-details">
          <h4></h4>
          <p><strong>Username: </strong>{pharmacist.username}</p>
          <p><strong>Email: </strong>{pharmacist.email}</p>
          <p><strong>Name: </strong>{pharmacist.name}</p>
          <p><strong>Speciality: </strong>{pharmacist.speciality}</p>
          <p><strong>Rate: </strong>{pharmacist.rate}</p>
          <p><strong>Affiliation: </strong>{pharmacist.affiliation}</p>
          <p><strong>Education: </strong>{pharmacist.education}</p>
          <strong> ID: </strong><text onClick={viewID} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
          <strong> Degree: </strong> <text onClick={viewDegree} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
          <strong> Working Licenses: </strong> <text onClick={viewLicense} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>
          <p>{pharmacist.createdAt}</p>
          <button onClick={handleClick}>Delete</button>
      </div>
      )
}

export default PharmacistDetails