const FamilyMemberDetails = ({ familyMember , relation }) => {
  return (
<div className="container">
      <div className="row">
      <div className="col-lg">
      <div className="member d-flex align-items-start">
      <div className="member-info"> 
      <h4 className="name">{familyMember.name}</h4>
      <div className="details"><strong>date of birth: </strong>{familyMember.dob}</div>
      <div className="details"><strong>gender: </strong>{familyMember.gender}</div>
      <div className="details"><strong>relation: </strong>{relation}</div>
    </div>
    </div>
    </div>
    </div>
    <br />
    </div>
  )
}

export default FamilyMemberDetails;