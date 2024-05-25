import React, { useState } from 'react';
import '../styles/login.css';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { BaseUrl } from '../Urls';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LogIn(props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const loginwithgoogle = () => {
        window.open("http://localhost:5000/api/auth/google/callback", "_self");
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const response = await fetch(`${BaseUrl}/api/auth/loginuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emails: values.email, password: values.password })
            });
            const user = await response.json();
            if (user.success) {
                localStorage.setItem('token', user.auth_token);
                toast.success('Successfully logged in');
                formik.resetForm();
                navigate('/');
            } else {
                toast.error('Please check email & password');
            }
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="full-page">
            <div className="full-login">
                <div className="container addnotes my-5">
                    <h2 style={{ fontWeight: "Bold" }}>Welcome to myNoteBook</h2>
                </div>
                <form autoComplete="off" noValidate className='container main-form' onSubmit={formik.handleSubmit}>
                    <div className="inputform">
                        <div className="mb-4">
                            <TextField
                                color="secondary"
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className="mb-4">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    color="secondary"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
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
                                    label="Password"
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.password}</div>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}
                    >
                        Login
                    </Button>
                    <div className="extra-comp d-flex justify-content-between">
                        <p>If you don't have an account? <Link to="/signup">Register</Link></p>
                        <p>Forgot password? <Link to="/forgot-password">click here</Link></p>
                    </div>
                    <hr />
                </form>
                <div className="container addnotes">
                    <p className="mb-4 border">OR</p>
                    <div className="d-flex loginbutton">
                        <Button
                            size="large"
                            fullWidth
                            className="mb-4"
                            variant="contained"
                            color="error"
                            startIcon={<GoogleIcon />}
                            style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}
                            onClick={loginwithgoogle}
                        >
                            Login with Google
                        </Button>
                        <Button
                            size="large"
                            fullWidth
                            className="mb-4 me-4"
                            variant="contained"
                            color="primary"
                            startIcon={<FacebookIcon />}
                            component={Link}
                            to="/login"
                            style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}
                        >
                            Login with Facebook
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
