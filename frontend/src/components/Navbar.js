import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="container navbar">
      <Link to="/">
        <h1>SignUp</h1>
      </Link>
    </header>
  )
}

export default Navbar