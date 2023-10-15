import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to="/doctors">Doctors</Link>
      <Link to="/familyMembers">Family Members</Link>
      <Link to="/Perscriptions">Perscriptions</Link>
      <Link to="/HealthPackages">Health Packages</Link>
      <Link to="/Filterbyavedates">Filter by Availability Date</Link>
    </div>
  )
}

export default Sidebar;
