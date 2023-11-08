import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const PatientHealthRecord = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const user = useAuthContext()

  useEffect(() => {
    const fetchPatientHealthRecord = async () => {
      try {
        const response = await fetch('/api/patient/selectpatient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedPatient(data.patient);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientHealthRecord();
  }, []);

  return (
    <div className='home'>
      <h2 className='welcome-message'>Welcome to Home Page</h2>
      {selectedPatient && (
        <div>
          <h3>Selected Patient Details</h3>
          
          <p>Health Package: {selectedPatient.health_package}</p>
          <p>Health Records: {selectedPatient.health_records}</p>
          <p>Emergency Contact: {selectedPatient.emergency_contact.full_name}</p>
          <p>Emergency Contact Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
          <p>Relation to the Patient: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
          <p>Wallet: {selectedPatient.wallet}</p>
        </div>
      )}
    </div>
  );
};

export default PatientHealthRecord;
