import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';



const NavBar = (props) => {
  const navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    props.showAlerts('Your account has been successfully logout','success','Success');
    navigate('/LogIn');
  }
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname, location.key);
  }, [location])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand">MyNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">About us</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex" role="search">
              <Link className="btn btn-outline-secondary mx-1" role="button" to="/LogIn">LogIn</Link>
            </form>:<Link className="btn btn-outline-secondary mx-1" onClick={handleLogOut} to='#' role="button">LogOut</Link>}
          </div>
        </div>
      </nav>
    </>
  )

}

export default NavBar

