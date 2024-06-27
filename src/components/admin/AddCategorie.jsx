import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddCategorie.css';
import { addCategory } from '../../services/CourseServices';
import { AuthContext } from '../../contexts/Auth-Context';

function AddCategorie() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('image', formData.image); // Ensure 'image' matches what the backend expects

    try {
      const response = await addCategory(form);
      if (response.status === 200) {
        navigate('/admin/2');
      } else {
        const errorData = response.data; // Assuming response.data contains error details
        setError(errorData.message || 'Error adding category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Error adding category');
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
        <h1>Add new Category</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category name"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Category description"
          required
        ></textarea>
        <label htmlFor="imgCategory">Image</label>
        <input
          type="file"
          accept='image/*'
          name="imgCategory"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddCategorie;
