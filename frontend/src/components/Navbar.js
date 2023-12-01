import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import Filter from './Filter'
const Navbar = () => {
  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
      logout()
    }
  const [Name, setName] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
      setError(null)
      window.open(`/search/${Name}`,"_self");
    // }

  }
  return (
    <header>
      <div className="container">
        <Link to="/Medicines">
          <h1>Pharmacy</h1>
        </Link>
        <form className="create" onSubmit={handleSubmit}>
          <input style={{width:500}} type='text'
          onChange={(e) => setName(e.target.value)} 
          value={Name}
          >
          </input>
          <input style={{color:'white' ,width:100 , marginLeft:200 , 
          background:'darkgrey' , borderColor:'darkgrey', cursor:'pointer'}} type='submit' value="Search"></input>
        </form>
      <Filter/>
      {user && user.type ==='Patient' && (<div><Link to="/cart"><button> Cart</button></Link>
      {' '}<Link to="/Addresses"><button> Addresses</button></Link>
      {' '}<Link to="/Orders"><button> Orders</button></Link></div>)}
      <Link to="/login"><button onClick={handleClick}>Sign Out</button></Link>
      </div>
      {error && <div className="error">{error}</div>}
    </header>
  )
}

export default Navbar

// import { Link } from 'react-router-dom'
// import { useLogout } from '../hooks/useLogout'

// const Navbar = () => {
//   const { logout } = useLogout()


//   const handleClick = () => {
//     logout()
//   }

//   // return (
//   //   <header className="container navbar">
//   //     <Link to="/home" className='home-button'>Home</Link>
//   //     <div></div>
//   //   </header>
//   // )
// }

// export default Navbar