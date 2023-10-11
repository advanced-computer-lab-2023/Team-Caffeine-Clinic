const FamilyMemberDetails = ({ familyMember }) => {
  return (
    <div className="familyMember-details">
      <div className="name">{familyMember.name}</div>
      <div className="details"><strong>patientID: </strong>{familyMember.patientID}</div>
      <div className="details"><strong>nationalID: </strong>{familyMember.nationalID}</div>
      <div className="details"><strong>age: </strong>{familyMember.age}</div>
      <div className="details"><strong>gender: </strong>{familyMember.gender}</div>
      <div className="details"><strong>relation: </strong>{familyMember.relation}</div>
    </div>
  )
}

export default FamilyMemberDetails;