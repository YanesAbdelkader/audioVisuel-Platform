import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AddCategorie.css'; 
import { updateCategory, fetchCategoryById } from '../../services/CourseServices'; 
import { AuthContext } from '../../contexts/Auth-Context';

function UpdateCatA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { idCat } = useParams();
  const [formData, setFormData] = useState({
    imgCategory: null,
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchCategorieData = async () => {
      try {
        const fetchedCategory = await fetchCategoryById(idCat);
        setFormData({
          name: fetchedCategory.name,
          description: fetchedCategory.description,
        });
      } catch (error) {
        setError('Error fetching category');
        console.error('Error fetching category:', error);
      }
    };
    fetchCategorieData();
  }, [idCat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imgCategory: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    if(formData.imgCategory){
      form.append('image', formData.imgCategory);
    }
    form.append('description', formData.description)
    try {
      const response = await updateCategory(idCat, form);
      if (response.status === 200) {
        navigate('/admin/2');
      } else {
        setError(response.data.error || 'Error updating category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error updating category');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className='error' onClick={() => setError(null)}>
            <h4>{Array.isArray(error) ? error.join(', ') : error}</h4>
          </div>
        )}
        <h1>Update Category</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category name"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Category description"
        ></textarea>
        <label htmlFor="imgCategory">Image</label>
        <input
          type="file"
          accept='image/*'
          name="imgCategory"
          onChange={handleFileChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCatA;
