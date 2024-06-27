import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CoursesA.css';
import { AuthContext } from '../../contexts/Auth-Context';
import { fetchCourses as fetchCoursesService } from '../../services/CourseServices';
import API_URL from '../../services/Api_URL';

function CoursesA() {
  const { AdminConnected } = useContext(AuthContext);
  AdminConnected();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await fetchCoursesService();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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

  return (
    <div className='courses-container'>
      <h1>Courses :</h1>
      <table>
        <thead>
          <tr >
            <Link to="/admin/add-course"><button className='add-btn'>Add Course</button></Link>
          </tr>
          <tr>
            <th className='ccolumn'>Background Image</th>
            <th className='ccolumn'>Title</th>
            <th className='ccolumn'>Description</th>
            <th className='ccolumn'>Duration</th>
            <th className='ccolumn'>Price</th>
            <th className='ccolumn'>Category</th>
            <th className='ccolumn'>Number of Videos</th>
            <th className='ccolumn'>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className='crow'><img src={`${API_URL}/images/${course.imgBG}`} alt="Course" /></td>
              <td className='crow'>{course.name}</td>
              <td className='crow'><span>{course.desc}</span></td>
              <td className='crow'>{secondsToHoursAndMinutes(course.duration)}</td>
              <td className='crow'>{course.prix} DA</td>
              <td className='crow'>{course.category_name}</td>
              <td className='crow'>{course.videos_count}</td>
              <td className='crow'>
                <Link to={`/admin/update-course/${course.id}`}><button className='update-btn'>Update Course</button></Link>
                <Link to={`/admin/manage-videos/${course.id}`}><button className='manage-btn'>Manage Videos</button></Link>
                <Link to={`/admin/remove-course/${course.id}`}><button className='remove-btn'>Remove Course</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesA;
