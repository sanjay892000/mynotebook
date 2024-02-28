import React, { useState } from 'react'
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
/* import { Button } from '@mui/material'; */
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LogIn(props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails: credentials.email, password: credentials.password })
        });
        const user = await response.json();
        console.log(credentials.email)
        console.log(credentials.password)
        console.log(user);

        if (user.success) {
            localStorage.setItem('token', user.auth_token);
            props.showAlerts('Your account has been successfully login', 'success', 'Success');
            navigate('/');
        }
        else {
            props.showAlerts('Invalid credentials', 'danger', 'Failed');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <div className="container addnotes" >
                <h2 style={{ fontWeight: "Bold" }}>Login</h2>
                <p className="mb-4">Sign in on the internal platform</p>
                <div className="d-flex">
                    <Button size="large" fullWidth className="mb-4 me-4" variant="contained" color="primary" startIcon={<FacebookIcon />} component={Link} to="/LogIn" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Facebook</Button>
                    <Button size="large" fullWidth className="mb-4" variant="contained" color="error" startIcon={<GoogleIcon />} component={Link} to="/LogIn" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Google</Button>
                </div>
                <p className="mb-4 d-flex justify-content-center">or login with email and password</p>
            </div>
            <form autoComplete="off" noValidate className='container' style={{width:"55%"}}>
                <div className="mb-4">
                    <TextField color="secondary" label="Email" name='email' variant="outlined" fullWidth onChange={onChange} value={credentials.email} />
                </div>
                <div className="mb-4">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel color="secondary" htmlFor="outlined-adornment-password" >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            color="secondary" onChange={onChange} name="password" value={credentials.password}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password" />

                    </FormControl>
                </div>
                <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit}>Login</Button>
                <p>If don't have an account? <Link to="/SignUp" >Register</Link> </p>
            </form>
        </div>
    )
}

export default LogIn