import React, { useContext, useEffect, useState } from 'react';
import '../../styles/DashbordA.css';
import { Link } from 'react-router-dom';
import { AlignCenterVertical, CreditCard, MonitorPlay, Users } from 'phosphor-react';
import { AuthContext } from '../../contexts/Auth-Context';
import { fetchCourses, fetchCategory, fetchUsers, fetchInvoices } from '../../services/CourseServices';

function DashbordA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCourses, fetchedCategories, fetchedUsers, fetchedInvoices] = await Promise.all([
          await fetchCourses(),
          await fetchCategory(),
          await fetchUsers(),
          await fetchInvoices()
        ]);

        setData({
          courses: fetchedCourses,
          categories: fetchedCategories,
          clients: fetchedUsers,
          invoices: fetchedInvoices,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='dashbord'>
      <h1>Global Information :</h1>
      {error && <p className='error'>Error fetching data </p>}
      {data ? (
        <div className='info-container'>
          <div className='info'>
            <Link to={`/admin/3`}>
              <Users size={45} />
              Clients : <h2>{data.clients.length}</h2>
            </Link>
          </div>
          <div className='info'>
            <Link to={`/admin/1`}>
              <MonitorPlay size={45} />
              Courses : <h2>{data.courses.length}</h2>
            </Link>
          </div>
          <div className='info'>
            <Link to={`/admin/2`}>
              <CreditCard size={45} />
              Categories : <h2>{data.categories.length}</h2>
            </Link>
          </div>
          <div className='info'>
            <Link to={`/admin/4`}>
              <CreditCard size={45} />
              Invoices : <h2>{data.invoices.length}</h2>
            </Link>
          </div>
        </div>
      ) : (
        <p style={{color : 'red',marginLeft : '20px'}} >Loading...</p>
      )}
    </div>
  );
}

export default DashbordA;
