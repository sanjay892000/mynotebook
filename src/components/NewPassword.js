import React, { useState, useEffect } from 'react'
import { Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../Urls';
import { toast } from 'react-toastify';
import check from '../images/check.gif'
require('../styles/forgot-pass.css')

function NewPassword() {
    const { id, auth_token } = useParams();
    const [credintials, setcredintials] = useState({ password: "", repassword: "" });
    const [submit, setSubmit] = useState(false)

    
  const [showPassword, setShowPassword] = useState(false)
  const [showrePassword, setShowrePassword] = useState(false)

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
  };
  const handleClickShowrePassword = () => {
      setShowrePassword(!showrePassword)
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };


    const verifyUser = async () => {
        const response = await fetch(`/new-password/${id}/${auth_token}`, {
            method: "Get", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data, 14)
        if (data.status === 201) {
            console.log("user valid")
        }
        else {
            console.log("user not valid")
        }
    }
    useEffect(() => {
        verifyUser()
    })

    const onChange = (e) => {
        setcredintials({ ...credintials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BaseUrl}/api/auth/update-password/${id}/${auth_token}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: credintials.password }),
        });
        const pass = await response.json()
        if (pass.success) {
            toast.success('password updated');
            setSubmit(true)
        }
        else {
            toast.error('Invalid credentials');
            setSubmit(false)
        }
    }

    return (
        <div className="container main-page">
            <form autoComplete="off" noValidate className='container main-form'>
                {!submit ? <div className="forgot-pass my-5">
                    <h3>Create new password</h3>
                        <FormControl variant="outlined" className="mt-4" fullWidth>
                            <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                color="secondary"
                                name="password"
                                value={credintials.password}
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
                                label="Password" onChange={onChange} />
                        </FormControl>
                        <FormControl variant="outlined" className="mt-4" fullWidth>
                            <InputLabel color="secondary" htmlFor="outlined-adornment-password">Re-Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name='repassword'
                                value={credintials.repassword}
                                color="secondary"
                                type={showrePassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowrePassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showrePassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Re-Password" onChange={onChange} />
                        </FormControl>
                    {credintials.password && credintials.password.length >= 8 && credintials.password === credintials.repassword ? <Button type="submit" size="large" className="my-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit} >Change Password</Button> : <Button type="submit" size="large" className="my-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit} disabled >Change Password</Button>}
                </div> :
                    <div className="forgot-pass my-5">
                        <img src={check} alt="loading.." style={{ width: "220px", height: "180px" }} />
                        <p className='fs-6' style={{ color: "green" }}>Your password has been changed successfully</p>
                        <Button className="my-4" variant="text" color="secondary" component={Link} to="/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Go to login page</Button>
                    </div>}
            </form>
        </div>
    )
}


export default NewPassword