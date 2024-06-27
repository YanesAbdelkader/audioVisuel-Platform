import React, { useContext, useEffect, useState } from 'react';
import '../../styles/AddC.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { addCourse, fetchCategory } from '../../services/CourseServices';
import { useNavigate } from 'react-router-dom';

function AddC() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prix: '',
    desc: '',
    categorie_id: '',
    imgBG: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData);
      } catch (error) {
        setError('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imgBG: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('prix', formData.prix);
    form.append('desc', formData.desc);
    form.append('category_id', formData.categorie_id);
    form.append('imgBG', formData.imgBG);
  
    try {
      const response = await addCourse(form);
      if (response.status === 200) {
        navigate('/admin/1');
      } else {
        setError('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Add new Course</h1>
        {error && <div className="error" onClick={() => setError(null)}><h4>{Array.isArray(error) ? error.join(', ') : error}</h4></div>}
        <label htmlFor="name">Title</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="title.." required />
        <label htmlFor="desc">Description</label>
        <textarea name="desc" placeholder="description.." value={formData.desc} onChange={handleChange} required></textarea>
        <label htmlFor="categorie_id">Category</label>
        <select name="categorie_id" value={formData.categorie_id} onChange={handleChange} required>
          <option value="" disabled>Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <label htmlFor="prix">Price</label>
        <input type="number" name="prix" value={formData.prix} onChange={handleChange} placeholder="price.." required />
        <label htmlFor="imgBG">Background Image</label>
        <input type="file" accept="image/*" name="imgBG" onChange={handleFileChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddC;
