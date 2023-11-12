const FamilyMemberDetails = ({ familyMember , relation }) => {
  return (
    <div className="familyMember-details">
      <div className="name">{familyMember.name}</div>
      <div className="details"><strong>date of birth: </strong>{familyMember.dob}</div>
      <div className="details"><strong>gender: </strong>{familyMember.gender}</div>
      <div className="details"><strong>relation: </strong>{relation}</div>
    </div>
  )
}

export default FamilyMemberDetails;