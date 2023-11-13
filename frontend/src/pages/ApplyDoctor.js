import { useNavigate, Link } from 'react-router-dom'

import { useEffect, useState} from 'react';

import {Button, Form} from 'react-bootstrap'

const SignUp = () => {
    const current = new Date().toISOString().split("T")[0]

    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [rate, setRate] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [education, setEducation] = useState('');
    const [ID, setID] = useState(null);
    const [Medical_licenses, setMedical_licenses] = useState(null);
    const [Medical_degree, setMedical_degree] = useState(null);

    
    const [error, setError] = useState(null);

    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
  
      // Define your password validation regex
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      // Validate the password against the regex
      const isValidPassword = passwordRegex.test(newPassword);
      setIsValid(isValidPassword);
    }; 

    const register = async (e) => {
        e.preventDefault()

        const DoctorApplication = {
            username: username, password: password, email: email, 
            name: name, speciality: speciality, rate: rate, affiliation: affiliation, education: education,
            ID:ID,Medical_licenses:Medical_licenses,Medical_degree:Medical_degree
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
            setID('');
            setMedical_licenses('');
            setMedical_degree('');
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
            window.alert('Doctor Application Created Successfully')
            navigate('/')
            setMessage("Doctor Application Created Successfully")
        }
    }
    const fileToBase64 = (file, cb) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          cb(null, reader.result)
        }
        reader.onerror = function (error) {
          cb(error, null)
        }
      }
      const onUploadFileChangeID = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
          return
        }
        fileToBase64(target.files[0], (err, result) => {
          if (result) {
            setID(result)
          }
        })
      }
      const onUploadFileChangeMedical_licenses = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
          return
        }
        fileToBase64(target.files[0], (err, result) => {
          if (result) {
            setMedical_licenses(result)
          }
        })
      }
      const onUploadFileChangeMedical_degree = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
          return
        }
        fileToBase64(target.files[0], (err, result) => {
          if (result) {
            setMedical_degree(result)
          }
        })
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
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={isValid ? 'valid' : 'invalid'}
                />
                {!isValid && <p className="error-message">Password must be at least 8 characters long and include at least one letter and one number.</p>}
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
                <br />
                <label>
                Upload ID(pdf):
                        <input
                        type="file"
                        class="form-control"
                        accept="application/pdf"
                        required
                        onChange={onUploadFileChangeID}/>
                </label>
                <br />
                <label>
                Upload Medical_licenses(pdf):
                        <input
                        type="file"
                        class="form-control"
                        accept="application/pdf"
                        required
                        onChange={onUploadFileChangeMedical_licenses}/>
                </label>
                <br />
                <label>
                Upload Medical_degree(pdf):
                        <input
                        type="file"
                        class="form-control"
                        accept="application/pdf"
                        required
                        onChange={onUploadFileChangeMedical_degree}/>
                </label>
                <br />
                
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