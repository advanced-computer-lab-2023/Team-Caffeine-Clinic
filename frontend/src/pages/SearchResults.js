import { useEffect } from "react"
import {useState} from "react";
import { useParams} from 'react-router-dom';
import Navbar from '../components/Navbar'

// components
import MedicineDetails from "../components/MedicineDetails"

const SearchResults = () => {
    const [medicines, setMedicine] = useState(null)
    const {search}= useParams();

  useEffect(() => {
    const fetchMedicines = async () => {
    const response = await fetch(`/api/medicine/search/${search}`)
      
      const json = await response.json()
      if (response.ok) {
        setMedicine(json)
      }
    }
    fetchMedicines()
  },[search])

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

export default SearchResults