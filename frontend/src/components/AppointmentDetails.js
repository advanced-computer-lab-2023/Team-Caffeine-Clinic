import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select';

import logo from '../img/hospital.jpg';

import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Margin } from '@mui/icons-material';

const AppointmentDetail = ({ appointment }) => {
  const [isOpen, setOpen] = useState(false);
  //const [medicine, setMedicine] = useState("");
  const [tests, setTests] = useState(['']);
  const [symptom, setSymptoms] = useState(['']);
  const [advice, setAdvice] = useState("");

  const [medicine, setMedicine] = useState(['']); // Initial state with an empty medicine
  const [dosage, setDosage] = useState(['']); // Initial state with an empty medicine

  const [medicineNames, setMedicineNames] = useState([]);

  useEffect(() => {
    const fetchMedicineNames = async () => {
      try {
        const response = await fetch('/api/medicine/viewAvailableMedicine'); // Assuming you have an API endpoint to get all medicine names
        if (!response.ok) {
          console.error('Error fetching medicine names');
          return;
        }

        const medicineData = await response.json();
        const names = medicineData.map(medicine => medicine.Name);
        setMedicineNames(names);
      } catch (error) {
        console.error('Error fetching medicine names:', error);
      }
    };

    fetchMedicineNames();
  }, []);

  const handleTestChange = (index, value) => {
    const updatedTests = [...tests];
    updatedTests[index] = value;
    setTests(updatedTests);
  };

  const removeTestSlot = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const addTest = () => {
    setTests([...tests, '']);
  };

  const addMedicineSlot = () => {
    setMedicine([...medicine, '']); // Add a new empty medicine slot
    setDosage([...dosage, '']); // Add a new empty medicine slot
  };

  const addSymptom = () => {
    setSymptoms([...symptom, ''])
  }

  const removeSymptomSlot = (index) => {
    const updatedSymptoms = [...symptom];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

  const handleSymptomChange = (index, value) => {
    const updatedSymptoms = [...symptom];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...medicine];
    updatedMedicines[index] = value;
    setMedicine(updatedMedicines);
  };

  const handleDosageChange = (index, value) => {
    const updatedDosage = [...dosage];
    updatedDosage[index] = value;
    setDosage(updatedDosage);
  };

  const removeMedicineSlot = (index) => {
    const updatedMedicines = [...medicine];
    updatedMedicines.splice(index, 1);
    setMedicine(updatedMedicines);

    const updatedDosage = [...dosage];
    updatedDosage.splice(index, 1);
    setDosage(updatedDosage);
  };

  const user = useAuthContext()

  useEffect(() => {
    const fetchName = async () => {
      // Construct the URL with the doctorID
      const url = `/api/doctorInfo/getPerscDetails?appointment=${appointment._id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });
      if (!response.ok) {
        console.log('Error fetching prescription data');
        return; // Handle the error appropriately
      }

      const perscription = await response.json();
      if (perscription) {
        console.log('ana hena');
        setMedicine(perscription.medicine)
        setDosage(perscription.dosage)
        setSymptoms(perscription.symptoms)
        setTests(perscription.tests)
        setAdvice(perscription.advice)
      }
    };
    if (user) {
      fetchName();
    }
  }, [user]);

  const handleOpen = () => {
    if (!isOpen)
      setOpen(true)
    else
      setOpen(false)
  }

  const handleAddAppointment = async () => {
    const response = await fetch('/api/doctorInfo/addPerscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment: appointment._id, patient: appointment.patient, medicine: medicine,
        tests: tests, symptoms: symptom, advice: advice, dosage: dosage
      }),
    })
    handleOpen()
  }

  const contentStyle = {
    overflowY: 'auto', // Enable vertical scrolling
    width: '880px',
    maxHeight: '100%', // Set maximum height
    padding: '20px', // Add padding as needed
    maxWidth: 'none', // Remove maximum width restriction
  };

  return (
    <div className="doctor-details">
      <div className="name">
      </div>
      <div className="details"><strong>Doctor: </strong>{appointment.doctor}</div>
      <div className="details"><strong>Patient: </strong>{appointment.patient}</div>
      <div className="details"><strong>Date: </strong>{appointment.appointmentDate}</div>
      <div className="details"><strong>Status: </strong>{appointment.status}</div>
    </div>
  )
}

export default AppointmentDetail;