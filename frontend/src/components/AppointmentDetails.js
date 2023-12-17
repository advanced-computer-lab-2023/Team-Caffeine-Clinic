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
      <div className="details"><strong>Doctor: </strong>{appointment.doctor.name}</div>
      <div className="details"><strong>Patient: </strong>{appointment.patient.name}</div>
      <div className="details"><strong>Date: </strong>{appointment.appointmentDate}</div>
      <div className="details"><strong>Status: </strong>{appointment.status}</div>

      <button onClick={() => handleOpen()}>Add/Update Perscription</button>
      <Popup closeOnDocumentClick={false} open={isOpen} modal nested contentStyle={contentStyle} lockScroll>
        <div className="wrapper">
          <div className="prescription_form">
            <table className="prescription" border="1">
              <tbody>
                <tr height="15%">
                  <td colSpan="2">
                    <div className="header1">
                      <div className="logo">
                        <img src={logo} alt="Hospital Logo" />
                      </div>
                      <div className="credentials">
                        <h4>{appointment.doctor.name}</h4>
                        <h6>{appointment.doctor.speciality}</h6>
                        <h6>{appointment.doctor.email}</h6>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <div className="disease_details">
                      <div className="symptoms">
                        <h4 className="d-header">Symptoms</h4>
                        <ul className="symp" data-toggle="tooltip" >
                          {symptom.map((symptom, index) => (
                            <div>
                              <li key={index}>
                                <input
                                  type="text"
                                  value={symptom}
                                  onChange={(e) => handleSymptomChange(index, e.target.value)}
                                />
                              </li>
                              <span
                                className="delete-icon"
                                onClick={() => removeSymptomSlot(index)}
                                role="button"
                                tabIndex={0}
                              >
                                &#128465;
                              </span>
                            </div>
                          ))}
                        </ul>
                        <Button className="add_symptom" onClick={addSymptom}>Add Symptom</Button>
                      </div>
                      <div className="tests">
                        <h4 className="d-header">Tests</h4>
                        <ul className="tst" data-toggle="tooltip" data-placement="bottom" title="Click to edit.">
                          {tests.map((test, index) => (
                            <div key={index}>
                              <li>
                                <input
                                  type="text"
                                  value={test}
                                  onChange={(e) => handleTestChange(index, e.target.value)}
                                />
                              </li>
                              <span
                                className="delete-icon"
                                onClick={() => removeTestSlot(index)}
                                role="button"
                                tabIndex={0}
                              >
                                &#128465;
                              </span>
                            </div>
                          ))}
                        </ul>
                        <Button className="add_symptom" onClick={addTest}>Add Test</Button>
                      </div>
                      <div className="advice">
                        <h4 className="d-header">Advice</h4>
                        <input
                          type="text"
                          value={advice}
                          onChange={(e) => setAdvice(e.target.value)}
                          placeholder='Placeholder advice content.'
                        />
                      </div>
                    </div>
                  </td>
                  <td width="60%" valign="top">
                    <span style={{ fontSize: '3em' }}>R<sub>x</sub></span> &nbsp;&nbsp;&nbsp; <b>Patient Name:</b> {appointment.patient.name}

                    <hr />
                    <div className="medicine">
                      <section className="med_list">
                        {medicine.map((medicine, index) => (
                          <div className="med" key={index}>
                            <ul>
                              <li><h4>Medicine:</h4>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <b>Name:</b>
                                  <Select
                                    className='select_medicine'
                                    options={medicineNames.map(name => ({ label: name, value: name }))}
                                    value={{ label: medicine[index], value: medicine[index] }}
                                    onChange={(selectedOption) => handleMedicineChange(index, selectedOption.value)}
                                    styles={{
                                      control: (provided) => ({
                                        ...provided,
                                        width: '200px', // Adjust the height as needed
                                      }),
                                    }}
                                  />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <b>Dosage:</b> <input
                                    className="med_name"
                                    placeholder="Enter Dosage"
                                    value={dosage[index]}
                                    onChange={(e) => handleDosageChange(index, e.target.value)}
                                  /></div>
                                <span
                                  className="delete-icon"
                                  onClick={() => removeMedicineSlot(index)}
                                  role="button"
                                  tabIndex={0}
                                >
                                  &#128465;
                                </span>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </section>
                      <div
                        id="add_med"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Click anywhere on the blank space to add more."
                        onClick={addMedicineSlot}
                      >
                        Click to add...
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button_group">

              {/* <button className="pdf_prescription btn btn-danger">PDF</button> */}
            </div>
            <div id="snacking">Saving...</div>
            <div id="snacked">Saved!</div>
          </div>
        </div>
        <Button onClick={() => handleAddAppointment()}>Add/Update</Button>
        <Button onClick={() => handleOpen()}>Close</Button>
      </Popup>
    </div>
  )
}

export default AppointmentDetail;