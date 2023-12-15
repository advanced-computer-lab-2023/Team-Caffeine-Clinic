// React and Router
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import MyInformation from './pages/MyInformation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import FilterResults from './pages/FilterResults';
import HomePharmacy from './pages/HomePharmacy';
import SearchResults from './pages/SearchResults';
import EditResults from './pages/EditResults';
import AddMedicinePicture from './pages/AddMedPicture';
import ApplyPharmacist from './pages/ApplyPharmacist';
import PatientHomePharmacy from './pages/PatientHomePharmacy';
import PatientNavbar from './components/PatientNavbar';
import PatientSidebar from './components/PatientSidebar';
import Cart from './pages/Cart';
import AdminHome from './pages/AdminHome';
import ViewAdmin from './pages/ViewAdmins';
import ViewPatientHome from './pages/viewPatientsAdmin';
import SinglePharmacist from './pages/singlePharm';
import PharmApp from './pages/viewPharmApp';
import Pharmacist from './pages/viewPharm';
import Addresses from './pages/Addresses';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import HPHome from './pages/viewHealthPacks';
import DoctorInfo from './pages/seedoc';
import EditMyDoc from './pages/EditDocRate';
import UpdateEmail from './pages/EditDocEmail';
import UpdateAffiliation from './pages/EditDocHos';
import MyPatients from './pages/ViewPatients';
import UsernameProvider from './pages/UsernameContext';
import PatientsWithUpcomingAppointments from './pages/UpcomingAppointments';
import SelectPatient from './pages/SearchPatient';
import Sidebar from './components/Sidebar';
import Doctors from './pages/doctors';
import FamilyMembers from './pages/familyMembers';
import HealthPackages from './pages/HealthPackages';
import Perscription from './pages/Perscriptions';
import SinglePerscriptions from './pages/SinglePerscriptionDetails';
import DoctorNavbar from './components/DoctorNavbar';
import ApplyDoctor from './pages/ApplyDoctor';
import DoctorAppHome from './pages/viewDoctorApps';
import ViewDoctorHome from './pages/viewDoctors';
import AppointmentsComponent from './pages/PatientfilterAppointments';
import SingleDoctor from './pages/singleDoctor';
import EditHealthPackage from './pages/EditHealthPackage';
import AppointmentDoc from './pages/AppointmentDoc';
import DoctorList from './pages/Filterbyavedates';
import ViewDocuments from './pages/seeanddeletdocs';
import DoctorDocuments from './pages/seepatientdocs';
import AddDocuments from './pages/Docaddpatientdocs';
import AdminChangePassword from './pages/AdminChangePassword';
import DoctorChangePassword from './pages/DoctorChangePassword';
import PatientChangePassword from './pages/PatientChangePassword';
import PatientDetails from './pages/ViewPatientDetails';
import AddAvailableDateFunc from './pages/AddAvailableDate';
import DoctorHealthRecords from './pages/DoctorHealthRecords';
import PatientHealthRecords from './pages/PatientHealthRecord';
import CompletedAppointments from './pages/follow-up';
import App1 from './pages/employmentContract';
import contractNAV from './components/ContractNavBar';
import AddFamilyMember from './pages/AddnotfoundedFamilyMember';
import PaymentHandler from './components/PaymentHandler';
import ProtectedRoute from './components/ProtectedRoute';
import DocumentUpload from './pages/PatientAddDocs';

import AboutSection from './components/AboutSection';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import AppointmentSection from './components/AppointmentSection';
import ClinicPatientNavBar from './components/ClinicPatientNavBar';


import DoctorHome from './pages/DoctorHome';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Components
import AdminNavbar from './components/AdminNavbar';

// Context
import { useAuthContext } from './hooks/useAuthContext';


const stripePromise = loadStripe('pk_test_51OABYlCDYNw0lbpN84PaD596nbIQM1GoWS1g6brg1wQxkm60xMam3ZKRANUdIzjK503IMzQ4TkFheaYGWMHcHZvS00wD6HxMit');

