import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Sidebar = () => {
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }

  return (
    <div className="Sidebar">
      <NavLink to="/oldhome" activeClassName="active">Old Home</NavLink>
      <NavLink to="/doctors" activeClassName="active">Doctors</NavLink>
      <NavLink to="/familyMembers" activeClassName="active">Family Members</NavLink>
      <NavLink to="/Perscriptions" activeClassName="active">Prescriptions</NavLink>
      <NavLink to="/HealthPackages" activeClassName="active">Health Packages</NavLink>
      <NavLink to="/Filterbyavedates" activeClassName="active">Filter by Availability Date</NavLink>
      <NavLink to="/viewPatientsDetails" activeClassName="active">My Profile</NavLink>
      <NavLink to="/PatientfilterAppointments" activeClassName="active">My Appointments</NavLink>
      <NavLink to="/PatientHealthRecord" activeClassName="active">My Health Record</NavLink>
      <NavLink to="/patient/PatientChangePassword" activeClassName="active">Change Password</NavLink>
      <NavLink to="/PatientAddDocs" activeClassName="active">Add Documents</NavLink>
      <NavLink to="/seeanddeletdocs" activeClassName="active">View & Edit Documents</NavLink>
      <NavLink to="/Medicines" activeClassName="active">Pharmacy</NavLink>
      <NavLink to="/" id='logoutbutton' className='logout-button' onClick={handleClick}>log out</NavLink>
    </div>
  )
}

export default Sidebar;
