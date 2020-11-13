import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const NavBar = (props) => {
  
  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/locations')
  }
  
  
  return <nav className="navbar ">
    <div className="navbar-brand">
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target='navbar-menu'>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    
    <div className="navbar-menu" id='navbar-menu'>      
      <div className="navbar-start">          
        <Link to="/" className="navbar-item">
          <strong>Home</strong>
        </Link>
        <Link to="/locations" className="navbar-item">Locations</Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {!localStorage.getItem('token') && <Link className='button is-light' to='/signup'>Sign Up</Link>}
          {!localStorage.getItem('token') && <Link to="/login" className="button is-light">Login</Link>}
          {localStorage.getItem('token') && <Link to='/players/new-location' className="button is-info is-light">Add Location</Link>}
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


 