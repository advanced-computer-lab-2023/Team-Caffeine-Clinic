import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="container navbar">
      <Link to="/">
        <h1>Navbar</h1>
      </Link>
    </header>
  )
}

export default Navbar