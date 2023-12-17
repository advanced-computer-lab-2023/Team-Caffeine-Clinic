import {useEffect,useState} from "react";
import PharmacistDetails from "../components/PharmacistDetails";
import { useAuthContext } from '../hooks/useAuthContext'

const ViewPharmacistHome =  () => {
    const [Pharmacists , setPharmacists] = useState(null);
    const {user} = useAuthContext()
    const margin = {
        marginTop: '130px',
      }

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
        <div className='doctorPage' style={margin}>
        <div class="section-title">
          <h2>Pharmacists</h2>
        </div> 
        {Pharmacists && Pharmacists.map(pharmacist => (
        <PharmacistDetails pharmacist={pharmacist} key={pharmacist._id} />
        ))}
        </div>
    )
 }

 export default ViewPharmacistHome;