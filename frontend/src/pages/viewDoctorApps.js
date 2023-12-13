import { useEffect, useState } from "react";
import DocAppDetails from "../components/DocAppDetails";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminNavbar from "../components/AdminNavbar";
const DoctorAppHome = () => {
  const [Appl, setAppls] = useState(null);
  const [loading, setLoading] = useState(true); // New state variable for loading indicator
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAppls = async () => {
      try {
        const response = await fetch('api/Admin/viewDoctorApplications', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (response.ok) {
          setAppls(json);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (user) {
      fetchAppls();
    }
  }, [user]);

  return (
    <>
<AdminNavbar />
      <h2 className="title-admin">Doctor Applications</h2>
      <div className="home">
        <div className="DoctorApplications">
          {loading && <p>Loading...</p>}
          {Appl &&
            !loading &&
            Appl.map((Appl) => (
              <DocAppDetails Appl={Appl} key={Appl._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DoctorAppHome;
