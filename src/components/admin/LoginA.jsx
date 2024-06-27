import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeSimple, Lock } from 'phosphor-react';
import '../../styles/Login.css';
import { loginAdmin } from '../../services/AuthenticationService';

function LoginA() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
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

    const response = await loginAdmin(form);
    if (response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      navigate('/admin/0');
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="login-container" style={{ height: '500px' }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && (
          <div className="error" onClick={() => setError(null)}>
            <h4>{Array.isArray(error) ? error.join(', ') : error}</h4>
          </div>
        )}
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">
            <EnvelopeSimple size={22} className="i" />
            Email
          </label>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">
            <Lock size={22} className="i" />
            Password
          </label>
        </div>
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default LoginA;
