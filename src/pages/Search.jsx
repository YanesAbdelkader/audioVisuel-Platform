import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import Filter from '../components/Filter';
import Course from '../components/Course';
import Footer from '../components/Footer';
import { fetchCourseBySearch } from '../services/CourseServices';
import '../styles/Courses.css';


function Search() {
  const { search }  = useParams();
  const [courses,setCourses] = useState();

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await fetchCourseBySearch(search);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <div className='qwerty'>
        <Filter/>
        <div className="Ccourses-container">
          <h1 className="course-title">Our Courses:</h1>
          <div className="courses">
            {courses ? (
              courses.map((course) => (
                <Course key={course.id} data={course} />
              ))
            ) : (
            <p>No Courses found !!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Search