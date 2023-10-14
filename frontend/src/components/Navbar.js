import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="container navbar">
      <Link to="/home" className='home-button'>Home</Link>
      <div></div>
      <Link to="/" className='logout-button'>log out</Link>
    </header>
  )
}

export default Navbar