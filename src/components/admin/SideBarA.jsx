import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SideBarA.css';
import { CreditCard, House, MonitorPlay, SignOut, Users } from 'phosphor-react';
import { AuthContext } from '../../contexts/Auth-Context';

function SideBarA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  return (
    <div className='sidebar'>
      <Link to={`/admin/0`} className='logo'>
        <div className="logo-name"><span>Course</span>Platform</div>
      </Link>
      <ul className='side-menu'>
        <li>
          <Link to={`/admin/0`}><span><House size={25} />_Dashboard</span></Link>
        </li>
        <li>
          <Link to={`/admin/1`}><span><MonitorPlay size={25} />_Courses</span></Link>
        </li>
        <li>
          <Link to={`/admin/2`}><span><MonitorPlay size={25} />_Categories</span></Link>
        </li>
        <li>
          <Link to={`/admin/3`}><span><Users size={25} />_Users</span></Link>
        </li>
        <li>
          <Link to={`/admin/4`}><span><CreditCard size={25} />_Invoices</span></Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <Link to='/admin/logout' className='logout'><SignOut size={25} />Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBarA;
