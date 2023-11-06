import React, { useState, useEffect } from 'react';

function ForgotPass() {
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')
    const [newPassword, setPass] = useState('')

    const sendEmail = async() => {
        try{
        const response = await fetch('http://localhost:4000/api/forgotPass', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
          });

          if(!response.ok){

          }
          
        }catch(error){
            console.error(error);
        }
    }

    const verifyOTP = async() => {
        try{
            const response = await fetch('http://localhost:4000/api/verifyOTP', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp, email}),
              });
    
              if(!response.ok){
    
              }
              
            }catch(error){
                console.error(error);
            }
    }

    const setNewPassword = async() => {
        try{
            const response = await fetch('http://localhost:4000/api/setPassword', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({newPassword, email}),
              });
    
              if(!response.ok){
    
              }
              
            }catch(error){
                console.error(error);
            }
    }

    return(
        <div>
            <div>
                <strong>Email:</strong>
                <input type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={sendEmail}> Send OTP </button>
            </div>

            <div>
                <strong>OTP:</strong>
                    <input type="text" 
                    id="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    />
                    <button onClick={verifyOTP}> Verify OTP </button>
            </div>

            <div>
                <strong>New Password:</strong>
                    <input type="text" 
                    id="email"
                    value={newPassword}
                    onChange={(e) => setPass(e.target.value)}
                    />
                    <button onClick={setNewPassword}> Change Password </button>
            </div>
        </div>
    );
}

export default ForgotPass;