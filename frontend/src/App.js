
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
import AppointmentsComponent from './pages/PatientfilterAppointments';
import HPHome from './pages/viewHealthPacks';
import ViewPatientHome from './pages/viewPatientsAdmin';
import SingleDoctor from './pages/singleDoctor';
import EditHealthPackage from './pages/EditHealthPackage';
import AppointmentDoc from './pages/AppointmentDoc';
import DoctorList from './pages/Filterbyavedates'
import ForgotPass from './pages/ForgotPass';
import { useAuthContext } from './hooks/useAuthContext';          
import AddAvailableDateFunc from './pages/AddAvailableDate';
import DoctorHealthRecords from './pages/DoctorHealthRecords';
import PatientHealthRecords from './pages/PatientHealthRecord';
import CompletedAppointments from './pages/follow-up';
import App1 from './pages/employmentContract';
import contractNAV from './components/ContractNavBar';




import PaymentHandler from './components/PaymentHandler'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OABYlCDYNw0lbpN84PaD596nbIQM1GoWS1g6brg1wQxkm60xMam3ZKRANUdIzjK503IMzQ4TkFheaYGWMHcHZvS00wD6HxMit');

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
              <Route path="" element={!user ? <Login /> : (user.type === 'Patient') ? 
              <Navigate to="/home"/> : (user.type === 'Pending') ? 
              <Navigate to="/employmentContract"/>: (user.type === 'Doctor') ? <Navigate to="/seedoc"/> : <Navigate to="/AdminHome"/>} />

              <Route path="employmentContract" element={<WithcontractNavbar><App1 /></WithcontractNavbar>} />

              <Route path="EditDocRate" element={<WithDoctorNavbar><EditMyDoc /></WithDoctorNavbar>} />
              <Route path="seedoc" element={<WithDoctorNavbar><DoctorInfo /></WithDoctorNavbar>} />
              <Route path="EditDocEmail" element={<WithDoctorNavbar><UpdateEmail /></WithDoctorNavbar>} />
              <Route path="EditDocHos" element={<WithDoctorNavbar><UpdateAffiliation /></WithDoctorNavbar>} />
              <Route path="ViewPatients" element={<WithDoctorNavbar><MyPatients /></WithDoctorNavbar>} />
              <Route path="UpcomingAppointments" element={<WithDoctorNavbar><PatientsWithUpcomingAppointments /></WithDoctorNavbar>} />
              <Route path="SearchPatient" element={<WithDoctorNavbar><SelectPatient /></WithDoctorNavbar>} />
              <Route path="DocAppointments" element={<WithDoctorNavbar><AppointmentDoc /></WithDoctorNavbar>} />
              <Route path="AddAvailableDate" element={<WithDoctorNavbar><AddAvailableDateFunc /></WithDoctorNavbar>} />
              <Route path="getAllHealthRecords" element={<WithDoctorNavbar><DoctorHealthRecords /></WithDoctorNavbar>} />
              <Route path="follow-up" element={<WithDoctorNavbar><CompletedAppointments /></WithDoctorNavbar>} />

              <Route path="PayHandler" element={<Elements stripe={stripePromise}> <PaymentHandler/> </Elements>}/>



              {/* Ibra - Salah */}
              <Route path='home' element={ <WithNavbarAndSidebar><Home /></WithNavbarAndSidebar>} />
              <Route path='doctors' element={<WithNavbarAndSidebar><Doctors /></WithNavbarAndSidebar>} />

              <Route path='PatientHealthRecord' element={<WithNavbarAndSidebar><PatientHealthRecords /></WithNavbarAndSidebar>} />

              <Route path='doctor/getSingleDoctor/:username' element={user ? <SingleDoctor /> : <Navigate to="/" /> }/>
              <Route path='familyMembers' element={<WithNavbarAndSidebar><FamilyMembers /></WithNavbarAndSidebar>} />
              <Route path='healthPackages' element={user ? <WithNavbarAndSidebar><HealthPackages /></WithNavbarAndSidebar> : <Navigate to="/" />} />
              <Route path='Perscriptions' element={user ? <WithNavbarAndSidebar><Perscription /></WithNavbarAndSidebar> : <Navigate to="/" />} />
              <Route path='SinglePerscriptions/:id' element={user ? <WithNavbarAndSidebar><SinglePerscriptions /></WithNavbarAndSidebar> : <Navigate to="/" />} />
              <Route path='signup' element={!user ? <SignUp /> : <Navigate to="/home"/>} />
              <Route path='forgotPass' element={!user ? <ForgotPass /> : <Navigate to="/home"/>} />
              <Route path='doctorApplication' element={!user ? <ApplyDoctor /> : <Navigate to="/home"/>} />
              <Route path='Filterbyavedates' element={user ? <WithNavbarAndSidebar><DoctorList /></WithNavbarAndSidebar> : <Navigate to="/" />} />
              <Route path='PatientfilterAppointments' element={<WithNavbarAndSidebar><AppointmentsComponent /></WithNavbarAndSidebar>} />



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
function WithcontractNavbar({ children }) {
  return (
    <div>
      <contractNAV />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}


export default App;
