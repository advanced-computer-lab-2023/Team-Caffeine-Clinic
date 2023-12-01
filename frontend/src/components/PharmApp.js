import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

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
      const response = await fetch('/api/admin/deleteApp/' + Appl._id, {
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
    const response = await fetch('/api/admin/deleteApp/' + Appl._id, {
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
        <div className="Admin-details">
          <h4></h4>
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
          <button className="accept-button" style={{marginRight:"20px"}} onClick={handleClick}>Approve</button>
          <button className="reject-button" onClick={handleClick2}>Reject</button>
          <label>{Response}</label>
        </div>
      )
    }
    
    export default PharmAppDetails