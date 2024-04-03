import React, { useState } from 'react';
import '../styles/login.css'
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BaseUrl } from '../Urls';

function LogIn(props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    /* const [login, setlogin] = useState(true) */
    const host = {BaseUrl};
    const [credentials, setCredentials] = useState({ email: "", password: "" });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/loginuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails: credentials.email, password: credentials.password })
        });
        const user = await response.json();
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
    /*     const responseMessage = (response) => {
            console.log(response);
        };
        const errorMessage = (error) => {
            console.log(error);
        }; */

    return (
            <div className="full-page">
                <div className="container addnotes mb-5" >
                    <h2 style={{ fontWeight: "Bold" }}>Welcom to myNoteBook</h2>
                </div>
                <form autoComplete="off" noValidate className='container main-form' /* style={{ width: "60vw" }} */>
                    <div className="inputform">
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
                    </div>
                    <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit}>Login</Button>
                    <p>If don't have an account? <Link to="/signup" >Register</Link> </p>
                    <hr />
                </form>
                <div className="container addnotes">
                    <p className="mb-4 border">OR</p>
                    <div className="d-flex loginbutton">
                        <Button size="large" fullWidth className="mb-4 me-4" variant="contained" color="primary" startIcon={<FacebookIcon />} component={Link} to="/login" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Facebook</Button>
                        <Button size="large" fullWidth className="mb-4" variant="contained" color="error" startIcon={<GoogleIcon />} component={Link} to="/login" style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Google</Button>
                        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
                    </div>
                </div>
            </div>
    )
}

export default LogIn