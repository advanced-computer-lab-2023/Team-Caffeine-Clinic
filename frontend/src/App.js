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
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp';
import Doctors from './pages/doctors';
import FamilyMembers from './pages/familyMembers';
import Perscription from './pages/Perscriptions';
import SinglePerscriptions from './pages/SinglePerscriptionDetails'
import DoctorNavbar from './components/DoctorNavbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='Navbar'>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>
             
              <Route path="EditDocRate" element={<WithDoctorNavbar><EditMyDoc /></WithDoctorNavbar>} />
              <Route path="seedoc" element={<WithDoctorNavbar><DoctorInfo /></WithDoctorNavbar>} />
              <Route path="EditDocEmail" element={<WithDoctorNavbar><UpdateEmail /></WithDoctorNavbar>} />
              <Route path="EditDocHos" element={<WithDoctorNavbar><UpdateAffiliation /></WithDoctorNavbar>} />
              <Route path="ViewPatients" element={<WithDoctorNavbar><MyPatients /></WithDoctorNavbar>} />
              <Route path="UpcomingAppointments" element={<WithDoctorNavbar><PatientsWithUpcomingAppointments /></WithDoctorNavbar>} />
              <Route path="SearchPatient" element={<WithDoctorNavbar><SelectPatient /></WithDoctorNavbar>} />

              {/* Ibra - Salah*/}
              <Route path='' element={<WithNavbarAndSidebar><Home /></WithNavbarAndSidebar>} />
              <Route path='doctors' element={<WithNavbarAndSidebar><Doctors /></WithNavbarAndSidebar>} />
              <Route path='familyMembers' element={<WithNavbarAndSidebar><FamilyMembers /></WithNavbarAndSidebar>} />
              <Route path='Perscriptions' element={<WithNavbarAndSidebar><Perscription /></WithNavbarAndSidebar>} />
              <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><SinglePerscriptions /></WithNavbarAndSidebar>} />
              <Route path='/signup' element={<SignUp />} />

            </Routes>
          </UsernameProvider>
        </div>
        {/* <Routes>
            <Route path='' element={<WithNavbarAndSidebar><Home /></WithNavbarAndSidebar>} />
            <Route path='doctors' element={<WithNavbarAndSidebar><Doctors /></WithNavbarAndSidebar>} />
            <Route path='familyMembers' element={<WithNavbarAndSidebar><FamilyMembers /></WithNavbarAndSidebar>} />
            <Route path='Perscriptions' element={<WithNavbarAndSidebar><Perscription /></WithNavbarAndSidebar>} />
            <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><SinglePerscriptions /></WithNavbarAndSidebar>} />
            <Route path='/signup' element={<SignUp />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

function WithNavbarAndSidebar({ children }) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

function WithDoctorNavbar({ children }) {
  return (
    <div>
      <DoctorNavbar />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

export default App;
