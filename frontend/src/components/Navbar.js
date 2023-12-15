import '../PharmacyCSS/style.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown,faTimes,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import Filter from './Filter'
const Navbar = () => {
  const { logout } = useLogout()
  const {user} = useAuthContext()
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClick = () => {
      logout()
    }
  const [Name, setName] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
      setError(null)
      window.open(`/search/${Name}`,"_self");
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header>
  <div className="site-navbar py-2">

        <div className={`search-wrap fade-in-out ${isSearchOpen ? 'show' : ''}`}>
          <div className="container">
            <a href="#" className="search-close js-search-close">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={handleSearchToggle}
                style={{ scale: '2', marginBottom: '5px' }}
              />
              <span className="icon-close2"></span>
            </a>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control" placeholder="Search Medicine..." 
              onChange={(e) => setName(e.target.value)}
              value={Name} />
            </form>
          </div>
        </div>


      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
            <Link to="/Medicines">
              <a className="js-logo-clone">Pharmacy</a>
            </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block" style={{marginLeft:"100px"}}>
            <nav className="site-navigation text-right text-md-center" role="navigation">
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                
                <li><Link to="/Medicines">Home</Link></li>
                <li><Link to="/home" href="contact.html">Clinic</Link></li>
                <li className="has-children">
                  <a href="#">More</a>
                  <FontAwesomeIcon icon={faChevronDown} style={{color:"black"}} />
                  <ul className="dropdown">
                    <li>{user && user.type !=='Admin'&& <Link to="/Chat"> My Chats</Link>}</li>
                    <li>{user && user.type=='Pharmacist'&& <Link to="/pharmaChangePassword">Change Password</Link>}</li>
                    <li>{user && user.type=='Patient' && <Link to="/Orders"> My Orders</Link>}</li>
                    <li>{user && user.type=='Patient' && <Link to="/Addresses">My Addresses</Link>}</li>
                  </ul>
                </li>
                <Filter />
              </ul>
            </nav>
          </div>
          <div className="icons" style={{marginLeft:"250px"}} >
            <a href="#" className="icons-btn d-inline-block js-search-open" onClick={handleSearchToggle}>
              <FontAwesomeIcon icon={faSearch} />
            </a>
            {user && user.type ==='Patient' && <Link to="/cart"  className="icons-btn d-inline-block bag"> 
              <FontAwesomeIcon icon={faShoppingCart} style={{marginLeft:"40px"}} />
            </Link>
            }
            <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
              <span className="icon-menu"></span>
            </a>
          </div>
        </div>
        <div className="main-nav d-none d-lg-block">
            <nav className="site-navigation text-right text-md-center" role="navigation">
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li><Link to="/" onClick={handleClick}>Sign Out</Link></li>
                </ul>
                </nav>
                </div>
      </div>
    </div> 
      {error && <div className="error">{error}</div>}
    </header>
  )
}

export default Navbar