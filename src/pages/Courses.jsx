import React, { useEffect, useState } from 'react';
import Course from '../components/Course';
import '../styles/Courses.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import { fetchCourses } from '../services/CourseServices';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const allCourses = await fetchCourses();
        setCourses(allCourses);
        setFilteredCourses(allCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchAllCourses();
  }, []);

  const handleFilterChange = (category) => {
  setSelectedCategory(category);
  if (category) {
    const filtered = courses.filter(course => course.category_id == category);
    setFilteredCourses(filtered);
  } else {
    setFilteredCourses(courses);
  }
};

  return (
    <>
      <Header />
      <div className='qwerty'>
        <Filter onFilterChange={handleFilterChange} />
        <div className="Ccourses-container">
          <h1 className="course-title">Our Courses:</h1>
          <div className="courses">
            {filteredCourses.length !== 0 ? (
              filteredCourses.map((course) => (
                <Course key={course.id} data={course} />
              ))
            ) : (
              <p>No Courses for the moment</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;
