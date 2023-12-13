import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminForm from "../components/AdminForm";
import AdminDetails from "../components/AdminDetails";
import { useAuthContext } from '../hooks/useAuthContext';
import AdminNavbar from "../components/AdminNavbar";

const AdminHome = () => {
  const [admins, setAdmins] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch("api/Admin/ViewAdmins", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        setAdmins(json);
      }
    };
    if(user){
      fetchAdmins();
    }
  }, [user]);

  return (
    <>
<AdminNavbar />
      <h2 className="title-admin">Admins</h2>
      <div className="home">
        <div className="admins">
          {admins &&
            admins.map((admin) => (
              <AdminDetails admin={admin} key={admin._id} />
            ))}
        </div>
        <AdminForm />
      </div>
    </>
  );
};

export default AdminHome;
