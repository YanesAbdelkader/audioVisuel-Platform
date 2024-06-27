import { FacebookLogo, InstagramLogo } from 'phosphor-react';
import logo from '../assets/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const currentYear = new Date().getFullYear();
function Footer() {
  return (
    <div className='footer'>
      <div className='fcontainer'>
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="media">
          <Link to={'/'}>Home</Link>
          <Link to={'/'}>About us</Link>
          <span>+213 5-55-55-55-55</span>
          <Link><FacebookLogo size={32} /></Link>
          <Link><InstagramLogo size={32} /></Link>
          </div>
        <div className="copyright">
          <span> &copy; {currentYear} Courses-platform </span>
        </div>
      </div>
    </div>
  )
}

export default Footer