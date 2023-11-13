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
    const [ID, setID] = useState(null);
    const [Medical_licenses, setMedical_licenses] = useState(null);
    const [Medical_degree, setMedical_degree] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const [error, setError] = useState(null);

    const register = async (e) => {
      e.preventDefault();
      setLoading(true);

      const DoctorApplication = {
          username,
          password,
          email,
          name,
          speciality,
          rate,
          affiliation,
          education,
          ID,
          Medical_licenses,
          Medical_degree,
      };

      try {
          const response = await fetch('/api/applyDoctor', {
              method: 'POST',
              body: JSON.stringify(DoctorApplication),
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          const json = await response.json();

          if (!response.ok) {
              setError(json.error);
              console.log(error);
          } else {
              setID('');
              setMedical_licenses('');
              setMedical_degree('');
              setUsername('');
              setPassword('');
              setEmail('');
              setAffiliation('');
              setEducation('');
              setRate('');
              setName('');
              setSpeciality('');
              setError(null);
              console.log('Doctor Application Created', json[0]);
              setMessage('Doctor Application Created Successfully');
          }
      } catch (error) {
          console.error('Error during registration:', error);
          setError('An error occurred during registration.');
      } finally {
          setLoading(false);
      }
  };
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
                <label>
    Password: 
    <input 
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password" // Set the type to "password"
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
                
                <Button variant="dark" type="submit" disabled={loading}>
                        {loading ? 'Applying...' : 'Apply'}
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