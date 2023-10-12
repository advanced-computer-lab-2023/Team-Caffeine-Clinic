import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';
import FamilyMemberForm from '../components/FamilyMemberForm';


const FamilyMembers = () => {

    const [familyMembers, setFamilyMembers] = useState(null);

    useEffect(() => {
      const fetchFamilyMembers = async () => {
        let url = '/api/familyMembers/getFamilyMembers'; 

        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setFamilyMembers(json)
        }
      }
      fetchFamilyMembers();
      
    }, [])

    return (
      <div className="familyMembers">

        {/* familyMembers list */}
        <div className='familyMembers'>
          {familyMembers && familyMembers.map((familyMember) => (
            <FamilyMemberDetails key={familyMember.patientID} familyMember={familyMember} />
          ))} 
        </div>

        <FamilyMemberForm className="familyMemberForm"/>
      </div>
  )
}

export default FamilyMembers;