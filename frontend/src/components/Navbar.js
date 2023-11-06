import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()


  const handleClick = () => {
    logout()
  }

  return (
    <header className="container navbar">
      <Link to="/home" className='home-button'>Home</Link>
      <div></div>
      <Link to="/" className='logout-button' onClick={handleClick}>log out</Link>
    </header>
  )
}

export default Navbar