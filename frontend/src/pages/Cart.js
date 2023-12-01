import { useEffect } from "react"
import { useMedicinesContext } from "../hooks/useMedicinesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// components
import MedicineDetails from "../components/MedicineDetails"

const Home = () => {
  const {medicines, dispatch} = useMedicinesContext()
  const {user} = useAuthContext()  

  useEffect(() => {
  let fetchMedicines = async () => {
    try{ 
    const response = await fetch('/api/patient/userCart',{
            method:'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_MEDICINES', payload: json})
      }
    
    }
    catch(error){
    }
  }

    fetchMedicines()
  }, [dispatch,user])

  return (
    <><header>
      <Navbar />
    </header>
    <div className="home">
        <div className="workouts">
          {medicines && medicines.map(medicine => (
            <MedicineDetails key={medicine._id} medicine={medicine} />
          ))}
          {medicines && medicines.length != 0 && <Link to="/Checkout"><button>Checkout</button></Link>}
        </div>
      </div>
      </>
  )
}

export default Home