import { Link } from 'react-router-dom'

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

const SignUp = () => {
    const current = new Date().toISOString().split("T")[0]

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobile] = useState('');

    const [EName, setEname] = useState('');
    const [EMobile, setEMobile] = useState('');
    const [ERelation, setRelation] = useState('');
    
    const [error, setError] = useState(null);

    const register = async (e) => {
        e.preventDefault()

        const Patient = {
            username, name, email, password, dob, gender, mobileNumber, EName, EMobile, ERelation 
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
            setError(json.error)
            console.log(error);
        }

        if(response.ok){
            setError(null)
            console.log("Patient Created", json);
        }
    }

    return(
        <header>
            <div className="signUp">
                <Form className="createPatient" onSubmit={register}>
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
                        <input type="radio" name="myRadio" value={gender} onChange={e => setGender(e.target.value)} />
                       Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="myRadio"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            defaultChecked={true} 
                        />
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
                    Relation:
                    <select>

                        <option value={ERelation} 
                            onChange={e => setRelation(e.target.value)}
                        >Wife</option>

                        <option value={ERelation} 
                            onChange={e => setRelation(e.target.value)}>
                        Husband</option>

                        <option value={ERelation} 
                            onChange={e => setRelation(e.target.value)}>
                        Child</option>

                        <option value={ERelation} 
                            onChange={e => setRelation(e.target.value)}>
                        Father</option>

                        <option value={ERelation} 
                            onChange={e => setRelation(e.target.value)}>
                        Mother</option>

                    </select>
                </label>
                <br /><br />
                <Button variant="dark">
                    Register
                </Button>
                </Form>
            </div>
        </header>
    )
}

export default SignUp;