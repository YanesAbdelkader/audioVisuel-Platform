import React, { createContext, useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

function AuthContextProvider(props) {
  const authData = useRef({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      authData.current = { token, role };
    }
  }, []);

  const AdminConnected = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (authData.current.token) {
        if (authData.current.role !== 'admin') {
          navigate('/');
        }
      } else {
        navigate('/admin/login');
      }
    }, [navigate]);
  };
  
  const ClinetConnected = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!authData.current.token) {
        navigate('/login');
      }
    }, [navigate]);
  };


  const contextValue = {  AdminConnected, ClinetConnected };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
