import { Link } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext';

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

const SignUp = () => {
    const current = new Date().toISOString().split("T")[0]

    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobile] = useState('');
    const [healthRecords, setHealthRecords] = useState('');

    const [EName, setEname] = useState('');
    const [EMobile, setEMobile] = useState('');
    const [ERelation, setERelation] = useState('');
    
    const [error, setError] = useState(null);

    const {user} = useAuthContext()


    const handleButtonClick = (e) => {
        register(e);
        linkFamilyMember(email , ERelation);
        
      };


    const linkFamilyMember = async (email , ERelation) => {
        try {
          const response = await fetch(`/api/patient/linkFamilyMember?EmailorPhhone=${email}&relation=${ERelation}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            setMessage( 'Patient not founded.');
            return;
          }
          
    
          setMessage('Family Member is added.');
          window.location.reload();
          return;
        } catch (error) {
          setMessage('Internal Server Error.');
          console.error('Error:', error);
        }
      };

    const register = async (e) => {
        e.preventDefault()

        const Patient = {
            username, name, email, password, dob, gender, 
            mobile_number: mobileNumber, Efull_name: EName, Emobile_number: EMobile, relation: ERelation  , health_records: healthRecords
        }

        

        const response = await fetch('http://localhost:4000/api/signup', {
            method: 'POST',
            body: JSON.stringify(Patient),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(name, ERelation);
            setError(json.error)
            console.log(error);
        }

        if(response.ok){
            setUsername('')
            setPassword('')
            setName('')
            setEmail('')
            setDob('')
            setGender('')
            setMobile('')
            setEname('')
            setEMobile('')
            setERelation('')
            setHealthRecords('')
            setError(null)
            console.log("Patient Created", json[0]);
            setMessage("Patient Created Successfuly")
        }
    }


    return(
        <header>
            <h1>Sign Up</h1>

            
            <br />
            <div className="message">
                <h6>{message}</h6>
            </div>
            <br /><br />
            <div className="signUp">
                <form className="createPatient" onSubmit={register}>
                Username: 
                <label className="label">
                    <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="value" 
                    />
                </label>
                <hr />
                <label>
                    Password: 
                    <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text" />
                </label>
                <hr />
                <label>
                    Name: 
                    <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
                </label>
                <hr />
                <label>
                    Email: 
                    <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" />
                </label>
                <hr />
                <label>
                    Date of Birth: 
                    <input type='date'
                        placeholder='Enter BirthDate'
                        value={dob} onChange={e => setDob(e.target.value)}
                        name='birthdate'
                        max={current}
                        />
                </label>
                <hr />
                <p>
            Choose Gender:
            <label>
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
              Female
            </label>
          </p>
                    <hr />
                <label>
                    Mobile Number: 
                    <input 
                    value={mobileNumber}
                    onChange={e => setMobile(e.target.value)}
                    type="text" />
                </label>
                <hr />
                Emergency Contact:
                <br /> <br />
                <label>
                    Full Name: 
                    <input 
                    value={EName}
                    onChange={e => setEname(e.target.value)}
                    type="text" />
                </label>
                <br />
                <label>
                    Mobile Number: 
                    <input 
                    value={EMobile}
                    onChange={e => setEMobile(e.target.value)}
                    type="text" />
                </label>
                <br />
                <label>
                    Relation to the Patient: 
                    <input 
                    value={ERelation}
                    onChange={e => setERelation(e.target.value)}
                    type="text" />
                </label>
                <br/>
                
                <label>
                    Health Record: 
                    <input 
                    value={healthRecords}
                    onChange={(e) => setHealthRecords(e.target.value)}
                    type="text" />
                </label>
                
                <br /><br />
                <button onClick={(e) =>handleButtonClick(e)}>Add Family Member</button>

                <Link className='login-button' to="/">
                login instead
            </Link>

                </form>
            </div>
        </header>
    )
}

export default SignUp;