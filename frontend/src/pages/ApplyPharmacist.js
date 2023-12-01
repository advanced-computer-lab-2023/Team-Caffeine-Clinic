import { useEffect, useState} from 'react';
import * as React from 'react';
import {Button, Form} from 'react-bootstrap'

const SignUp = () => {

    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [rate, setRate] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [education, setEducation] = useState('');
    const [ ID, setID ] = useState(null)
    const [ Degree, setDegree ] = useState(null)
    const [ License, setLicense ] = useState(null)
    const [error, setError] = useState(null);
  
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
            // setFileNameID(target.files[0])
          }
        })
      }

      const onUploadFileChangeLicense = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
          return
        }
        fileToBase64(target.files[0], (err, result) => {
          if (result) {
            setLicense(result)
          }
        })
      }
      const onUploadFileChangeDegree = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
          return
        }
        fileToBase64(target.files[0], (err, result) => {
          if (result) {
            setDegree(result)
          }
        })
      }

    const register = async (e) => {
        e.preventDefault()


        const PharmacistApplication = {
            ID:ID,Degree:Degree,License:License,username: username, password: password, email: email, 
            name: name, speciality: speciality, rate: rate, affiliation: affiliation, education: education
        }
        
        
        const response = await fetch('/api/applyPharmacist', {
            method: 'POST',
            body: JSON.stringify(PharmacistApplication),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setMessage("Incorrect Information")
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
            setMessage("Pharmacist Application Created Successfully")
            setTimeout(function(){
                window.open(`/`,'_self');
           }, 1500);

        }
        
    }
    const loginpage = (e) => {
        e.preventDefault();
        window.open("/","_self")
    }
    return(
        <header>
            <h1>Apply As A Pharmacist</h1>
            <br />
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
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                     />
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
                Speciality: 
                    <input type='text'
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
                <label>
                Upload ID (pdf):
                <input
                 type="file"
                 class="form-control"
                 accept="application/pdf"
                 required
                onChange={onUploadFileChangeID}/>
                </label>
                <br />
                <label>
                Upload Pharmacy Degree (pdf):
                <input
                 type="file"
                 class="form-control"
                 accept="application/pdf"
                 required
                onChange={onUploadFileChangeDegree}/>
                </label>
                <br />
                <label>
                Upload Working License(pdf):
                <input
                 type="file"
                 class="form-control"
                 accept="application/pdf"
                 required
                onChange={onUploadFileChangeLicense}/>
                </label><br></br>
                <br />
                <div className="message">
                    <h6>{message}</h6>
                </div>
                {error && <div className='error'>{error}</div>}
                <Button  variant="dark" type="submit">
                    Apply
                </Button>
                <br></br>
                <br></br>
                <Button variant="dark" onClick={loginpage}>
                    Login instead
                </Button>
                </form>
            </div>
        </header>
    )
}

export default SignUp;