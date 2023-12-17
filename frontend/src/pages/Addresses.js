import { useEffect } from "react"
import { useAddressesContext } from "../hooks/useAddressesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import avatar from '../PharmacyCSS/images/avatar.png'

// components

const Addresses = () => {
  const {addresses, dispatch} = useAddressesContext()
  const {user} = useAuthContext()
  const [address,setaddress] = useState('')
  const [error, setError] = useState(null)
  const[user1,setUser1]=useState('');

  useEffect(() => {
    const fetchAdresses = async () => {
      if ( user && user.type=="Patient"){
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

      if(user && user.type=="Pharmacist"){
        try{
        const response = await fetch('/api/medicine/getUserInfo',{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
          setUser1(json);
        }
      }
      catch(error){
      }
      }
      if(user && user.type=="Patient"){
        try{
        const response = await fetch('/api/patient/getUserInfo',{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
          setUser1(json);
        }
      }
      catch(error){
      }
      }
      if(user && user.type=="Admin"){
        try{
        const response = await fetch('/api/admin/getUserInfo',{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
          setUser1(json);
        }
      }
      catch(error){
      }
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
 <div className="info">
      <h1>My Information</h1>

      <div className="detail">
      <p>
          <img src={avatar} alt="Avatar" style={{ maxWidth: '100px' }} />
        </p>
        <p>
          <strong>Name:</strong> {user1 && user1.name}
        </p>
        <p>
          <strong>Username:</strong> {user1 && user1.username}
        </p>
        <p>
          <strong>Email:</strong> {user1 && user1.email}
        </p>
      </div>

      {user && user.type=="Patient" && <div className="detail">
        <h2>Addresses</h2>
         {user && addresses && addresses.map(address => (
              <p><strong>Address : </strong>{address}</p>
            ))}
      </div>}
       
      {user && user.type=="Patient" &&
      <input 
         type="text"
          required = {true} 
         onChange={(e) => setaddress(e.target.value)} 
         value={address}
       />}
      <samp> </samp>
      {user && user.type=="Patient" &&
      <button style={{padding:"5px"}} onClick={handleSubmit}>Add Address</button>
      }
      <div className="detail">
       {user && user.type!=='Admin' && <><h2>Wallet</h2><p>
            <strong>Balance:</strong> {user1 && user1.wallet}
          </p></>
        }
      </div>
    </div>
    {error && <div className="error">{error}</div>}
  </>
  )
}

export default Addresses