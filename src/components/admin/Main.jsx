import React, { useContext } from 'react'
import DashbordA from './DashbordA'
import CoursesA from './CoursesA'
import UsersA from './UsersA'
import AnalyseA from './AnalyseA'
import '../../styles/Main.css'
import { AuthContext } from '../../contexts/Auth-Context'
import { useParams } from 'react-router-dom'
import Categorie from './CategorieA'

function Main() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
    const { i } = useParams();
    const index = parseInt(i, 10);
    return (
      <div className='content'>
        {index === 0 && <DashbordA/>}
        {index === 1 && <CoursesA />}
        {index === 2 && <Categorie />}
        {index === 3 && <UsersA />}
        {index === 4 && <AnalyseA />}
      </div>
    );
  }

export default Main