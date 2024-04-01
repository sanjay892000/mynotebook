import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import '../styles/userdetails.css'
import usericon from '../images/usericon.png'



const NavBar = (props) => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.showAlerts('Your account has been successfully logout', 'success', 'Success');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname, location.key);
  }, [location])

  // for fetch user

  const fetchUser = async (e) => {
    //api call
    const response = await fetch(`${host}/api/auth/fetchuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setUser(json);
  }



  //for drawer
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box className='user-box' sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='user-icon'><img src={usericon} alt="loading.."/></div>
      <div className="user-name" name='username' >{user.name}</div>
      <div className="user-email" name='useremail'>{user.emails}</div>
      <Divider />
      <button className='logout' onClick={handleLogOut}>LogOut</button>
    </Box>
  );
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
            {localStorage.getItem('token') ?
              <div>{['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Link onClick={toggleDrawer(anchor, true)}><img className='mx-3 cursor-pointer' src={usericon} alt="Loading...." style={{ width: "50px", Height: "50px" }}onClick={fetchUser}/></Link>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}</div> : <form className="d-flex" role="search">
                <Link className="btn btn-outline-secondary mx-3" role="button" to="/login">LogIn</Link>
              </form>}
          </div>
        </div>
      </nav>
    </>
  )

}

export default NavBar

