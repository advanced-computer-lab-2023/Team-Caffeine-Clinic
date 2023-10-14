import {useEffect,useState} from "react";
import PatientDetails from "../components/PatientDetails";
import { Link } from 'react-router-dom';


const ViewPatientHome =  () => {
    const [Patients , setPatients] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('api/Admin/ViewPatients');
            const json = await response.json();
            if (response.ok) {
              //  console.log(json);
                setPatients(json);
            }
        }

        fetchPatients();
    }, [])

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