import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to="/doctors">Doctors</Link>
      <Link to="/familyMembers">Family Members</Link>
      <Link to="/Perscriptions">Perscriptions</Link>
    </div>
  )
}

export default Sidebar;
