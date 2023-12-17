import { Link } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext';

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

const SignUp = () => {
    const current = new Date().toISOString().split("T")[0]

    const [message, setMessage] = useState('')
    const margin = {
        marginTop: '70px',
      }
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
        <div style={margin}>
            <section id="appointment" className="appointment section-bg">
                <div className="container">
            <div className="section-title">
          <h2>Add Family Member</h2>
            </div> 
            
                <form className="create php-email-form" onSubmit={register}>
                <div className="row">
                <div className="col-md-4 form-group">
                <label>Name:</label>
                    <input 
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>Username: </label>
                    <input
                    value={username}
                    className="form-control"
                    onChange={e => setUsername(e.target.value)}
                    type="value" 
                    />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>
                    Password: </label>
                    <input 
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text" />
                </div>
                </div>

                <div class="row">
                <div className="col-md-4 form-group">
                <label>Email:</label>
                    <input 
                    value={email}
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                    type="email" />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>Date of Birth:</label>
                    <input type='date'
                        placeholder='Enter BirthDate'
                        className="form-control"
                        value={dob} onChange={e => setDob(e.target.value)}
                        name='birthdate'
                        max={current}
                        />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>Mobile Number:</label>
                    <input 
                    value={mobileNumber}
                    className="form-control"
                    onChange={e => setMobile(e.target.value)}
                    type="text" />
                </div>
          </div>
          <div class="row">
          <div className="col-md-4 form-group" >
            Choose Gender:
            <label>
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
              Female
            </label>
          </div>
          </div>
                <hr />
                <h4> Emergency Contact</h4>
                <div class="row">
                 <div className="col-md-4 form-group">
                <label>
                    Full Name: </label>
                    <input 
                    className="form-control"
                    value={EName}
                    onChange={e => setEname(e.target.value)}
                    type="text" />
                
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>
                    Mobile Number:</label> 
                    <input 
                    value={EMobile}
                    className="form-control"
                    onChange={e => setEMobile(e.target.value)}
                    type="text" />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                <label>
                    Relation to the Patient: </label>
                    <input 
                    value={ERelation}
                    className="form-control"
                    onChange={e => setERelation(e.target.value)}
                    type="text" />
                </div>
                </div>
                <div class="row">
                <div className="col-md-4 form-group">
                <label>
                    Health Record: (emergency contact)</label>
                    <input 
                    value={healthRecords}
                    className="form-control"
                    onChange={(e) => setHealthRecords(e.target.value)}
                    type="text" />
                
                </div>
                </div>
                <br />

                <div className="text-center">
  <button type="submit" onClick={(e) => handleButtonClick(e)}>Add Family Member</button>
</div>

                </form>
            </div>
            </section>
        </div>
    )
}

export default SignUp;