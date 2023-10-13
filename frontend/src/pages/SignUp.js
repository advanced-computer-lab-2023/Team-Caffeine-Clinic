import { Link } from 'react-router-dom'

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBRadio,
    MDBSelect
  }
  from 'mdb-react-ui-kit';

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

    const [EName, setEname] = useState('');
    const [EMobile, setEMobile] = useState('');
    const [ERelation, setERelation] = useState('');
    
    const [error, setError] = useState(null);

    const register = async (e) => {
        e.preventDefault()

        const Patient = {
            username, name, email, password, dob, gender, 
            mobile_number: mobileNumber, Efull_name: EName, Emobile_number: EMobile, relation: ERelation 
        }

        

        const response = await fetch('/api/signup', {
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
            Radio buttons:
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
                <br /><br />
                <Button variant="dark" type="submit">
                    Register
                </Button>
                </form>
            </div>
        </header>
    )
}

export default SignUp;