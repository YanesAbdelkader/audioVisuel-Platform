import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCourse } from '../../services/CourseServices';
import { AuthContext } from '../../contexts/Auth-Context';

function RemoveCourseA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const { idC } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const removeCourse = async () => {
      try {
        const response = await deleteCourse(idC);
        if (response.status === 200) {
          navigate('/admin/1');
        } else {
          setError('Error removing course'); 
          console.error('Error removing course:', response.statusText);
        }
      } catch (error) {
        setError('Error removing course'); 
        console.error('Error removing course:', error);
      }
    };

    removeCourse();
  }, [idC, navigate]);

  return (
    <div>
      {error ? (
        <div className='error'>
          <h4 onClick={() => navigate('/admin/1')}>{error} - Click here to return</h4>
        </div>
      ) : (
        <p className='loading'>Removing course...</p>
      )}
    </div>
  );
}

export default RemoveCourseA;
