import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Settings.css'
import { AuthContext } from '../../contexts/Auth-Context';
import { userInfo } from '../../services/AuthenticationService';

function Settings() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()

  const [user,setUser] = useState({});
  useEffect(()=>{
    const fetchUserInfo = async ()=>{
      const fetchedUserInfo = await userInfo();
      if(fetchedUserInfo.status = 200){
        setUser(fetchedUserInfo.user);
      }
      else {
        console.error(fetchedUserInfo.error);
      }
    }
    fetchUserInfo();
  },[])
  return (
    <div className='settings-container'>
      <h1 className='title'>Settings :</h1>
      <ul>
        <li className='lrow'>
          <span>
            <h3>Your First name : </h3>
            <p>{user.firstname}</p>
          </span>
        </li>
        <li className='lrow'>
          <span>
            <h3>Your Last name : </h3>
            <p>{user.lastname}</p>
          </span>
        </li>
        <li className='lrow'>
          <span>
            <h3>Your Email : </h3>
            <p>{user.email}</p>
          </span>
        </li>
        <li className='lrow'>
          <span>
            <h3>Your Username : </h3>
            <p>{user.name}</p>
          </span>
        </li>
        <li className='lrow'>
          <Link to={`/profile/modifierI`}>
            <button className='modi'>Modifier your info</button>
          </Link>
          <Link to={`/profile/modifierP`}>
            <button className='modp'>Modifier your Password</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Settings