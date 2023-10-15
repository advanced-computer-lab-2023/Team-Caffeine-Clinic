import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import HealthPackdetails from "../components/HealthPackDetails"
import HealthPackForm from "../components/HealthPackForm";

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
        <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
       
      </nav>
      <h2 className="title-admin">Health Packages</h2>  
        <div className="home">
            <div className="admins">
            {/* {HP && HP.map((hp) => (
                    <p key={hp.id}>{hp.name}</p>
                ))}  */}
                {HP && HP.map(hp => (
          <HealthPackdetails hp={hp} key={hp._id} />
                  ))}
            </div>
            <HealthPackForm />
        </div>
        </>
    )
 }

 export default HPHome;
