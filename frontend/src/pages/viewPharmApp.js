import { useEffect,useState } from "react";
import PharmAppDetails from "../components/PharmApp";
import { useAuthContext } from '../hooks/useAuthContext'


const PharmacistAppHome =  () => {
    const [Appl , setAppls] = useState(null);
    const {user} = useAuthContext()
    const margin = {
        marginTop: '130px',
      }

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
        <div className='doctorPage' style={margin}>

        <div class="section-title">
          <h2>Pharmacist Applications</h2>
        </div> 
           {Appl && Appl.map(Appl => (
          <PharmAppDetails Appl={Appl} key={Appl._id} />
                ))}
        </div>
    )
 }

 export default PharmacistAppHome;