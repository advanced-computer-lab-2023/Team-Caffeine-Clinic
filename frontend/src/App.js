
// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuthContext } from './hooks/useAuthContext';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  const { user } = useAuthContext()
  const [doctor, setDoctor] = useState(null)
  const [patient, setPatient] = useState(null)
  const [admin, setAdmin] = useState(null)


  return (
    <div className="App">
      <BrowserRouter>
        <div className='Navbar'>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>
            <Route path="" element={!user ? <Login /> : (user.type === 'Patient') ? <Navigate to="/home"/> : (user.type === 'Doctor') ? <Navigate to="/seedoc"/> : <Navigate to="/AdminHome"/>} />
             
            <Route path="EditDocRate" element={<WithDoctorNavbar><ProtectedRoute><EditMyDoc /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="seedoc" element={<WithDoctorNavbar><ProtectedRoute><DoctorInfo /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="EditDocEmail" element={<WithDoctorNavbar><ProtectedRoute><UpdateEmail /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="EditDocHos" element={<WithDoctorNavbar><ProtectedRoute><UpdateAffiliation /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="ViewPatients" element={<WithDoctorNavbar><ProtectedRoute><MyPatients /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="UpcomingAppointments" element={<WithDoctorNavbar><ProtectedRoute><PatientsWithUpcomingAppointments /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="SearchPatient" element={<WithDoctorNavbar><ProtectedRoute><SelectPatient /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="DocAppointments" element={<WithDoctorNavbar><ProtectedRoute><AppointmentDoc /></ProtectedRoute></WithDoctorNavbar>} />


              {/* Ibra - Salah */}
              <Route path='home' element={<WithNavbarAndSidebar><ProtectedRoute><Home /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='doctors' element={<WithNavbarAndSidebar><ProtectedRoute><Doctors /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='doctor/getSingleDoctor/:username' element={<ProtectedRoute><SingleDoctor /></ProtectedRoute>} />
              <Route path='familyMembers' element={<WithNavbarAndSidebar><ProtectedRoute><FamilyMembers /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='healthPackages' element={<WithNavbarAndSidebar><ProtectedRoute><HealthPackages /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='Perscriptions' element={<WithNavbarAndSidebar><ProtectedRoute><Perscription /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><ProtectedRoute><SinglePerscriptions /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='Appointments' element={<WithNavbarAndSidebar><ProtectedRoute><Appointments /></ProtectedRoute></WithNavbarAndSidebar>} />
              <Route path='Filterbyavedates' element={<WithNavbarAndSidebar><ProtectedRoute><DoctorList /></ProtectedRoute></WithNavbarAndSidebar>} />

              {/* Public Routes */}
              <Route path='signup' element={!user ? <SignUp /> : <Navigate to="/home"/>} />
              <Route path='forgotPass' element={!user ? <ForgotPass /> : <Navigate to="/home"/>} />
              <Route path='doctorApplication' element={!user ? <ApplyDoctor /> : <Navigate to="/home"/>} />

              {/* Mo2 - Yas */}
              <Route path="/AdminHome" element={<ProtectedRoute><AdminHome/></ProtectedRoute>} />
              <Route path="/ViewAdmin" element={<ProtectedRoute><ViewAdmin/></ProtectedRoute>} />
              <Route path="/viewDoctorApps" element={<ProtectedRoute><DoctorAppHome/></ProtectedRoute>} />
              <Route path="/viewDoctors" element={<ProtectedRoute><ViewDoctorHome/></ProtectedRoute>} />
              <Route path="/viewHealthPacks" element={<ProtectedRoute><HPHome/></ProtectedRoute>} />
              <Route path="/editHP/:id" element={<ProtectedRoute><EditHealthPackage/></ProtectedRoute>} />
              <Route path="/viewPatientsAdmin" element={<ProtectedRoute><ViewPatientHome/></ProtectedRoute>} />
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
