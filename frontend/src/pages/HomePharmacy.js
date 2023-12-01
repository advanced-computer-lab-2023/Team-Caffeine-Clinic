import { useEffect } from "react"
import { useMedicinesContext } from "../hooks/useMedicinesContext"
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import MedicineDetails from "../components/MedicineDetails"
import MedicineForm from "../components/MedicineForm"

const Home = () => {
  const {  medicines, dispatch } = useMedicinesContext()
  const {user  } = useAuthContext()

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicine/viewAvailableMedicine')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_MEDICINES', payload: json})
      }
    }

    fetchMedicines()
  }, [dispatch])

  return (
    <><header>
      <Navbar />
    </header><div className="home">
        <div className="workouts">
          {medicines && medicines.map(medicine => (
            <MedicineDetails key={medicine._id} medicine={medicine} />
          ))}

        </div>
        { user&&user.type=="Pharmacist" &&
        <MedicineForm />}
      </div></>
  )
}

export default Home