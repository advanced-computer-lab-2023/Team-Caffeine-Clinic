import {useEffect,useState} from "react";
import PharmacistDetails from "../components/PharmacistDetails";
import { useAuthContext } from '../hooks/useAuthContext'

const ViewPharmacistHome =  () => {
    const [Pharmacists , setPharmacists] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchPharmacist = async () => {
            const response = await fetch('api/pharmacists/getPharmacist',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                  }
            })
            const json = await response.json();
            if (response.ok) {
                console.log(json);
                setPharmacists(json);
            }
        }

        fetchPharmacist();
    }, [])

    return (
        <>
      <h2>Pharmacists</h2>  
        <div className="home">
            <div className="doctors">
                {/* {Doctors && Doctors.map((doctor) => (
                    <p key={doctor.name}>{doctor.speciality}</p>
                ))} */}
                  {Pharmacists && Pharmacists.map(pharmacist => (
          <PharmacistDetails pharmacist={pharmacist} key={pharmacist._id} />
                  ))}
            </div>
        </div>
        </>
    )
 }

 export default ViewPharmacistHome;