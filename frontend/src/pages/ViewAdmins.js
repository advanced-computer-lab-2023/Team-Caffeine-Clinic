import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminForm from "../components/AdminForm";
import AdminDetails from "../components/AdminDetails";

const AdminHome = () => {
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch("api/Admin/ViewAdmins");
      const json = await response.json();
      if (response.ok) {
        setAdmins(json);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <nav>
        <Link className="home-button" to="/AdminHome">Home</Link>
      </nav>
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
