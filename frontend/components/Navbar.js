import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'

const NavBar = (props) => {
  const [isActive, setisActive] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/locations')
  }
  
  
  return <nav className="navbar">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src="../styles/favicon.png" alt="Bulma: a modern CSS framework based on Flexbox" height="28"/>
      </a>
      <a role="button" className={`navbar-burger burger ${isActive ? 'is-active' : '' }`} aria-label="menu" aria-expanded="false" data-target='navbar-menu' 
        onClick={() => setisActive(!isActive)}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    
    <div className={`navbar-menu ${isActive ? 'is-active' : '' }`}id='navbar-menu'>      
      <div className="navbar-start">          
        {/* <Link to="/" className="navbar-item">
          <strong>Home</strong>
        </Link> */}
        <Link to="/locations" className="navbar-item">Locations</Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {!localStorage.getItem('token') && <Link className='button is-light' to='/register'>Register</Link>}
          {!localStorage.getItem('token') && <Link to="/login" className="button is-light">Login</Link>}
          {localStorage.getItem('token') && <Link to='/locations/new-location' className="button is-link">Add Location</Link>}
          {localStorage.getItem('token') && <button
            className="button"
            onClick={handleLogout}
          >Logout</button>}
        </div>
      </div>
    </div>
    
  </nav>
}

export default withRouter(NavBar)


 