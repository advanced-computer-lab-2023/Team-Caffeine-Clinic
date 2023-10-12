import { useState } from "react"

 const FamilyMemberForm = () => {
  const [name, setName] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const familyMember = {name , nationalID, age, gender, relation};

    const response = await fetch('/api/familyMembers/addFamilyMember', {
      method: 'POST',
      body: JSON.stringify(familyMember),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if(!response.ok) {
      setError(json.error);
    }
    if(response.ok) {
      setName('');
      setNationalID('');
      setAge('');
      setGender('');
      setRelation('');
      setError(null);
      console.log('new family member added', json);  
    }
    

  }

  return (
    <form className="create-form">
      <h3>Add Family Member</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>National ID:</label>
      <input
        type="text"
        onChange={(e) => setNationalID(e.target.value)}
        value={nationalID}
      />

      <label>Age:</label>
      <input
        type="text"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />

      <label>Gender:</label>
      <select
          onChange={(e) => setGender(e.target.value)}
          value={gender}
      >
          <option value="" disabled>Select a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
      </select>

      <label>Relation:</label>
      <select
          onChange={(e) => setRelation(e.target.value)}
          value={relation}
      >
          <option value="" disabled>Select a Relation</option>
          <option value="wife">Wife</option>
          <option value="husband">Husband</option>
          <option value="child">Child</option>
      </select>

 
      <button onClick={handleSubmit}>Add Family Member</button>
      {error && <div className="error">{error}</div>}
    </form>

  )
 }

 export default FamilyMemberForm;