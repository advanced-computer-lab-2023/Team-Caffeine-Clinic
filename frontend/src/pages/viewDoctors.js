import {useEffect,useState} from "react";
import DoctorDetails from "../components/AdminDoctorDetails"
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


const ViewDoctorHome =  () => {
    const [Doctors , setDoctors] = useState(null);
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('http://192.168.1.12:4000/api/doctors/getDoctors', {
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
        <>
        <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
      </nav>
      <h2 className="title-admin">Doctors</h2>  
        <div className="home">
            <div className="doctors">
                {/* {Doctors && Doctors.map((doctor) => (
                    <p key={doctor.name}>{doctor.speciality}</p>
                ))} */}
                  {Doctors && Doctors.map(doctor => (
          <DoctorDetails doctor={doctor} key={doctor._id} />
                  ))}
            </div>
        </div>
        </>
    )
 }

 export default ViewDoctorHome;