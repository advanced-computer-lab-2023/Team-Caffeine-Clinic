import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DoctorDetails from '../components/DoctorDetails';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import DoctorImage from '../assets/img/doctors/doctor.jpg';
import { DockRounded } from '@mui/icons-material';

const Doctors = () => {
  const linkStyle = {
    textDecoration: 'none',
  };

  const margin = {
    marginTop: '100px',
  }
  const [dateFilter, setDateFilter] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [doctors, setDoctors] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('');
  const [doctorNames, setDoctorNames] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const user = useAuthContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      let url = '/api/healthpackage/estimateRate';

      const params = new URLSearchParams();
      if (nameFilter) params.append('name', nameFilter);
      if (specialityFilter) params.append('speciality', specialityFilter);
      if (dateFilter) params.append('date', dateFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user.user.token}`
        }
      });
      const json = await response.json();
      console.log("API Response:", json); // Add this line to log the response

      if (response.ok) {
        setDoctors(json);

        // Extract unique names, specialities, and dates
        const names = new Set(json.map(doctor => doctor.name));
        const specialities = new Set(json.map(doctor => doctor.speciality));
        const dates = new Set();
        let i = 0;
        json.forEach(doctor => {
          let list = doctor.availableDates
          if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
              dates.add(list[i])
            }
          }
        });
        console.log(json)

        setAvailableDates([...dates]);
        setDoctorNames([...names]);
        setSpecialities([...specialities]);
      }
    };

    if (user) {
      fetchDoctors();
    }


  }, [nameFilter, specialityFilter, dateFilter, user]);

  return (
    // <div className='doctors'>
    //   {doctors && doctors.map((doctor) => (
    //     <DoctorDetails key={doctor.username} doctor={doctor} />
    //   ))}
    // </div>
    <div className='doctorPage' style={margin}>
      <Link to='/ClinicChats'>Chat</Link>
      <div id="doctors" className="doctors">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {doctors && doctors.map((doctor) => (
                <div className="member mt-4 d-flex align-items-start">
                  <div className="pic">
                    <img src={DoctorImage} className="img-fluid" alt="Doctor" />
                  </div>
                  <div className="member-info">
                    <h4>Dr. {doctor.name}</h4>
                    <span>Speciality: {doctor.speciality}</span>

                    <p>Fees: {doctor.rateAfterDiscount ? doctor.rateAfterDiscount.toFixed(2) : 'Not available'} EGP</p>

                    {console.log("Available Dates:", doctor.availableDates)}
                    <p>Available Dates: {doctor.availableDates ? doctor.availableDates.join(', ') : 'Not available'}</p>

                    <br />
                    <div><Link className='button-43' to={`/doctor/getSingleDoctor/${doctor.username}`}>Book</Link></div>
                  </div>

                </div>
              ))}
            </div>

            {/* Filters - occupies 4 columns */}
            <div className="col-lg-4  mt-4">

              <div className="filter-section">
                <div className="bx bx-filter filter-title" >
                  Filters
                </div>
                <div>
                  <select
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">Select Name</option>
                    {doctorNames.map((name, index) => (
                      <option key={index} value={name}>Dr. {name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={specialityFilter}
                    onChange={(e) => setSpecialityFilter(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">Select Speciality</option>
                    {specialities.map((speciality, index) => (
                      <option key={index} value={speciality}>{speciality}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-input"
                  >
                    <option value="">Select Availablity Date</option>
                    {availableDates.map((date, index) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



    </div>
  )
}

export default Doctors;

