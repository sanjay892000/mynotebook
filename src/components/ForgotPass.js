import {React, useState} from 'react';
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { BaseUrl } from '../Urls';

require('../styles/forgot-pass.css')

function ForgotPass(props) {
    const {showAlerts} = props;

/*     const [email, setEmail] = useState({email:""})

    const onChange=(e)=>{
          setEmail({...email,[e.target.name]:e.target.value})
    } */  //aisa hum tab karte hai jab hamare pas ek se jyada input ho

    const [email, setEmail] = useState("");

    const onChange=(e)=>{
        setEmail(e.target.value)
    }

    const sendLink= async(e)=>{
    e.preventDefault()

    const response = await fetch(`${BaseUrl}/api/auth/forgot-password`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({emails:email})
    });
    const data = await response.json();
    if (data.success) {
        showAlerts('Your account has been successfully login', 'success', 'Success');
        setEmail("")
    }
    else {
        props.showAlerts('Invalid credentials', 'danger', 'Failed');
    }


    }
    return (
        <>
            <Button className="mb-2" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Login page</Button>
            <div className="container main-page">
                <form autoComplete="off" noValidate className='container main-form'>
                    <div className="forgot-pass">
                        <h3>Enter your registerd email</h3>
                        <TextField className='m-4' color="secondary" label="Email" name='email' variant="outlined" fullWidth onChange={onChange} />
                        <Button type="submit" size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }} onClick={sendLink} >Send</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPass
