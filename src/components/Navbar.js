import * as React from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import '../styles/userdetails.css'
import usericon from '../images/usericon.png'
import { BaseUrl } from '../Urls';
import { useTheme } from '@mui/material/styles';


function NavBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { darkMode, setDarkMode } = props;
  const theme = useTheme();
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    toast.success('Successfully logged out');
    navigate('/login');
  }
  let location = useLocation();


  // for fetch user

  const fetchUser = async (e) => {
    //api call
    const response = await fetch(`${BaseUrl}/api/auth/fetchuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json.user)
    setUser(json.user);
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
    <Box id='drawericon' className='user-box' sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: theme.palette.notesElement.main, color: theme.palette.text.main }}
    >
      <div className='user-icon'><img src={usericon} alt="loading.." /></div>
      <div className="user-name" name='username' >{user.name}</div>
      <div className="user-email" name='useremail'>{user.emails}</div>
      <Divider />
      <button className='logout' onClick={handleLogOut}>LogOut</button>
    </Box>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    <AppBar position="sticky" style={{ backgroundColor: 'rgb(12, 12, 12, 0.9)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RouterLink id='navbar-brand' className="navbar-brand" component={RouterLink} to="/"><img className='mx-1 cursor-pointer' src={logo} alt="Loading...." style={{ width: "40px", Height: "40px" }} />myNoteBook</RouterLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <RouterLink id='menubarhome' className="navbar-brand mr-3"><img className='mx-1 cursor-pointer' src={logo} alt="Loading...." style={{ width: "40px", Height: "40px" }} />myNoteBook</RouterLink>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Button color="inherit" component={RouterLink} to="/" className={location.pathname === "/" ? "active" : ""}>
                  Home
                </Button></Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Button color="inherit" component={RouterLink} to="/about" className={location.pathname === "/about" ? "active" : ""}>
                  About
                </Button></Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Button color="inherit" component={RouterLink} to="/help" className={location.pathname === "/help" ? "active" : ""}>
                  Help
                </Button></Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={RouterLink} to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/about" className={location.pathname === "/about" ? "active" : ""}>
              About
            </Button>
            <Button color="inherit" component={RouterLink} to="/help" className={location.pathname === "/help" ? "active" : ""}>
              Help
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box id='userdetails' sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton color="inherit" onClick={handleDarkModeToggle}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {localStorage.getItem('token') ?
              <div>{['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <RouterLink onClick={toggleDrawer(anchor, true)}><img className='mx-3 cursor-pointer' src={usericon} alt="Loading...." style={{ width: "40px", Height: "40px" }} onClick={fetchUser} /></RouterLink>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}</div> : <form className="d-flex" role="search">
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
              </form>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;