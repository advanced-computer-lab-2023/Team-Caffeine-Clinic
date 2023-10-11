import { useEffect,useState } from "react";

const Home =  () => {
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
                {admins && admins.map((admin) => (
                    <p key={admin.id}>{admin.Username}{admin.Passowrd}</p>
                ))}
            </div>
        </div>
        </>
    )
 }

 export default Home;
