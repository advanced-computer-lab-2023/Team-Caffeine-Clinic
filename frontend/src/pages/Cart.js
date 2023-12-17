import { useEffect } from "react"
import { useMedicinesContext } from "../hooks/useMedicinesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    <div className="row">
          <div className="title-section text-center col-12">
            <h2 className="text-uppercase">My Cart</h2>
          </div>
        </div>  
    <div className="row">
          {medicines && medicines.map(medicine => (
            <div key={medicine._id} className="col-sm-6 col-lg-4 text-center item mb-4">
            <MedicineDetails key={medicine._id} medicine={medicine} />
            </div>
          ))}
    </div>
    <div className="row">
    <div className="title-section text-center col-12">
      <br></br>
          {medicines && medicines.length != 0 && <Link to="/Checkout"><button style={{padding:"20px", background:"brown"}} >Checkout 
           <FontAwesomeIcon
           icon={faArrowRight}></FontAwesomeIcon></button></Link>}
          </div>
    </div>      
      </>
  )
}

export default Home