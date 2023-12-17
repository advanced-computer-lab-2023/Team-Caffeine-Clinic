import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SignUp = () => {
  const current = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
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

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Define your password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

    // Validate the password against the regex
    const isValidPassword = passwordRegex.test(newPassword);
    setIsValid(isValidPassword);
  };

  const margin = {
    marginTop: '140px',
  }

  const register = async (e) => {
    e.preventDefault();

    const Patient = {
      username,
      name,
      email,
      password,
      dob,
      gender,
      mobile_number: mobileNumber,
      Efull_name: EName,
      Emobile_number: EMobile,
      relation: ERelation,
      health_records: healthRecords,
    };

    const response = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      body: JSON.stringify(Patient),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setUsername('');
      setPassword('');
      setName('');
      setEmail('');
      setDob('');
      setGender('');
      setMobile('');
      setEname('');
      setEMobile('');
      setERelation('');
      setHealthRecords('');
      setError(null);
      window.alert('Signed Up Successfully');
      navigate('/');
      setMessage('Patient Created Successfully');
    }
  };

  return (
    <body >
      <header id="header">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="/" style={{ textDecoration: 'none' }}>
              El7a2ne
            </a>
          </h1>
          
        </div>
      </header>

      <div style={margin} className="login-page">
        <div className="login-form-container">
          <form className="login-form" onSubmit={register}>
            <label className="label">
              Username
              <input
              className='form-control'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="value"
                placeholder="Username:"
              />
            </label>
            <hr />
            
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={isValid ? 'valid input-login form-control' : 'invalid input-login form-control'}
            />
            {!isValid && (
              <div className="error">
                Password must be at least 8 characters long and include at least one letter and one number.
              </div>
            )}
            <hr />
            <label>
              Name:
              <input className='form-control' value={name} onChange={(e) => setName(e.target.value)} type="text" />
            </label>
            <hr />
            <label>
              Email:
              <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </label>
            <hr />
            <label>
              Date of Birth:
              <input
                type="date"
                placeholder="Enter BirthDate"
                className='form-control'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                name="birthdate"
                max={current}
              />
            </label>
            <hr />
            <p>
              Choose Gender:
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </p>
            <hr />
            <label>
              Mobile Number:
              <input value={mobileNumber} onChange={(e) => setMobile(e.target.value)} type="text" />
            </label>
            <hr />
            <p>
              Emergency Contact:
              <br /> <br />
              <label>
                Full Name:
                <input className='form-control' value={EName} onChange={(e) => setEname(e.target.value)} type="text" />
              </label>
              <br />
              <label>
                Mobile Number:
                <input className='form-control' value={EMobile} onChange={(e) => setEMobile(e.target.value)} type="text" />
              </label>
              <br />
              <label>
                Relation to the Patient:
                <select className='form-control' value={ERelation} onChange={(e) => setERelation(e.target.value)}>
                  <option value="">Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Husband">Husband</option>
                  <option value="Wife">Wife</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <br />
              <label>
                Health Record:
                <input
                className='form-control'
                  value={healthRecords}
                  onChange={(e) => setHealthRecords(e.target.value)}
                  type="text"
                />
              </label>
            </p>
            <br />
            <Button variant="dark" type="submit" className="login-button">
              Register
            </Button>
            
          </form>
        </div>
      </div>
    </body>
  );
};

export default SignUp;