function App() {
  const { user } = useAuthContext()
  const [doctor, setDoctor] = useState(null)
  const [patient, setPatient] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    // Set up a timer to call removeExpiredTransactions every, for example, 1 hour
    const timerId = setInterval(() => {
      const checkOnHealthPackageTransaction = async() =>{
        
        const response = await fetch('/api/patient/checkOnHealthPackageTransaction', {
          method: 'POST'
        })

        if(!response){
          throw Error('Problem in API')
        }

      }
        checkOnHealthPackageTransaction()
      
      //removeExpiredTransactions();
    }, 60 * 1000); // 1 minute in milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <UsernameProvider> {/* Wrap your app with the UsernameProvider */}
            <Routes>

            <Route path="" element={!user ? <Login /> : (user.type === 'Patient') ? 
              <Navigate to="/home"/> : (user.type === 'Pending') ? 
              <Navigate to="/employmentContract"/>: (user.type === 'Doctor') ? <Navigate to="/DoctorHome"/> : (user.type === 'Pharmacist') ? <Navigate to="/Medicines"/> : <Navigate to="/AdminHome"/>} />
             
              <Route path="employmentContract" element={<WithcontractNavbar><ProtectedRoute><App1 /></ProtectedRoute></WithcontractNavbar>} />

              <Route path="EditDocRate" element={<WithDoctorNavbar><ProtectedRoute><EditMyDoc /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="seedoc" element={<WithDoctorNavbar><ProtectedRoute><DoctorInfo /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="EditDocEmail" element={<WithDoctorNavbar><ProtectedRoute><UpdateEmail /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="EditDocHos" element={<WithDoctorNavbar><ProtectedRoute><UpdateAffiliation /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="ViewPatients" element={<WithDoctorNavbar><ProtectedRoute><MyPatients /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="UpcomingAppointments" element={<WithDoctorNavbar><ProtectedRoute><PatientsWithUpcomingAppointments /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="SearchPatient" element={<WithDoctorNavbar><ProtectedRoute><SelectPatient /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="DocAppointments" element={<WithDoctorNavbar><ProtectedRoute><AppointmentDoc /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="seepatientdocs" element={<WithDoctorNavbar><ProtectedRoute><DoctorDocuments /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="Docaddpatientdocs" element={<WithDoctorNavbar><ProtectedRoute><AddDocuments /></ProtectedRoute></WithDoctorNavbar>} />

              <Route path="DoctorHome" element={<WithDoctorNavbar><ProtectedRoute><DoctorHome /></ProtectedRoute></WithDoctorNavbar>} />

              <Route
              path="/doctor/DoctorChangePassword" 
              element={<WithDoctorNavbar><ProtectedRoute><DoctorChangePassword /></ProtectedRoute></WithDoctorNavbar>} 
              />

              
              <Route path="AddAvailableDate" element={<WithDoctorNavbar><ProtectedRoute><AddAvailableDateFunc /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="getAllHealthRecords" element={<WithDoctorNavbar><ProtectedRoute><DoctorHealthRecords /></ProtectedRoute></WithDoctorNavbar>} />
              <Route path="follow-up" element={<WithDoctorNavbar><ProtectedRoute><CompletedAppointments /></ProtectedRoute></WithDoctorNavbar>} />

              <Route path="PayHandler" element={<Elements stripe={stripePromise}> <ProtectedRoute><PaymentHandler/></ProtectedRoute> </Elements>}/>



              {/* Ibra - Salah */}
                <Route path='PatientHealthRecord' element={<WithNavbarAndSidebar><ProtectedRoute><PatientHealthRecords /></ProtectedRoute></WithNavbarAndSidebar>} />
                            
                <Route path='home' element={<WithNavbarAndSidebar><ProtectedRoute><Home /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='myInformation' element={<WithNavbarAndSidebar><ProtectedRoute><MyInformation /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='doctors' element={<WithNavbarAndSidebar><ProtectedRoute><Doctors /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='doctor/getSingleDoctor/:username' element={<ProtectedRoute><SingleDoctor /></ProtectedRoute>} />
                <Route path='familyMembers' element={<WithNavbarAndSidebar><ProtectedRoute><FamilyMembers /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='healthPackages' element={<WithNavbarAndSidebar><ProtectedRoute><HealthPackages /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='Perscriptions' element={<WithNavbarAndSidebar><ProtectedRoute><Perscription /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='SinglePerscriptions/:id' element={<WithNavbarAndSidebar><ProtectedRoute><SinglePerscriptions /></ProtectedRoute></WithNavbarAndSidebar>} />
                
                <Route path='Filterbyavedates' element={<WithNavbarAndSidebar><ProtectedRoute><DoctorList /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='PatientAddDocs' element={<WithNavbarAndSidebar><ProtectedRoute><DocumentUpload /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='seeanddeletdocs' element={<WithNavbarAndSidebar><ProtectedRoute><ViewDocuments /></ProtectedRoute></WithNavbarAndSidebar>} />

                <Route path="/patient/PatientChangePassword" element={user ? <WithNavbarAndSidebar><ProtectedRoute><PatientChangePassword /></ProtectedRoute></WithNavbarAndSidebar> : <Navigate to="/" />} />
                <Route path='PatientfilterAppointments' element={<WithNavbarAndSidebar><ProtectedRoute><AppointmentsComponent /></ProtectedRoute></WithNavbarAndSidebar>} />
                <Route path='AddfamilyMember' element={<WithNavbarAndSidebar><ProtectedRoute><AddFamilyMember /></ProtectedRoute></WithNavbarAndSidebar>} />
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
                                                
              <Route 
              path="/admin/AdminChangePassword" 
              element={<ProtectedRoute><AdminChangePassword /></ProtectedRoute>} 
              />


              <Route
              path="/viewPatientsDetails"
              element =  {<WithNavbarAndSidebar><ProtectedRoute><PatientDetails/></ProtectedRoute></WithNavbarAndSidebar>}
              />


              {/* pharmacy */}
            <Route 
              path="/Medicines" 
              element={ user && <HomePharmacy /> }
            />
            <Route
              path="/Addresses" 
              element={<Addresses />} 
            />
            <Route
              path="/Checkout" 
              element={<Checkout />} 
            />
            <Route
              path="/Orders" 
              element={<Orders />} 
            />
            <Route 
              path="/search/:search" 
              element={ user && <SearchResults /> }
              />
            <Route 
              path={`/filter/:filter`}
              element={ user && <FilterResults /> }
            />
            <Route 
              path="/editMedicine/:Name" 
              element={user&& user.type=="Pharmacist" && <EditResults /> }
            />   
            <Route 
              path="/addMedicinePicture/:Name" 
              element={user&& user.type=="Pharmacist" && <AddMedicinePicture/> }
            />

            {/*Ibra*/}
            <Route 
              path="/applyPharmacist" 
              element={<ApplyPharmacist />} 
            />

            <Route
            path='/patientHome'
            element={user&& user.type=="Patient" && <WithNavbarAndSidebarPharmacy><PatientHomePharmacy /></WithNavbarAndSidebarPharmacy> }
            />
            <Route
            path='/Cart'
            element={user&& user.type=="Patient" && <Cart /> }
            />

            {/*Admin*/}
            <Route
              path="/AdminHome"
              element =  {user&& user.type=="Admin" &&<AdminNavbarAndSidebar><AdminHome/></AdminNavbarAndSidebar> }
              />
              <Route
              path="/ViewAdmin"
              element =  {user&& user.type=="Admin" && <AdminNavbarAndSidebar><ViewAdmin/></AdminNavbarAndSidebar>}
                />
              <Route
              path="/viewPatientsAdmin"
              element = {user&& user.type=="Admin" &&<AdminNavbarAndSidebar><ViewPatientHome/></AdminNavbarAndSidebar>}
                />
              <Route
              path="getSinglePharmacist/:username"
              element =  { user && user.type=="Admin" && <AdminNavbarAndSidebar><SinglePharmacist/></AdminNavbarAndSidebar> }
                />
              <Route
              path="viewPharmacistApps"
              element = { user&& user.type=="Admin" && <AdminNavbarAndSidebar><PharmApp/></AdminNavbarAndSidebar> }
                />
              <Route
              path="viewPharmacists"
              element ={ user&& user.type=="Admin" && <AdminNavbarAndSidebar><Pharmacist/></AdminNavbarAndSidebar> }
                />
              <Route
              path="viewHealthPacks"
              element ={ user&& user.type=="Admin" && <AdminNavbarAndSidebar><HPHome/></AdminNavbarAndSidebar> }
                />
              <Route path='forgotPass' element={!user ? <ForgotPass /> : <Navigate to="/Medicines"/>} />
                
                


            </Routes>
          </UsernameProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

function WithNavbarAndSidebar({ children }) {
  return (
    <div className='MainContent'>
      {/* <div className='Sidebar'>
      <Sidebar />
      </div> */}

      <ClinicPatientNavBar />      
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

function WithNavbarAndSidebarPharmacy({ children }) {
  return (
    <div>
      <PatientSidebar />
      <PatientNavbar />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

function WithDoctorNavbar({ children }) {
  return (
    <div className='MainContent'>
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


function AdminNavbarAndSidebar({ children }) {
  return (
    <div className='MainContent'>
      <AdminNavbar />
      <div className="pages">
        {children}
      </div>
    </div>
  );
}

export default App;
