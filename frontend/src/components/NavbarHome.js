import { Link } from 'react-router-dom'

const NavbarHome = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Pharmacy</h1>
        </Link>
      </div>
    </header>
  )
}

export default NavbarHome