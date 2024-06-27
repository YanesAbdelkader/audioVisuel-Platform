import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [formData, setFormData] = useState({
    name: '',
    prix: '',
    duration: '',
    desc: '',
    categorie_id: '',
    imgBG: null
  });

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
    form.append('duration', formData.duration);
    form.append('desc', formData.desc);
    form.append('category_id', formData.categorie_id);
    form.append('imgBG', formData.imgBG);

    try {
      const response = await axios.post('http://192.168.38.171/api/course/add', form, {
        headers: {
          'Authorization': 'Bearer 4|E4yttuq2gJSjDaYMB6HnBoPzL4nv5SyXLP66KScub706ad23',
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Prix:</label>
        <input type="number" name="prix" value={formData.prix} onChange={handleChange} required />
      </div>
      <div>
        <label>Duration:</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="desc" value={formData.desc} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Categorie :</label>
        <input type="number" name="course_id" value={formData.course_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="imgBG" onChange={handleFileChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;