import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credintials, setcredintials] = useState({ name: "", email: "", password: "", repassword: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credintials.name, emails: credintials.email, password: credintials.password }),
    });
    const note = await response.json()
    console.log(note);
    if (note.success) {
      localStorage.setItem('token', note.authtoken);
      props.showAlerts('Your account has been successfully created', 'success', 'Success');
      navigate('/LogIn');
    }
    else {
      props.showAlerts('Invalid credentials', 'danger', 'Failed');
    }
  }
  const onChange = (e) => {
    setcredintials({ ...credintials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1 className='text-center text-primary mb-5'>Sign up</h1>
      <form action="" className='container' style={{width:"80%"}}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" value={credintials.name} name='name' onChange={onChange} placeholder="jony singh" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credintials.email} name='email' onChange={onChange} placeholder="name@example.com" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credintials.password} name='password' onChange={onChange} placeholder="Your password must be at least 8 characters long" minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="repassword" className="form-label">Re-Password</label>
          <input type="password" className="form-control" id="repassword" value={credintials.repassword} name='repassword' onChange={onChange} placeholder="Comform your password" minLength={8} required />
        </div>
      {(credintials.name && credintials.email && credintials.password && credintials.password.length>=8 && credintials.password===credintials.repassword)?<button className='btn btn-primary' type='button' onClick={handleSubmit}>SignUp</button>:<button className='btn btn-primary' type='button' style={{width:"100px"}} disabled>SignUp</button>}
      </form>
    </div>
  )
}

export default SignUp
