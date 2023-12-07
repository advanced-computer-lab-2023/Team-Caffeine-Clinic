import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';
import { useNavigate, Link } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
import FamilyMemberForm from '../components/FamilyMemberForm';
import signup from "../pages/SignUp"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuthContext } from '../hooks/useAuthContext';


const FamilyMembers = () => {

  //const [redirectToSignUp, setRedirectToSignUp] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [relation, setRelation] = useState([]);
  const [NpEmail, setNpEmail] = useState('');
  const [Newrelation, setNewrelation] = useState('');
  const [isfind, setisfind] = useState(false);
  const [message, setMessage] = useState('');

  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { user } = useAuthContext()

  const handleNewrelation = (e) => {
    setNewrelation(e.target.value);
  };

  const handleNpEmail = (e) => {
    setNpEmail(e.target.value);
  };


  const linkFamilyMember = async (NpEmail, Newrelation) => {
    try {
      const response = await fetch(`/api/patient/linkFamilyMember?EmailorPhhone=${NpEmail}&relation=${Newrelation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.status === 500) {
        window.alert(data.mssg)
        return
      }

      if (!response.ok) {
        setisfind(false)
        setMessage('Patient not founded.');
        navigate('/AddfamilyMember')
        return;
      }

      setisfind(true)
      setMessage('Family Member is added.');
      window.location.reload();
      return;
    } catch (error) {
      setMessage('Internal Server Error.');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      let url = 'http://localhost:4000/api/familyMembers/getFamilyMembers';

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      const familymem = json.familyMembers;
      const MyRelations = json.relation;


      if (response.ok) {
        setRelation(MyRelations)
        setFamilyMembers(familymem)
      }
    }
    if (user) {
      fetchFamilyMembers();
    }
  }, [user])

  const handleAddFamilyMember = (newMember) => {
    setFamilyMembers((prevMembers) => [...prevMembers, newMember]);
  };



  return (
    <>
      <div>{familyMembers && familyMembers.map((familyMember, index) => (
        <FamilyMemberDetails key={index} familyMember={familyMember} relation={relation[index]} />
      ))}</div>


      <div className="familyMembers">
        <h1>Add the email or the phone number of the family member you want to add and  the relation
        </h1>

        <label htmlFor="find">Enter your Family member Phone/Email:</label>
        <input
          type="text"
          id="find"
          value={NpEmail}
          onChange={handleNpEmail}
        />

        <label htmlFor="find">Enter the relation:</label>
        <select
          id="relation"
          value={Newrelation}
          onChange={handleNewrelation}
        >
          <option value="Wife">Wife</option>
          <option value="Husband">Husband</option>
          <option value="Daughter">Daughter</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Sibling">Sibling</option>
          <option value="Son">Son</option>
        </select>

        <button onClick={() => linkFamilyMember(NpEmail, Newrelation)}>Add Family Member</button>
        <p>{message}</p>
        {/* {isfind === false && redirectToSignUp && <Redirect to="/signup" />} */}
      </div>
    </>
  )
}

export default FamilyMembers;