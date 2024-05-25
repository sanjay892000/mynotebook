import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { BaseUrl } from '../Urls';
import check from '../images/check.gif';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/forgot-pass.css';

function ForgotPass(props) {
    const [sendEmail, setSendEmail] = useState(false);

    const sendLink = async (values) => {
        const response = await fetch(`${BaseUrl}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails: values.email })
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Successfully sent');
            setSendEmail(true);
        } else {
            toast.error('Please check your email');
            setSendEmail(false);
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: sendLink,
    });

    return (
        <>
            <Button
                className="my-4"
                variant="text"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                component={Link}
                to="/login"
                style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}
            >
                Login page
            </Button>
            <div className="container main-page">
                <form autoComplete="off" noValidate className='container main-form' onSubmit={formik.handleSubmit}>
                    {!sendEmail ? (
                        <div className="forgot-pass">
                            <h3>Enter your registered email</h3>
                            <TextField
                                className='m-4'
                                color="secondary"
                                label="Email"
                                name='email'
                                variant="outlined"
                                fullWidth
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <Button
                                size="large"
                                className="mb-4"
                                variant="contained"
                                color="secondary"
                                style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}
                                type="submit"
                            >
                                Send
                            </Button>
                        </div>
                    ) : (
                        <div className='forgot-pass'>
                            <img src={check} alt="loading.." style={{ width: "220px", height: "180px" }} />
                            <p className='fs-6' style={{ color: "green" }}>Password reset link has been sent to your registered email. Please check.</p>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default ForgotPass;
