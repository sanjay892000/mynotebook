import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import avataars from "../images/avataaars.png";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/signup.css';
import { BaseUrl } from '../Urls';

const SignUp = (props) => {
  const navigate = useNavigate();
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

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await fetch(`${BaseUrl}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: values.name, emails: values.email, password: values.password }),
      });
      const note = await response.json();
      if (note.success) {
        toast.success('Your account has been successfully created');
        formik.resetForm();
        navigate('/login');
      } else {
        toast.error('Invalid credentials');
      }
    }
  });

  return (
    <div>
      <div className="d-flex full-page">
        <div className="col-md-5 right-page">
          <img className="img-fluid mt-5" src={avataars} alt="register" style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
        </div>
        <div className="col-md-7 ps-5 pe-5 pt-1 left-page">
          <h2 style={{ fontWeight: "Bold", color:"rgb(140, 29, 159)" }}>Create a new account</h2>
          <p className="mb-4">Use your email to create a new account</p>
          <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <TextField
                color="secondary"
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="mb-4">
              <TextField
                type="email"
                color="secondary"
                name="email"
                label="Email"
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
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
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
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.password}</div>
                )}
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl variant="outlined" fullWidth>
                <InputLabel color="secondary" htmlFor="outlined-adornment-password">Re-Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="repassword"
                  color="secondary"
                  type={showrePassword ? 'text' : 'password'}
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                  error={formik.touched.repassword && Boolean(formik.errors.repassword)}
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
                  label="Re-Password"
                />
                {formik.touched.repassword && formik.errors.repassword && (
                  <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.repassword}</div>
                )}
              </FormControl>
            </div>
            <Button
              className="register-button mb-4"
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}
            >
              Register now
            </Button>
          </form>
          <p>If you have an account? <Link to="/login">LogIn</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
