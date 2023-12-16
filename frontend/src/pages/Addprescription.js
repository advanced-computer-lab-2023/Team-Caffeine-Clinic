import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';

const Addpresc = () => {
  const [doctor, setDoctor] = useState(null);
  const [MedicineName, setMedicineName] = useState('');
  const [Diagnosis, setDiagnosis] = useState('');
  const [Dosage, setDosage] = useState(0);
  const [error, setError] = useState(null);
  const [showMedicineInputs, setShowMedicineInputs] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuthContext();
  const { PatientName } = useParams();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/doctorInfo/getDoctorByusername`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Doctor not found');
      }

      const data = await response.json();
      setDoctor(data[0]);
      setError(null);
    } catch (error) {
      setDoctor(null);
      setError('Doctor not found');
    }
  };

  useEffect(() => {
    handleSearch();
  }, []); // Empty dependency array to trigger only on initial render

  const handleAddMedicineClick = () => {
    setShowMedicineInputs(true);
  };

  const handleMedicineInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'MedicineName') {
      setMedicineName(value);
    } else if (name === 'Dosage') {
      setDosage(value);
    }
  };

  const handleDoneClick = () => {
    if (MedicineName.trim() === '' || Dosage === 0) {
      setErrorMessage('Please fill in all fields');
    } else {
      setMedicines([...medicines, { MedicineName, Dosage }]);
      setMedicineName('');
      setDosage(0);
      setShowMedicineInputs(false);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h1>Create Prescription</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {doctor && (
        <div>
          <p>Doctor Name: {doctor.name}</p>
          <p>Patient Name: {PatientName}</p>
          <p>Diagnosis: <input type='text' value={Diagnosis} /></p>
          
          <button onClick={handleAddMedicineClick}>Add Medicine</button>

          {showMedicineInputs && (
            <div>
              <p>Medicine Name: <input type='text' name='MedicineName' value={MedicineName} onChange={handleMedicineInputChange} /></p>
              <p>Medicine Dosage: <input type='number' name='Dosage' value={Dosage} onChange={handleMedicineInputChange} /></p>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button onClick={handleDoneClick}>Done</button>
            </div>
          )}

          <div>
            {medicines.length > 0 && (
              <div>
                <h2>Prescribed Medicines</h2>
                <ul>
                  {medicines.map((medicine, index) => (
                    <li key={index}>
                      {`${medicine.MedicineName}: ${medicine.Dosage}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Addpresc;
