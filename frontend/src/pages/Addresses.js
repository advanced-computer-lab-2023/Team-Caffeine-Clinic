import { useEffect } from "react"
import { useAddressesContext } from "../hooks/useAddressesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// components

const Addresses = () => {
  const {addresses, dispatch} = useAddressesContext()
  const {user} = useAuthContext()
  const [address,setaddress] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAdresses = async () => {
      try{
        const response = await fetch('/api/patient/deliveryaddresses',{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_ADDRESS', payload: json})
        }
      }
      catch(error){
      }
    }

    fetchAdresses()
  }, [dispatch,user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const input = {address}
    
    const response = await fetch('/api/patient/addAddress', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setaddress('')
      dispatch({type: 'CREATE_ADDRESS', payload: json})
    }

  }

  return (
    <><header>
      <Navbar />
    </header>
      <div className="home">
          <div className="workouts">
            {user && addresses && addresses.map(address => (
              <p><strong>Address : </strong>{address}</p>
            ))}
          </div>
      <form className="create" onSubmit={handleSubmit}> 
        <h3>Add a New Address</h3>

        <label>Address:</label>
        <input 
          type="text"
          required = {true} 
          onChange={(e) => setaddress(e.target.value)} 
          value={address}
        />

        <button>Add Address</button>
        {error && <div className="error">{error}</div>}
      </form>
      </div></>
  )
}

export default Addresses