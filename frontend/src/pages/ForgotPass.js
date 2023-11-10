import React, { useState, useEffect } from 'react';

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOTP] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
    
            <div>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={sendEmail}> Send OTP </button>
            </div>
    
            {otpSent && (
                <div>
                    <label htmlFor="otp"><strong>OTP:</strong></label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    <button onClick={verifyOTP}> Verify OTP </button>
                </div>
            )}
            
            {otpVerified && (
                <div>
                    <label htmlFor="new-password"><strong>New Password:</strong></label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleSetNewPassword}> Change Password </button>
                </div>
            )}
        </div>
    );
}

export default ForgotPass;