import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)
        
        let response = await fetch('http://localhost:4000/api/loginAsPatient', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })

        if(response.status != 200){
            response = await fetch('http://localhost:4000/api/loginAsDoctor', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
        })
        }

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update AuthContext
            dispatch({type: 'LOGIN', payload: json})
            
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
} 