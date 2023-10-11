const DocAppDetails = ({ Appl }) => {

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
      </div>
    )
  }
  
  export default DocAppDetails