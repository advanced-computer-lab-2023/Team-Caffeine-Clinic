import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="container navbar">
      <Link to="/" className='home-button'>Home</Link>
      <div></div>
      <div className='logout-button'>log out</div>
    </header>
  )
}

export default Navbar