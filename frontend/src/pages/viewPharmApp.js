import { useEffect,useState } from "react";
import PharmAppDetails from "../components/PharmApp";
import { useAuthContext } from '../hooks/useAuthContext'


const PharmacistAppHome =  () => {
    const [Appl , setAppls] = useState(null);
    const {user} = useAuthContext()
    

    useEffect(() => {
        const fetchAppls = async () => {
            const response = await fetch('api/admin/viewPharmacistApplication',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                  }
            });
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
      <h2>Pharmacist Applications</h2>  
        <div className="home">
            <div className="DoctorApplications">
                {/* {Appl && Appl.map((Appl) => (
                    <p key={Appl.name}>{Appl.speciality}{Appl.rate}{Appl.affiliation}{Appl.education}{Appl.availableDates}</p>
                ))} */}
                 {Appl && Appl.map(Appl => (
          <PharmAppDetails Appl={Appl} key={Appl._id} />
                ))}
            </div>
        </div>
        </>
    )
 }

 export default PharmacistAppHome;