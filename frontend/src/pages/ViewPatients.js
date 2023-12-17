import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useAuthContext();

  const fetchPatientDetails = async (patientUsername) => {
    try {
      const response = await fetch(`/api/doctorInfo/selectpatient?name=${patientUsername}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }

      const data = await response.json();
      setSelectedPatient(data.patient);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch patient details');
    }
  };

  useEffect(() => {
    const fetchDoctorPatients = async () => {
      try {
        const response = await fetch(`/api/doctorInfo/myPatients/`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        setPatients(data.patientUsernames);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch patients');
      }
    };

    if (user) {
      fetchDoctorPatients();
    }
  }, [user]);

  const displayPatientDetails = (patientUsername) => {
    if (selectedPatient) {
      return (
        <div>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>

          {selectedPatient.emergency_contact && (
            <div>
              <p><strong>Emergency Contact:</strong></p>
              <p><strong>Name:</strong> {selectedPatient.emergency_contact.full_name}</p>
              <p><strong>Mobile Number: </strong>{selectedPatient.emergency_contact.mobile_number}</p>
              <p><strong>Relation: </strong>{selectedPatient.emergency_contact.relation_to_the_patient}</p>
            </div>
          )}

          <br />
        </div>
      );
    } else {
      return null;
    }
  };

  const filteredPatients = patients.filter(patientUsername =>
    patientUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>View My patients</h2>
            <ol>
              <li><Link to="../DoctorHome">Home</Link></li>
              <li>View My Patients</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="faq" className="faq section-bg">
        <div className="container">
          <div className="section-title">
            <h2>All Patients</h2>
            <p>Click on a patient to view their information</p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by username"
              className='form-control'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
          </div>
          <div className="faq-list">
            {filteredPatients.map((patientUsername) => (
              <ul key={patientUsername}>
                <li data-aos="fade-up">
                  <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse"
                    className="collapse"
                    data-bs-target={`#faq-list-${patientUsername}`}
                    onClick={() => fetchPatientDetails(patientUsername)}><strong>Patient: </strong>{patientUsername}<i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                  <div id={`faq-list-${patientUsername}`} className="collapse show" data-bs-parent=".faq-list">
                    <p>
                      {selectedPatient && displayPatientDetails(patientUsername)}
                    </p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPatients;
