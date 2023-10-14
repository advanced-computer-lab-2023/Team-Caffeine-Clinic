import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';
import FamilyMemberForm from '../components/FamilyMemberForm';


const FamilyMembers = () => {

    const [familyMembers, setFamilyMembers] = useState([]);

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