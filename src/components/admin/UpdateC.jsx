import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/UpdateC.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { fetchCategory, fetchCourseById, updateCourse } from '../../services/CourseServices';

function UpdateC() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();

  const { idC } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prix: '',
    duration: '',
    desc: '',
    categorie_id: '',
    imgBG: null,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const fetchedCourse = await fetchCourseById(idC);
        setCourse(fetchedCourse);
        setFormData({
          name: fetchedCourse.name,
          prix: fetchedCourse.prix,
          duration: fetchedCourse.duration,
          desc: fetchedCourse.desc,
          categorie_id: fetchedCourse.categorie_id,
          imgBG: null, 
        });
      } catch (error) {
        setError('Error fetching course');
        console.error('Error fetching course:', error);
      }
    };

    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        setError('Error fetching categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCourseData();
    fetchCategoriesData();
  }, [idC]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imgBG: file || null }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('prix', formData.prix);
    form.append('duration', formData.duration);
    form.append('desc', formData.desc);
    form.append('categorie_id', formData.categorie_id);
    if (formData.imgBG) {
      form.append('imgBG', formData.imgBG);
    }
  
    try {
      const response = await updateCourse(idC, form);
      if (response.status === 200) {
        navigate('/admin/1');
      } else {
        const errorData = response.message; 
        setError(errorData || 'Error updating course');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Error updating course');
    }
  };
  

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className='error' onClick={() => setError(null)}>
            <h4>{Array.isArray(error) ? error.join(', ') : error}</h4>
          </div>
        )}
        <h1>Update Course</h1>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='title..'
        />
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          placeholder='description..'
          value={formData.desc}
          onChange={handleChange}
        />
        <label htmlFor="categorie_id">Category</label>
        <select
          name="categorie_id"
          value={formData.categorie_id}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="prix">Price</label>
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          placeholder='price..'
        />
        <label htmlFor="imgBG">Background Image</label>
        <input
          type='file'
          accept='image/*'
          name="imgBG"
          onChange={handleFileChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateC;
