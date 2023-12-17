import {useEffect,useState} from "react";
import PatientDetails from "../components/PatientDetails";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminNavbar from "../components/AdminNavbar";

const ViewPatientHome =  () => {
    const [Patients , setPatients] = useState(null);
    const {user} = useAuthContext()
    const margin = {
      marginTop: '130px',
    }

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('api/Admin/ViewPatients', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
            const json = await response.json();
            if (response.ok) {
              //  console.log(json);
                setPatients(json);
            }
        }
        if(user){
            fetchPatients();
        }
    }, [user])

    return (
      <div className='doctorPage' style={margin}>
      <AdminNavbar />
      <div class="section-title">
          <h2>Patients</h2>
        </div> 
        {Patients && Patients.map(patient => (
          <PatientDetails patient={patient} key={patient._id} />
          ))}
        </div>
    )
 }

 export default ViewPatientHome;