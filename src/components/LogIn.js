import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function LogIn(props) {
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emails: credentials.email, password: credentials.password })
        });
        const user = await response.json();
        console.log(user);
        if (user.success) {
            localStorage.setItem('token', user.auth_token);
            props.showAlerts('Your account has been successfully login','success','Success');
            navigate('/');
        }
        else {
           props.showAlerts('Invalid credentials','danger','Failed');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]:e.target.value});
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="emails" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emails" value={credentials.email} name='email' placeholder="name@example.com" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwords" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwords" placeholder="Enter password" value={credentials.password} name='password' onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                </div>
                <button className='btn btn-primary' type='button' onClick={handleSubmit}>LogIn</button>
            </form>
        </div>
    )
}

export default LogIn
