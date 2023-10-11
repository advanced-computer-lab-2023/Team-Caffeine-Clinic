import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import AdminForm from "../components/AdminForm"
import HealthPackdetails from "../components/HealthPackDetails"

const HPHome =  () => {
    const [HP , setHP] = useState(null);

    useEffect(() => {
        const fetchHealthPacks = async () => {
            const response = await fetch('api/Admin/HealthPackages');
            const json = await response.json();
            if (response.ok) {
               console.log(json);
                setHP(json);
            }
        }

        fetchHealthPacks();
    }, [])

    return (
        <>
      <h2>Health Packages</h2>  
        <div className="home">
            <div className="admins">
            {/* {HP && HP.map((hp) => (
                    <p key={hp.id}>{hp.name}</p>
                ))}  */}
                {HP && HP.map(hp => (
          <HealthPackdetails hp={hp} key={hp._id} />
                  ))}
            </div>
            {/* <AdminForm /> */}
        </div>
        </>
    )
 }

 export default HPHome;
