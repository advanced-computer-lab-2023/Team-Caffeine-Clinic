import { useEffect } from "react";
import { useMedicinesContext } from "../hooks/useMedicinesContext";
import Navbar from '../components/Navbar';
import { useAuthContext } from '../hooks/useAuthContext';
import PharmacyHeroSection from "../components/PharmacyHeroSection";

// components
import MedicineDetails from "../components/MedicineDetails";
import MedicineForm from "../components/MedicineForm";
import Notification from '../components/Notification';

const Home = () => {
  const { medicines, dispatch } = useMedicinesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicine/viewAvailableMedicine');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MEDICINES', payload: json });
      }
    };

    fetchMedicines();
  }, [dispatch]);

  return (
    <div>
      <header>
        <Navbar />
        {user && user.type === "Pharmacist" && <Notification></Notification>}
      </header>
      <PharmacyHeroSection />

    <div className="site-section">
      <div className="container">
      <div className="row">
          <div className="title-section text-center col-12">
            <h2 className="text-uppercase">Medicines</h2>
          </div>
        </div>       
        <div className="row">
       {medicines &&
          medicines.map((medicine) => (
            ((user.type === "Patient" && !medicine.Archive && medicine.Name) ||
              (user.type !== "Patient" && medicine.Name)) && (
              <div key={medicine._id} className="col-sm-6 col-lg-4 text-center item mb-4">
                <MedicineDetails medicine={medicine} />
              </div>
            )
          ))}

        </div>
        {user && user.type === "Pharmacist" &&
          <MedicineForm />
        }
      </div>
    </div>
    </div>
  );
}

export default Home;
