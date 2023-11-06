import {useEffect,useState} from "react";
import PatientDetails from "../components/PatientDetails";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


const ViewPatientHome =  () => {
    const [Patients , setPatients] = useState(null);

    const {user} = useAuthContext()

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
        <>
        <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
      </nav>
      <h2 className="title-admin">Patients</h2>  
        <div className="home">
            <div className="patients">
                  {Patients && Patients.map(patient => (
          <PatientDetails patient={patient} key={patient._id} />
                  ))}
            </div>
        </div>
        </>
    )
 }

 export default ViewPatientHome;