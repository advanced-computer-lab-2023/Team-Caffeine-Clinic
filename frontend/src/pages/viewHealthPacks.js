import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import HealthPackdetails from "../components/HealthPackDetails"
import HealthPackForm from "../components/HealthPackForm";
import { useAuthContext } from '../hooks/useAuthContext';
import AdminNavbar from "../components/AdminNavbar";

const HPHome =  () => {
    const [HP , setHP] = useState(null);
    const {user} = useAuthContext()
    const margin = {
        marginTop: '130px',
      }

    useEffect(() => {
        const fetchHealthPacks = async () => {
            const response = await fetch('api/Admin/HealthPackages', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
            const json = await response.json();
            if (response.ok) {
               console.log(json);
                setHP(json);
            }
        }
        if(user){
            fetchHealthPacks();
        }
    }, [user])

    return (
        <div className='doctorPage' style={margin}>
        <AdminNavbar />
      <div class="section-title">
          <h2>Health Packages</h2>
        </div> 
        {HP && HP.map(hp => (
          hp &&(
          <HealthPackdetails hp={hp} key={hp._id} />
                  )))}
            <HealthPackForm />
        </div>
    )
 }

 export default HPHome;
