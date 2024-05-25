import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useParams } from 'react-router-dom';
import { BaseUrl } from '../Urls';
import { toast } from 'react-toastify';
import check from '../images/check.gif';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/forgot-pass.css';

function NewPassword() {
    const { id, auth_token } = useParams();
    const [submit, setSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showrePassword, setShowrePassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowrePassword = () => {
        setShowrePassword(!showrePassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const verifyUser = async () => {
        const response = await fetch(`/new-password/${id}/${auth_token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.status !== 201) {
            console.log("user not valid");
        }
    };

    useEffect(() => {
        verifyUser();
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            repassword: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            repassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            const response = await fetch(`${BaseUrl}/api/auth/update-password/${id}/${auth_token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: values.password }),
            });
            const pass = await response.json();
            if (pass.success) {
                toast.success('Password updated');
                setSubmit(true);
            } else {
                toast.error('Invalid credentials');
                setSubmit(false);
            }
        }
    });

    return (
        <div className="container main-page">
            <form autoComplete="off" noValidate className='container main-form' onSubmit={formik.handleSubmit}>
                {!submit ? (
                    <div className="forgot-pass my-5">
                        <h3>Create new password</h3>
                        <FormControl variant="outlined" className="mt-4" fullWidth>
                            <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                color="secondary"
                                name="password"
                                value={formik.values.password}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                            />
                        </FormControl>
                        <FormControl variant="outlined" className="mt-4" fullWidth>
                            <InputLabel color="secondary" htmlFor="outlined-adornment-password">Re-Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name='repassword'
                                value={formik.values.repassword}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.repassword && Boolean(formik.errors.repassword)}
                                helperText={formik.touched.repassword && formik.errors.repassword}
                                label="Re-Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            size="large"
                            className="my-4"
                            variant="contained"
                            color="secondary"
                            style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Change Password
                        </Button>
                    </div>
                ) : (
                    <div className="forgot-pass my-5">
                        <img src={check} alt="loading.." style={{ width: "220px", height: "180px" }} />
                        <p className='fs-6' style={{ color: "green" }}>Your password has been changed successfully</p>
                        <Button className="my-4" variant="text" color="secondary" component={Link} to="/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Go to login page</Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default NewPassword;
