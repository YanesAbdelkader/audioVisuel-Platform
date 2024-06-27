import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import MyCourses from './MyCourses';
import History from './History';
import Settings from './Settings';
import '../../styles/MainC.css'
import { AuthContext } from '../../contexts/Auth-Context';

function MainC() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()
    const { i } = useParams();
    const index = parseInt(i, 10);
  return (
    <div className='container'>
      { index === 0 && <MyCourses/> }
      { index === 1 && <History/> }
      { index === 2 && <Settings/> }
    </div>
  )
}

export default MainC