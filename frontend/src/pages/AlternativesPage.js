// AlternativesPage.js
import React, { useEffect,useState } from 'react';
import MedicineDetails from '../components/MedicineDetails';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const AlternativesPage = () => {
  const { state } = useLocation();
  console.log(state)
  const [alternatives,setalternatives]=useState([]);

  return (
    <><header>
      <Navbar />
    </header><div className="home-pharmacy">
        <div className="workouts">
          {state && state.alternatives.length>0 && state.alternatives.map(medicine => (
            <MedicineDetails key={medicine._id} medicine={medicine} />
          ))}
        </div>
      </div></>
  )
};

export default AlternativesPage;