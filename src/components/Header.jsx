import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartStraight, MagnifyingGlass, ShoppingCart } from 'phosphor-react';
import logo from '../assets/logo.png';
import '../styles/header.css';
import Profile from '../components/Profile';

function Header() {
  const token = localStorage.getItem('token')
  const [connected, setConnected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search) {
      navigate(`/search/${search}`);
    }
  };

  useEffect(() => {
    if (token) {
      setConnected(true);
    } else {
      setConnected(false);
    }
    setLoading(false);
  }, [token]);

  return (
    <div className='header'>
      <Link className='href' to='/'><img src={logo} alt="courses platform" /></Link>
      <div className='search'>
        <input type="text" placeholder='Search...' onChange={handleChange} className='inputS' />
        <button onClick={handleSearch}><MagnifyingGlass size={25} color="#fefbfb" /></button>
      </div>
      <div className='right-bar'>
        <Link className='href' to='/courses'>Courses</Link>
        <Link className='href' to='/favorite'><HeartStraight size={32} /></Link>
        <Link className='href' to='/cart'><ShoppingCart size={32} /></Link>
        {connected ? (
          <Profile />
        ) : (
          <>
            {loading ? (
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div className='auth-btn'>
                <Link className='href' to='/login'><button className='Login-btn' type="button">LogIn</button></Link>
                <Link className='href' to='/signup'><button className='Signup-btn' type="button">SignUp</button></Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
