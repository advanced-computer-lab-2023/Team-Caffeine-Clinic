import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';
import FamilyMemberForm from '../components/FamilyMemberForm';

import { useAuthContext } from '../hooks/useAuthContext';


const FamilyMembers = () => {

    const [familyMembers, setFamilyMembers] = useState([]);

    const {user} = useAuthContext()

    useEffect(() => {
      const fetchFamilyMembers = async () => {
        let url = 'http://localhost:4000/api/familyMembers/getFamilyMembers'; 

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          setFamilyMembers(json)
        }
      }
      if(user){
        fetchFamilyMembers();
      }
    }, [user])

    const handleAddFamilyMember = (newMember) => {
      setFamilyMembers((prevMembers) => [...prevMembers, newMember]);
  };

    return (
      <div className="familyMembers">

        {/* familyMembers list */}
        <div className='familyMembers'>
          {familyMembers && familyMembers.map((familyMember) => (
            <FamilyMemberDetails key={familyMember.patientID} familyMember={familyMember} />
          ))} 
        </div>

        <FamilyMemberForm 
        className="familyMemberForm" 
        onAddFamilyMember={handleAddFamilyMember}
        />
      </div>
  )
}

export default FamilyMembers;