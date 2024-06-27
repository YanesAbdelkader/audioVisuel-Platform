import React, { useContext, useEffect, useState } from 'react';
import '../styles/CourseDetail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCourseById } from '../services/CourseServices';
import { useParams } from 'react-router-dom';
import API_URL from '../services/Api_URL';
import { CartContext } from '../contexts/CartContext';
import { FavContext } from '../contexts/Fav-Context';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext)
  const { addToFavorite } = useContext(FavContext)

  const fetchCourse = async (id) => {
    try {
      const fetchedCourse = await fetchCourseById(id);
      setCourse(fetchedCourse);
    } catch (error) {
      setError('Error fetching course');
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    fetchCourse(id);
  }, [id]);


  function secondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    if (hours >= 1) {
      if (remainingMinutes >= 1) {
        return `${hours} h ${remainingMinutes} min`;
      } else {
        return `${hours} hours`;
      }
    } else {
      return `${remainingMinutes} minutes`;
    }
  }

  if (error) {
    return (
      <>
        <Header />
        <div className='Cbody-container'>
          <div className='right-container'>
            <h1>Error</h1>
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <div className='Cbody-container'>
          <div className='right-container'>
            <h1>Loading...</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className='Cbody-container'>
        <div className='right-container'>
          <h1>{course.name}</h1>
          <p>{course.desc}</p>
          <div className='course-info-min'>
            <span>Number of Videos : {course.numbervideo} video</span>
            <span>Duration: {secondsToHoursAndMinutes(course.duration)}</span>
          </div>
        </div>
        <div className='left-container'>
          <img src={`${API_URL}/images/${course.imgBG}`} alt="Course" />
          <h1>Price: {course.prix} DA</h1>
          <button className='add-btn' onClick={()=>addToCart(id)}>Add to cart</button>
          <button className='add-btn' onClick={()=>addToFavorite(id)}>Add to Favorite</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseDetail;
