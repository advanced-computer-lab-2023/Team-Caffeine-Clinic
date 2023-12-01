import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const AdminNavbar = () => {

  const { logout } = useLogout()
  
  const handleClick = () => {
    logout()
  }

  return (
    <header className="container navbar">
      <Link to="/AdminHome" className='home-button'>Home</Link>
      <div></div>
      <Link onClick={handleClick} to="/" className='logout-button'>log out</Link>
    </header>
  )
}

export default AdminNavbar