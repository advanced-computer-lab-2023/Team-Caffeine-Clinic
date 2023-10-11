import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import AdminForm from "../components/AdminForm"
import AdminDetails from "../components/AdminDetails"

const AdminHome =  () => {
    const [admins , setAdmins] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            const response = await fetch('api/Admin/ViewAdmins');
            const json = await response.json();
            if (response.ok) {
              //  console.log(json);
                setAdmins(json);
            }
        }

        fetchAdmins();
    }, [])

    return (
        <>
      <h2>Admins</h2>  
        <div className="home">
            <div className="admins">
            {admins && admins.map(admin => (
          <AdminDetails admin={admin} key={admin._id} />
                ))}
                {/* <Link to="/Home">
                      <button>Add admin</button>
                </Link> */}
                {/* <button>Delete Admin</button> */}
            </div>
            <AdminForm />
        </div>
        </>
    )
 }

 export default AdminHome;
