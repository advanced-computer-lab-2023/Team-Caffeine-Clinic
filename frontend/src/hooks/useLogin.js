import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        // Helper function for login attempt
        const attemptLogin = async (role, apiUrl) => {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });

                window.open(role === 'admin' ? "/AdminHome" : "/Home", "_self");
                return true;
            }

            return false;
        };

        // Attempt login as Patient, Doctor, Pharmacist, and Admin in sequence
        const roles = [
            { role: 'patient', apiUrl: '/api/loginAsPatient' },
            { role: 'doctor', apiUrl: '/api/loginAsDoctor' },
            { role: 'pharmacist', apiUrl: '/api/loginAsPharmacist' },
            { role: 'admin', apiUrl: '/api/loginAsAdmin' },
        ];

        for (const { role, apiUrl } of roles) {
            try {
                const success = await attemptLogin(role, apiUrl);
                if (success) return;
            } catch (error) {
                console.error(`${role} login error:`, error.message);
            }
        }

        // If none of the login attempts were successful
        setIsLoading(false);
        setError('Login failed. Please check your credentials and try again.');
    };

    return { login, isLoading, error };
};


// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';

// export const useLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { dispatch } = useAuthContext();

//   const login = async (username, password) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       let response = await fetch('/api/loginAsPatient', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.status !== 200) {
//         throw new Error('Patient login failed');
//       }

//       const json = await response.json();
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json));
//       // update AuthContext
//       dispatch({ type: 'LOGIN', payload: json });

//       setIsLoading(false);
//     } catch (patientError) {
//       // Handle patient login error
//       console.error('Patient login error:', patientError.message);

//       try {
//         let response = await fetch('/api/loginAsDoctor', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.status !== 200) {
//           throw new Error('Doctor login failed');
//         }

//         const json = await response.json();
//         // save the user to local storage
//         localStorage.setItem('user', JSON.stringify(json));
//         // update AuthContext
//         dispatch({ type: 'LOGIN', payload: json });

//         setIsLoading(false);
//       } catch (doctorError) {
//         // Handle doctor login error
//         console.error('Doctor login error:', doctorError.message);

//         try {
//           let response = await fetch('/api/loginAsAdmin', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//           });

//           if (response.status !== 200) {
//             throw new Error('Admin login failed');
//           }

//           const json = await response.json();
//           // save the user to local storage
//           localStorage.setItem('user', JSON.stringify(json));
//           // update AuthContext
//           dispatch({ type: 'LOGIN', payload: json });

//           setIsLoading(false);
//         } catch (adminError) {
//           // Handle admin login error
//           console.error('Admin login error:', adminError.message);
//           setIsLoading(false);
//           setError('Login failed. Please check your credentials and try again.');
//         }
//       }
//     }
//   };

//   return { login, isLoading, error };
// };
