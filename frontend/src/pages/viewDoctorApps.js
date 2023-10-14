import { useEffect,useState } from "react";
import DocAppDetails from "../components/DocAppDetails"
import { Link } from 'react-router-dom';



const DoctorAppHome =  () => {
    const [Appl , setAppls] = useState(null);

    useEffect(() => {
        const fetchAppls = async () => {
            const response = await fetch('api/Admin/viewDoctorApplications');
            const json = await response.json();
            if (response.ok) {
              //  console.log(json);
                setAppls(json);
            }
        }

        fetchAppls();
    }, [])

    return (
        <>
        <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
      </nav>
      <h2 className="title-admin">Doctor Applications</h2>  
        <div className="home">
            <div className="DoctorApplications">
                {/* {Appl && Appl.map((Appl) => (
                    <p key={Appl.name}>{Appl.speciality}{Appl.rate}{Appl.affiliation}{Appl.education}{Appl.availableDates}</p>
                ))} */}
                 {Appl && Appl.map(Appl => (
          <DocAppDetails Appl={Appl} key={Appl._id} />
                ))}
            </div>
        </div>
        </>
    )
 }

 export default DoctorAppHome;