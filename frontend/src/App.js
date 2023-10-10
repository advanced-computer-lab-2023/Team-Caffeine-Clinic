// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorInfo from './pages/seedoc';
import Navbar from './components/Navbar';
import EditMyDoc from './pages/EditDocRate';
import UpdateEmail from './pages/EditDocEmail';
import UpdateAffiliation from './pages/EditDocHos';
import MyPatients from './pages/ViewPatients';
import UsernameProvider  from './pages/UsernameContext'; // Import the context
import PatientsWithUpcomingAppointments from './pages/UpcomingAppointments'
import SelectPatient from './pages/SearchPatient'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='Navbar'>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>
             
              <Route path="EditDocRate" element={<EditMyDoc />} />
              <Route path="seedoc" element={<DoctorInfo />} />
              <Route path="EditDocEmail" element={<UpdateEmail />} />
              <Route path="EditDocHos" element={<UpdateAffiliation />} />
              <Route path="ViewPatients" element={<MyPatients />} />
              <Route path="UpcomingAppointments" element={<PatientsWithUpcomingAppointments />} />
              <Route path="SearchPatient" element={<SelectPatient />} />

            </Routes>
          </UsernameProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
