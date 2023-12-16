import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credintials, setcredintials] = useState({ name: "", email: "", contact: "", password: "", repassword: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credintials.name, emails: credintials.email, contact: credintials.contact, password: credintials.password }),
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
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" value={credintials.name} name='name' onChange={onChange} placeholder="jony singh" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credintials.email} name='email' onChange={onChange} placeholder="name@example.com" required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input type="number" className="form-control" id="contact" value={credintials.contact} name='contact' onChange={onChange} placeholder="xxxxxxxxxx" minLength={10} maxLength={10} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credintials.password} name='password' onChange={onChange} placeholder="must be greater than 8 character" minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="repassword" className="form-label">Re-Password</label>
          <input type="password" className="form-control" id="repassword" value={credintials.repassword} name='repassword' onChange={onChange} placeholder="Comform password" minLength={8} required />
        </div>
        <button className='btn btn-primary' type='button' onClick={handleSubmit}>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp
