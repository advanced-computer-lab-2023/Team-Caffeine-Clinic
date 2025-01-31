// import { useEffect, useState } from 'react'
// import FamilyMemberDetails from '../components/FamilyMemberDetails';
// import { useNavigate, Link } from 'react-router-dom';
// //import { Redirect } from 'react-router-dom';
// import FamilyMemberForm from '../components/FamilyMemberForm';
// import signup from "../pages/SignUp"

// import { useAuthContext } from '../hooks/useAuthContext';


// const FamilyMembers = () => {
 
//      //const [redirectToSignUp, setRedirectToSignUp] = useState(false);
//     const [familyMembers, setFamilyMembers] = useState([]);
//     const [relation, setRelation] = useState([]);
//     const [NpEmail, setNpEmail] = useState('');
//     const [Newrelation, setNewrelation] = useState('');
//     const [isfind, setisfind] = useState(false);
//     const [message, setMessage] = useState('');
    
//     const navigate = useNavigate();

//     const {user} = useAuthContext()

//     const handleNewrelation = (e) => {
//       setNewrelation(e.target.value);
//     };

//     const handleNpEmail = (e) => {
//       setNpEmail(e.target.value);
//     };


//     const linkFamilyMember = async (NpEmail , Newrelation) => {
//       try {
//         const response = await fetch(`/api/patient/linkFamilyMember?EmailorPhhone=${NpEmail}&relation=${Newrelation}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.token}`,
//           },
//         });
  
//         const data = await response.json();

//         if(response.status === 500) {
//           window.alert(data.mssg)
//           return
//         }
  
//         if (!response.ok) {
//           setisfind(false)
//           setMessage( 'Patient not founded.');
//          navigate ('/AddfamilyMember')
//           return;
//         }
        
//         setisfind(true)
//         setMessage('Family Member is added.');
//         window.location.reload();
//         return;
//       } catch (error) {
//         setMessage('Internal Server Error.');
//         console.error('Error:', error);
//       }
//     };

//     useEffect(() => {
//       const fetchFamilyMembers = async () => {
//         let url = 'http://localhost:4000/api/familyMembers/getFamilyMembers'; 

//         const response = await fetch(url, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         const json = await response.json();
//         const familymem = json.familyMembers;
//         const MyRelations = json.relation;


//         if (response.ok) {
//           setRelation(MyRelations)
//           setFamilyMembers(familymem)
//         }
//       }
//       if(user){
//         fetchFamilyMembers();
//       }
//     }, [user])

//     const handleAddFamilyMember = (newMember) => {
//       setFamilyMembers((prevMembers) => [...prevMembers, newMember]);
//   };

//     return (
//       <>
//       <div className='familyMemberDetails'>
//           {familyMembers && familyMembers.map((familyMember , index ) => (
//             <FamilyMemberDetails key={index} familyMember={familyMember} relation = {relation[index]}  />
//           ))} 
//         </div>
        
//           <div className="familyMembers">
//         <h1>Add the email or the phone number of the family member you want to add and  the relation
//         </h1>
        
//         <label htmlFor="find">Enter your Family member Phone/Email:</label>
//         <input
//         type="text"
//         id="find"
//         value={NpEmail}
//         onChange={handleNpEmail}
//         />

//       <label htmlFor="find">Enter the relation:</label>
//       <select
//       id="relation"
//       value={Newrelation}
//       onChange={handleNewrelation}
//     >
//       <option value="Wife">Wife</option>
//       <option value="Husband">Husband</option>
//       <option value="Daughter">Daughter</option>
//       <option value="Father">Father</option>
//       <option value="Mother">Mother</option>
//       <option value="Sibling">Sibling</option>
//       <option value="Son">Son</option>
//     </select>

//         <button onClick={() => linkFamilyMember(NpEmail , Newrelation)}>Add Family Member</button>
//         <p>{message}</p>
//         {/* {isfind === false && redirectToSignUp && <Redirect to="/signup" />} */}
//       </div>
//         </>
//   )
// }

// export default FamilyMembers;

import { useEffect, useState } from 'react'
import FamilyMemberDetails from '../components/FamilyMemberDetails';
import { useNavigate, Link } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
import FamilyMemberForm from '../components/FamilyMemberForm';
import signup from "../pages/SignUp"

import { useAuthContext } from '../hooks/useAuthContext';


const FamilyMembers = () => {
 
     //const [redirectToSignUp, setRedirectToSignUp] = useState(false);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [relation, setRelation] = useState([]);
    const [NpEmail, setNpEmail] = useState('');
    const [Newrelation, setNewrelation] = useState('');
    const [isfind, setisfind] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const margin = {
      marginTop: '100px',
    }
    const {user} = useAuthContext()

    const handleNewrelation = (e) => {
      setNewrelation(e.target.value);
    };

    const handleNpEmail = (e) => {
      setNpEmail(e.target.value);
    };


    const linkFamilyMember = async (NpEmail , Newrelation) => {
      try {
        const response = await fetch(`/api/patient/linkFamilyMember?EmailorPhhone=${NpEmail}&relation=${Newrelation}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        const data = await response.json();

        if(response.status === 500) {
          window.alert(data.mssg)
          return
        }
  
        if (!response.ok) {
          setisfind(false)
          setMessage( 'Patient not founded.');
         navigate ('/AddfamilyMember')
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
      if(user){
        fetchFamilyMembers();
      }
    }, [user])

    const handleAddFamilyMember = (newMember) => {
      setFamilyMembers((prevMembers) => [...prevMembers, newMember]);
  };

    return (
      <div style={margin}>
        <br />
      <div>
      <div className="section-title">
          <h2>Family Members</h2>
      </div> 
      <div id="doctors" className="doctors">
          {familyMembers && familyMembers.map((familyMember , index ) => (
            <FamilyMemberDetails key={index} familyMember={familyMember} relation = {relation[index]}  />
          ))} 
        </div>
        </div>
        
        <section id="appointment" class="appointment section-bg">
          <div class="container">
          <div class="section-title">
          <h2>Add a Family Member</h2>
        </div> 

        <div class="row">
       <div className="col-md-4 form-group">   
        <label htmlFor="find">Family member Phone/Email: </label>
        <input
        type="text"
        className="form-control" 
        id="find"
        value={NpEmail}
        onChange={handleNpEmail}
        />
        </div>
        <div className="col-md-4 form-group mt-3 mt-md-0">
      <label htmlFor="find">Enter the relation: </label>
      <select
      className="form-control" 
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
    </div>
    </div>
    <br />
    <div className="text-center"><button className='button-43' type='submit' onClick={() => linkFamilyMember(NpEmail , Newrelation)}>Add Family Member</button></div>
        <p>{message}</p>

      </div>
    </section>
        </div>
  )
}

export default FamilyMembers;