import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';

const FamilyMembers = () => {

    const [familyMembers, setFamilyMembers] = useState(null);

    useEffect(() => {
      const fetchFamilyMembers = async () => {
        let url = '/api/familyMembers/get'; 

        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setFamilyMembers(json)
        }
      }
      // console.log('ookayyyyyyy');
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
      </div>
  )
}

export default FamilyMembers;