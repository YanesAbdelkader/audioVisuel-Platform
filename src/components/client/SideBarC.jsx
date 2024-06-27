import { Gear, House, MonitorPlay, SignOut, UserList } from 'phosphor-react'
import React, { useContext } from 'react'
import '../../styles/SideBarC.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth-Context';
function SideBarC() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()
  return (
    <div className='sidebar'>
      <Link to={`/profile/0`} className='logo'>
        <div className="logo-name"><span>Course</span>Platform</div>
      </Link>
      <ul className='side-menu'>
        <li>
          <Link to={`/`}><span><House size={25} />_Go To Home</span></Link>
        </li>
        <li>
          <Link to={`/profile/0`}><span><MonitorPlay size={25} />_My Courses</span></Link>
        </li>
        <li>
          <Link to={`/profile/1`}><span><UserList size={25} />_History</span></Link>
        </li>
        <li>
          <Link to={`/profile/2`}><span><Gear size={25} />_Settings</span></Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <Link to='/profile/logout' className='logout'><SignOut size={25} /> Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBarC