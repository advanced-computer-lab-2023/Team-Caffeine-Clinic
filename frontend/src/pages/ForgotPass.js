import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPass() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOTP] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [emailVisible, setEmailVisible] = useState(true);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [disableEmail, setDisableEmail] = useState(false)
    const [disableVerify, setDisableVerify] = useState(false)

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setNewPassword(newPassword);
    
        // Define your password validation regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
    
        // Validate the password against the regex
        const isValidPassword = passwordRegex.test(newPassword);
        setIsValid(isValidPassword);
      }; 
    
    const sendEmail = async() => {
        try{
        const response = await fetch('http://localhost:4000/api/forgotPass', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
          });

          if(response.ok){
            setOtpSent(true);
            setDisableEmail(true)
            setEmailVisible(false)
            setSuccessMessage('OTP sent to your email.');
            setErrorMessage('');
          } else {
            setErrorMessage('Failed to send OTP. Please try again.');
          }
          
        }catch(error){
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
        }
    }

    const verifyOTP = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, email }),
            });
    
            const data = await response.json(); 
            console.log('Status:', response.status);
            console.log('Body:', data);
    
            if (response.ok) {
                setOtpVerified(true);
                setDisableVerify(true)
                setOtpSent(false)
                setSuccessMessage('OTP verified. You can now set a new password.');
                setErrorMessage('');
            } else {
                setErrorMessage(data.message || 'Failed to verify OTP. Please try again.'); // Use the message from the server if available
                setOtpVerified(false);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred during OTP verification. Please try again.');
            setOtpVerified(false);
        }
    };
    

    const handleSetNewPassword = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/setPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword, email }),
            });

            if (response.ok) {
                setSuccessMessage('Password has been reset successfully.');
                setErrorMessage('');
                window.alert('Password has been reset successfully.');
                navigate('/')
            } else {
                setErrorMessage('Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while resetting the password. Please try again.');
        }
    };


    return (
        <div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
    
            {emailVisible ? (
            <div>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disableEmail}
                />
                <button onClick={sendEmail} disabled={disableEmail}> Send OTP </button>
            </div> ) : <div><label htmlFor="email"><strong>Email:</strong></label> {email} </div> }
    
            {otpSent && (
                <div>
                    <label htmlFor="otp"><strong>OTP:</strong></label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        disabled={disableVerify}
                    />
                    <button onClick={verifyOTP} disabled={disableVerify}> Verify OTP </button>
                </div>
            )}
            
            {otpVerified && (
                <div>
                    <label htmlFor="new-password"><strong>New Password:</strong></label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className={isValid ? 'valid' : 'invalid'}
                    />
                    <button onClick={handleSetNewPassword}> Change Password </button>
                    {!isValid && <div className="error">Password must be at least 8 characters long and include at least one letter and one number.</div>}
                </div>
            )}
        </div>
    );
}

export default ForgotPass;