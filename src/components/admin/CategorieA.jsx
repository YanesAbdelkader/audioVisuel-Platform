import React, { useContext, useEffect, useState } from 'react';
import '../../styles/CategorieA.css';
import { Link } from 'react-router-dom';
import { fetchCategory } from '../../services/CourseServices';
import API_URL from '../../services/Api_URL';
import { AuthContext } from '../../contexts/Auth-Context';

function CategorieA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const [Categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await fetchCategory();
      setCategories(fetchedCategories);
    } catch (error) {
      setError('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='categorie-container' >
      <h1>Categories :</h1>
      <table >
        <thead>
          <tr >
            <td >
              <Link to="/admin/add-categorie" ><button className='add-btn'>Add Category</button></Link>
            </td>
          </tr>
          <tr>
            <th className='ccolumn'>Icon</th>
            <th className='ccolumn'>Title</th>
            <th className='ccolumn'>Description</th>
            <th className='ccolumn'>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categories.map((categorie) => (
            <tr key={categorie.categorie_id}>
              <td className='crow'>
                <img src={`${API_URL}/images/${categorie.image}`} alt="Category" />
              </td>
              <td className='crow'>{categorie.name}</td>
              <td className='crow'>
                <span>{categorie.description}</span>
              </td>
              <td className='crow'>
                <Link to={`/admin/update-categorie/${categorie.id}`}>
                  <button className='update-btn'>Update Category</button>
                </Link>
                <Link to={`/admin/remove-categorie/${categorie.id}`}>
                  <button className='remove-btn'>Remove Category</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategorieA;
