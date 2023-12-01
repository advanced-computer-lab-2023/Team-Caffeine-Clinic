import { useEffect } from "react"
import {useState} from "react";
import { useParams} from 'react-router-dom';
import Navbar from '../components/Navbar'

// components
import MedicineDetails from "../components/MedicineDetails"

const FilterResults = () => {
    const [medicines, setMedicine] = useState(null)
    const {filter}= useParams();

  useEffect(() => {
    const fetchMedicines = async () => {
    const response = await fetch(`/api/medicine/filter/${filter}`)
      
      const json = await response.json()
      if (response.ok) {
        setMedicine(json)
      }
    }
    fetchMedicines()
  },[filter])

  return (
    <><header>
      <Navbar />
    </header><div className="home">
        <div className="workouts">
          {medicines && medicines.map(medicine => (
            <MedicineDetails key={medicine._id} medicine={medicine} />
          ))}
        </div>
      </div></>
  )
}

export default FilterResults