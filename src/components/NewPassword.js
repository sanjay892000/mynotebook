import React, { useState , useEffect  } from 'react'
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../Urls';
import {toast } from 'react-toastify';
import check from '../images/check.gif'
require('../styles/forgot-pass.css')

function NewPassword() {
    const { id, auth_token } = useParams();
    const [credintials, setcredintials] = useState({ password: "", repassword: "" });
    const [submit, setSubmit] = useState(false)
    const verifyUser = async () => {
        const response = await fetch(`/new-password/${id}/${auth_token}`, {
            method: "Get", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data,14)
        if (data.status === 201) {
            console.log("user valid")
        }
        else {
            console.log("user not valid")
        }
    }
    useEffect(()=>{
         verifyUser() 
    })

    const onChange = (e) => {
        setcredintials({...credintials, [e.target.name]: e.target.value});
    }  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BaseUrl}/api/auth/update-password/${id}/${auth_token}`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({password: credintials.password}),
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
                    <TextField className='m-4' color="secondary" label="new password" name='password' onChange={onChange} variant="outlined" fullWidth />
                    <TextField className='m-4' color="secondary" label="conform password" name='repassword' onChange={onChange} variant="outlined" fullWidth />
                    {credintials.password && credintials.password.length>=8 && credintials.password===credintials.repassword ? <Button type="submit" size="large" className="my-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit} >Change Password</Button> : <Button type="submit" size="large" className="my-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={handleSubmit} disabled >Change Password</Button>}
                </div>:
                <div className="forgot-pass my-5">
                <img src={check} alt="loading.." style={{ width: "220px", height: "180px" }} />
                        <p className='fs-6' style={{ color: "green"}}>Your password has been changed successfully</p>
                        <Button className="my-4" variant="text" color="secondary" component={Link} to="/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Go to login page</Button>
                </div>}
            </form>
        </div>
    )
}

export default NewPassword
