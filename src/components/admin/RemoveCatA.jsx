import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCategory } from '../../services/CourseServices';
import { AuthContext } from '../../contexts/Auth-Context';

function RemoveCatA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const { idCat } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const removeCategory = async () => {
      try {
        const response = await deleteCategory(idCat);
        if(response.status === 200){
          navigate('/admin/2');
        }
      } catch (error) {
        setError('Error removing category');
        console.error('Error removing category:', error);
      }
    };
    removeCategory();
  }, [idCat, navigate]);

  return (
    <div>
      {error ? (
        <div className='error'>
          <h4 onClick={()=>{navigate('/admin/2')}}>{error}</h4>
        </div>
      ) : (
        <p>Removing category...</p>
      )}
    </div>
  );
}

export default RemoveCatA;
