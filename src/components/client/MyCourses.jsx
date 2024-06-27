import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/MyCourses.css'
import { Play } from 'phosphor-react'
import { AuthContext } from '../../contexts/Auth-Context'
import { fetchUserCourses } from '../../services/CourseServices'
import API_URL from '../../services/Api_URL'

function MyCourses() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected()

  const navigate = useNavigate();

  const [courses,setCourses] = useState();
  const [error,setError] = useState();

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await fetchUserCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      setError('Error fetching courses');
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='body-container'>
        <h1>Your Courses :</h1>
        <ul>
          {courses && courses.length > 0 ? courses.map((course) => (
            <li key={course.id} className='course-container'>
                <img src={`${API_URL}/images/${course.imgBG}`} alt="course image background" />
                <h2>{course.name}</h2>
                <Link to={`/profile/course/${course.id}`}><button>Start <Play size={22} /></button></Link>
            </li>
          )) : (
            <p className='buyCourse' onClick={()=>navigate('/courses')}>You don't have courses for the moment, Click to buy one!!</p>
          )
        }
        </ul>
    </div>
  )
}

export default MyCourses