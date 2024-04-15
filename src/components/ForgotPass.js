import { React, useState } from 'react';
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { BaseUrl } from '../Urls';
import check from '../images/check.gif'
require('../styles/forgot-pass.css')

function ForgotPass(props) {

    const [email, setEmail] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
 
    const onChange = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        const response = await fetch(`${BaseUrl}/api/auth/forgot-password`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails: email })
        });
        const data = await response.json()
        if (data.success) {
            toast.success('Successfull send');
            setSendEmail(true);
        }
        else {
            toast.error('Please check your email');
            setSendEmail(false)
        }


    }
    return (
        <>
            <Button className="my-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Login page</Button>
            <div className="container main-page">
                <form autoComplete="off" noValidate className='container main-form'>
                    { !sendEmail ? <div className="forgot-pass">
                        <h3>Enter your registered email</h3>
                        <TextField className='m-4' color="secondary" label="Email" name='email' variant="outlined" fullWidth onChange={onChange} />
                        <Button size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={sendLink} >Send</Button>
                    </div> :
                    <div className='forgot-pass'>
                        <img src={check} alt="loading.." style={{ width: "220px", height: "180px" }} />
                        <p className='fs-6' style={{ color: "green"}}>Password reset link has been send on your registered email please check  </p>
                    </div>}
                </form>
            </div>
        </>
    )
}

export default ForgotPass
