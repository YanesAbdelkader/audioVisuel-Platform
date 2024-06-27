import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeSimple, Lock } from 'phosphor-react';
import '../styles/Login.css';
import { loginUser } from '../services/AuthenticationService';
import { AuthContext } from '../contexts/Auth-Context';

function Login() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(token){
      window.history.back()
    }
  })

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);

    const response = await loginUser(form);

    if (response.error) {
      setError(response.error);
    } else {
      window.history.back()
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>
        {error && (<div className='error' onClick={() => setError(null)}><h4>{Array.isArray(error) ? error.join(', ') : error}</h4></div>)}
        <div className='input-box'>
          <input type="email" name='email' placeholder='Email' onChange={handleChange} required/>
          <label htmlFor="email"><EnvelopeSimple size={22} className='i'/>Email</label>
        </div>
        <div className='input-box'>
          <input type="password" name='password' placeholder='Password' onChange={handleChange} required/>
          <label htmlFor="password"><Lock size={22} className='i'/>Password</label>
        </div>
        <button className='login-btn'>Login</button>
        <p>You don't have an account? <Link to={'/signup'}>Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
