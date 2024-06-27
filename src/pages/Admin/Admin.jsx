import React, { useContext } from 'react'
import SideBarA from '../../components/admin/SideBarA'
import Main from '../../components/admin/Main'
import { AuthContext } from '../../contexts/Auth-Context';

function Admin() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  return (
    <div>
        <SideBarA/>
        <Main />
    </div>
  )
}

export default Admin