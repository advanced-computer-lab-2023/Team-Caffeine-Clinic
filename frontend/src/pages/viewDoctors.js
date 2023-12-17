import {useEffect,useState} from "react";
import DoctorDetails from "../components/AdminDoctorDetails"
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminNavbar from "../components/AdminNavbar";

const ViewDoctorHome =  () => {
    const [Doctors , setDoctors] = useState(null);
    const {user} = useAuthContext()
    const margin = {
        marginTop: '130px',
      }


    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('api/doctors/getDoctors', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setDoctors(json);
            }
        }
        if(user){
            fetchDoctors();
        }
    }, [user])

    return (
    <div className='doctorPage' style={margin}>
        <AdminNavbar />
        <div class="section-title">
          <h2>Doctors</h2>
        </div> 
         {Doctors && Doctors.map(doctor => (
        <DoctorDetails doctor={doctor} key={doctor._id} />          
        ))}
        </div>
    )
 }

 export default ViewDoctorHome;