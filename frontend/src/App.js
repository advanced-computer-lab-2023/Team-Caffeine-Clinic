
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
import HealthPackages from './pages/HealthPackages';
import Perscription from './pages/Perscriptions';
import SinglePerscriptions from './pages/SinglePerscriptionDetails'
import DoctorNavbar from './components/DoctorNavbar';
import ApplyDoctor from './pages/ApplyDoctor'
import Login from './pages/Login'
import ViewAdmin from "./pages/ViewAdmins"
import AdminHome from "./pages/AdminHome";
import DoctorAppHome from './pages/viewDoctorApps';
import ViewDoctorHome from './pages/viewDoctors';
import HPHome from './pages/viewHealthPacks';
import ViewPatientHome from './pages/viewPatientsAdmin';
import SingleDoctor from './pages/singleDoctor';
import EditHealthPackage from './pages/EditHealthPackage';
import Appointments from './pages/Appointments';
import AppointmentDoc from './pages/AppointmentDoc';
import DoctorList from './pages/Filterbyavedates'
import ForgotPass from './pages/ForgotPass';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='Navbar'>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>
              <Route path="" element={<Login />} />
             
              <Route path="EditDocRate" element={<WithDoctorNavbar><EditMyDoc /></WithDoctorNavbar>} />
              <Route path="seedoc" element={<WithDoctorNavbar><DoctorInfo /></WithDoctorNavbar>} />
              <Route path="EditDocEmail" element={<WithDoctorNavbar><UpdateEmail /></WithDoctorNavbar>} />
              <Route path="EditDocHos" element={<WithDoctorNavbar><UpdateAffiliation /></WithDoctorNavbar>} />
              <Route path="ViewPatients" element={<WithDoctorNavbar><MyPatients /></WithDoctorNavbar>} />
              <Route path="UpcomingAppointments" element={<WithDoctorNavbar><PatientsWithUpcomingAppointments /></WithDoctorNavbar>} />
              <Route path="SearchPatient" element={<WithDoctorNavbar><SelectPatient /></WithDoctorNavbar>} />
              <Route path="DocAppointments" element={<WithDoctorNavbar><AppointmentDoc /></WithDoctorNavbar>} />


              {/* Ibra - Salah */}
              <Route path='home' element={<WithNavbarAndSidebar><Home /></WithNavbarAndSidebar>} />
              <Route path='doctors' element={<WithNavbarAndSidebar><Doctors /></WithNavbarAndSidebar>} />
              <Route path='doctor/getSingleDoctor/:username' element={<SingleDoctor />} />
              <Route path='familyMembers' element={<WithNavbarAndSidebar><FamilyMembers /></WithNavbarAndSidebar>} />
              <Route path='healthPackages' element={<WithNavbarAndSidebar><HealthPackages /></WithNavbarAndSidebar>} />
              <Route path='Perscriptions' element={<WithNavbarAndSidebar><Perscription /></WithNavbarAndSidebar>} />
              <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><SinglePerscriptions /></WithNavbarAndSidebar>} />
              <Route path='Appointments' element={<WithNavbarAndSidebar><Appointments /></WithNavbarAndSidebar>} />
              <Route path='signup' element={<SignUp />} />
              <Route path='forgotPass' element={<ForgotPass />} />
              <Route path='doctorApplication' element={<ApplyDoctor />} />
              <Route path='Filterbyavedates' element={<WithNavbarAndSidebar><DoctorList /></WithNavbarAndSidebar>} />


              {/* Mo2 - Yas */}
              <Route
              path="/AdminHome"
              element =  {<AdminHome/>}
              />
              <Route
              path="/ViewAdmin"
              element =  {<ViewAdmin/>}
                />
              <Route
              path="/viewDoctorApps"
              element =  {<DoctorAppHome/>}
                />
              <Route
              path="/viewDoctors"
              element =  {<ViewDoctorHome/>}
                />
              <Route
              path="/viewHealthPacks"
              element =  {<HPHome/>}
                />
              <Route
              path="/editHP/:id"
              element =  {<EditHealthPackage/>}
              />
              <Route
              path="/viewPatientsAdmin"
              element =  {<ViewPatientHome/>}
                />
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
