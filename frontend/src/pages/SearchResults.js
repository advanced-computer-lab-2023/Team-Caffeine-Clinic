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
    <div>
        <Navbar />

    <div className="site-section" id="shop">
      <div className="container">
        <div className="row">
          <div className="title-section text-center col-12">
            <h2 className="text-uppercase">Medicines</h2>
          </div>
        </div>   

        <div className="row">

          {medicines && medicines.map((medicine) => (
          ((!medicine.Archive && medicine.Name) ||
            (medicine.Name)) && (
            <div key={medicine._id} className="col-sm-6 col-lg-4 text-center item mb-4">
              <MedicineDetails medicine={medicine} />
            </div>
          )
        ))}

        </div >
      </div>
    </div>
  </div>
  )
}

export default SearchResults