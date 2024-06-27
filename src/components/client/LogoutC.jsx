import React, { useContext } from 'react'
import { Check, X } from 'phosphor-react'
import '../../styles/LogoutC.css'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/AuthenticationService';
import { AuthContext } from '../../contexts/Auth-Context';

function LogoutC() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()

  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate('/')
  };

  const navigation = () => {
    window.history.back();
  };

  return (
    <div className='logout-container'>
      <p>Are you sure?</p>
      <div className='btn'>
        <button className='no' onClick={navigation}><X size={32} /></button>
        <button className='yes' onClick={handleLogout}><Check size={32} /></button>
      </div>
    </div>
  );
}

export default LogoutC