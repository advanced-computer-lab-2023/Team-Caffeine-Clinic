import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import DoctorImage from '../assets/img/doctors/doctor.jpg';

const PharmAppDetails = ({ Appl }) => {
    const [Response,setResponse]=useState('');
    const {user} = useAuthContext()

    //needs 2 buttons (reject and accept).
    const createPharm = async () => {
      const response = await fetch('/api/admin/acceptApp', {
        method: 'POST',
        body : JSON.stringify(Appl),
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
      })
      if(!response.ok){
        // setResponse("Couldn't Create Pharmacist");
    }

      // const json = await response.json;
     }
  
  
    const handleClick = async () => {
        createPharm();
      const response = await fetch('/api/admin/deletePharmApp/' + Appl._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      setResponse("Approved")
      setTimeout(function(){
        window.location.reload();
   }, 3000);
  }
  
  const handleClick2 = async () => {
    const response = await fetch('/api/admin/deletePharmApp/' + Appl._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    setResponse("Rejected")
    setTimeout(function(){
      window.location.reload();
 }, 3000);
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
  const blob = base64toBlob(Appl.ID);
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');	
  }
  const viewDegree = async () => {
    const blob = base64toBlob(Appl.Degree);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');	
    }
    const viewLicense = async () => {
      const blob = base64toBlob(Appl.License);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');	
      }
  
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
          <p><strong>Name: </strong>{Appl.name}</p>
          <p><strong>Email: </strong>{Appl.email}</p>
          <p><strong>Speciality: </strong>{Appl.speciality}</p>
          <p><strong>Rate: </strong>{Appl.rate}</p>
          <p><strong>Affiliation: </strong>{Appl.affiliation}</p>
          <p><strong>Education: </strong>{Appl.education}</p>
          <strong> ID: </strong><text onClick={viewID} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
          <strong> Degree </strong> <text onClick={viewDegree} style={{cursor:"pointer",color:" blue" }}  >View here </text> <p></p>
          <strong> Working Licenses </strong> <text onClick={viewLicense} style={{cursor:"pointer",color:" blue"}}  >View here </text> <p></p>
          <p>{Appl.createdAt}</p>
          <button className="button-40" onClick={handleClick}>Accept</button>
          <button className="button-41" onClick={handleClick2}>Reject</button>
          <label>{Response}</label>
          </div>
        </div>
        </div>
        </div>
        </div>
    <br />
    </div>  
)
    }
    
    export default PharmAppDetails