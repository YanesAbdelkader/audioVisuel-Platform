import React, { useContext, useEffect } from 'react'
import SideBarC from '../../components/client/SideBarC'
import MainC from '../../components/client/MainC'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth-Context';

function Client() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()
  return (
    <div>
        <SideBarC/>
        <MainC/>
    </div>
  )
}

export default Client