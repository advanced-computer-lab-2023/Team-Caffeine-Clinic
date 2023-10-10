import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Sidebar className="Sidebar">
      <Link to="/">
        <h1>Sidebar</h1>
      </Link>
    </Sidebar>
  )
}

export default Sidebar