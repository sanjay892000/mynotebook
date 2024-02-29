import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'



const NavBar = (props) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.showAlerts('Your account has been successfully logout', 'success', 'Success');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname, location.key);
  }, [location])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand"><img className='mx-3 cursor-pointer' src={logo} alt="Loading...." style={{ width: "50px", Height: "50px" }} />MyNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} fs-5`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} fs-5`} to="/about">About us</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex" role="search">
                <Link className="btn btn-outline-secondary mx-3" role="button" to="/login">LogIn</Link>
              </form> : <Link className="btn btn-outline-secondary mx-3" onClick={handleLogOut} to='#' role="button">LogOut</Link>}
          </div>
        </div>
      </nav>
    </>
  )

}

export default NavBar

