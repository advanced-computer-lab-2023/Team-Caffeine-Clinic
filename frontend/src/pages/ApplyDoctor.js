import { Link } from 'react-router-dom'

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

const SignUp = () => {
    const current = new Date().toISOString().split("T")[0]

    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [rate, setRate] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [education, setEducation] = useState('');
    
    const [error, setError] = useState(null);

    const register = async (e) => {
        e.preventDefault()

        const DoctorApplication = {
            username: username, password: password, email: email, 
            name: name, speciality: speciality, rate: rate, affiliation: affiliation, education: education
        }
        

        const response = await fetch('/api/applyDoctor', {
            method: 'POST',
            body: JSON.stringify(DoctorApplication),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log(error);
        }

        if(response.ok){
            setUsername('')
            setPassword('')
            setEmail('')
            setAffiliation('')
            setEducation('')
            setRate('')
            setName('')
            setSpeciality('')
            setError(null)
            console.log("Doctor Application Created", json[0]);
            setMessage("Doctor Application Created Successfully")
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
                speciality: 
                    <input type='text'
                        placeholder='Enter Speciality'
                        value={speciality} onChange={e => setSpeciality(e.target.value)}
                        />
                </label>
                <hr />
                <label>
                    Hourly Rate: 
                    <input 
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                    type="text" />
                </label>
                <hr />
                <label>
                    Affiliation (Hospistal Name): 
                    <input 
                    value={affiliation}
                    onChange={e => setAffiliation(e.target.value)}
                    type="text" />
                </label>
                <br />
                <label>
                    Education: 
                    <input 
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    type="text" />
                </label>
                <br /><br />
                <Button variant="dark" type="submit">
                    Apply
                </Button>

                <Link className='login-button' to="/">
                login instead
            </Link>
                </form>
            </div>
        </header>
    )
}

export default SignUp;