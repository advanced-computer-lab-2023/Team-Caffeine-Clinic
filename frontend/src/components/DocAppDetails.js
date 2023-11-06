import { useAuthContext } from '../hooks/useAuthContext';

const DocAppDetails = ({ Appl }) => {

  const {user} = useAuthContext()

  //needs 2 buttons (reject and accept).
  const createDoc = async () => {
    const response = await fetch('/api/doctorInfo/createDoctor', {
      method: 'POST',
      body : JSON.stringify(Appl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    //const json = await response.json;
   }


  const handleClick = async () => {
    createDoc();
    const response = await fetch('/api/Admin/deleteApp/' + Appl._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    window.location.reload();
}

const handleClick2 = async () => {
  const response = await fetch('/api/Admin/deleteApp/' + Appl._id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  const json = await response.json()
  window.location.reload();
}

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
        <p>{Appl.createdAt}</p>
        <span className="accept-button" onClick={handleClick}>Approve</span>
        <span className="reject-button" onClick={handleClick2}>Reject</span>
      </div>
    )
  }
  
  export default DocAppDetails