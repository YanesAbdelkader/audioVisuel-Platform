import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IdentificationBadge, IdentificationCard, User, PaperPlaneTilt, Password, CheckSquareOffset } from 'phosphor-react';
import '../styles/Signup.css';
import { signupUser } from '../services/AuthenticationService';
import { AuthContext } from '../contexts/Auth-Context';

function Signup() {
  const { connected } = useContext(AuthContext);
  useEffect(()=>{
    if(connected){
      navigate('/');
    }
  })
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.cpassword === data.password) {
      const form = new FormData();
      form.append('firstname', data.fname);
      form.append('lastname', data.lname);
      form.append('email', data.email);
      form.append('name', data.username);
      form.append('password', data.password);
  
      const response = await signupUser(form);
  
      if (!response.error) {
        navigate('/login');
      } else {
        if (typeof response.error === 'object') {
          const errorMessages = Object.values(response.error).flat().join(', ');
          setError(errorMessages);
        } else {
          setError(response.error);
        }
      }
    } else {
      setError('Passwords do not match.');
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>SignUp</h2>
        {error && <div className='errorr' onClick={() => setError(null)}><h4>{error}</h4></div>}
        <div className='input-sbox'>
          <label htmlFor="fname"><IdentificationCard size={22} className='i'/>First Name</label>
          <input type="text" name="fname" placeholder='First name..' onChange={handleChange} required/>
        </div>
        <div className='input-sbox'>
          <label htmlFor="lname"><IdentificationBadge size={22} className='i'/>Last Name</label>
          <input type="text" name="lname" placeholder='Last name..' onChange={handleChange} required/>
        </div>
        <div className='input-sbox'>
          <label htmlFor="username"><User size={22} className='i'/>User Name</label>
          <input type="text" name="username" placeholder='User name..' onChange={handleChange} required/>
        </div>
        <div className='input-sbox'>
          <label htmlFor="email"><PaperPlaneTilt size={22} className='i'/>Email</label>
          <input type="email" name='email' placeholder='Email..' onChange={handleChange} required/>
        </div>
        <div className='input-sbox'>
          <label htmlFor="password"><Password size={22} className='i'/>Password</label>
          <input type="password" name='password' placeholder='Password..' onChange={handleChange} required/>
        </div>
        <div className='input-sbox'>
          <label htmlFor="cpassword"><CheckSquareOffset size={22} className='i'/>Confirm Password</label>
          <input type="password" name='cpassword' placeholder='Confirm password..' onChange={handleChange} required/>
        </div>
        <button className='signup-btn'>Signup</button>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </form>
    </div>
  );  
}

export default Signup;
