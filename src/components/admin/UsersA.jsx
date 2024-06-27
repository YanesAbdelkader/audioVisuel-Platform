import React, { useContext, useEffect, useState } from 'react';
import '../../styles/UserA.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { fetchUsers as fetchUsersService } from '../../services/CourseServices';

function UsersA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await fetchUsersService();
      if (Array.isArray(fetchedUsers)) {
        setUsers(fetchedUsers);
      } else {
        setError('Invalid data format received from the server');
      }
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='user-container'>
      <h1>Our Clients :</h1>
      <table >
        <thead>
          <tr>
            <th className='colum'>Name</th>
            <th className='colum'>Prenom</th>
            <th className='colum'>Email</th>
            <th className='colum'>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className='row'>{user.firstname}</td>
                <td className='row'>{user.lastname}</td>
                <td className='row'>{user.email}</td>
                <td className='row'>{user.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4' className='td'>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersA;
