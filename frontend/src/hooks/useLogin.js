import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      let response = await fetch('http://localhost:4000/api/loginAsPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.status !== 200) {
        throw new Error('Patient login failed');
      }

      const json = await response.json();
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // update AuthContext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    } catch (patientError) {
      // Handle patient login error
      console.error('Patient login error:', patientError.message);


      try {
        let response = await fetch('http://localhost:4000/api/loginAsDoctor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (response.status !== 200) {
          throw new Error('Doctor login failed');

        if(!response.ok){
            setIsLoading(false)
            setError("Login failed. Please check your username and password and try again.")

        }

        const json = await response.json();
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));
        // update AuthContext
        dispatch({ type: 'LOGIN', payload: json });

        setIsLoading(false);
      } catch (doctorError) {
        // Handle doctor login error
        console.error('Doctor login error:', doctorError.message);

        try {
          let response = await fetch('http://localhost:4000/api/loginAsAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (response.status !== 200) {
            throw new Error('Admin login failed');
          }

          const json = await response.json();
          // save the user to local storage
          localStorage.setItem('user', JSON.stringify(json));
          // update AuthContext
          dispatch({ type: 'LOGIN', payload: json });

          setIsLoading(false);
        } catch (adminError) {
          // Handle admin login error
          console.error('Admin login error:', adminError.message);
          setIsLoading(false);
          setError('Login failed. Please check your credentials and try again.');
        }
      }
    }
  };

  return { login, isLoading, error };
};
