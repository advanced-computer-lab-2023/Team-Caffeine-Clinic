import {useEffect,useState} from "react";
import DoctorDetails from "../components/DoctorDetails"

const ViewDoctorHome =  () => {
    const [Doctors , setDoctors] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('api/doctors/getDoctors');
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setDoctors(json);
            }
        }

        fetchDoctors();
    }, [])

    return (
        <>
      <h2>Doctors</h2>  
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