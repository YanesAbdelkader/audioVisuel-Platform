import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Favorite.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteItem from '../components/FavoriteItem'; 
import { fetchCourseById } from '../services/CourseServices'; 
import { FavContext } from '../contexts/Fav-Context'; // Ensure this matches your context export

function Favorites() {
    const navigate = useNavigate();
    const { favoriteItems, removeFromFavorite } = useContext(FavContext); // Ensure function name consistency
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            const courseIds = favoriteItems; // Directly use favoriteItems if it's an array
            const coursePromises = courseIds.map(id => fetchCourseById(id));

            try {
                const courseData = await Promise.all(coursePromises);
                const coursesMap = courseData.reduce((acc, course) => {
                    acc[course.id] = course;
                    return acc;
                }, {});
                setCourses(coursesMap);
            } catch (error) {
                console.error("Failed to fetch course data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (favoriteItems.length > 0) {
            loadCourses();
        } else {
            setLoading(false); // Set loading to false if there are no favorite items
        }
    }, [favoriteItems]);

    return (
        <>
            <Header />
            <div className='favorites'>
                <div>
                    <h1>Your Favorite Items</h1>
                </div>
                <div className='favorite-items'>
                    {loading ? (
                        <p>Loading your favorite items...</p>
                    ) : favoriteItems.length === 0 ? (
                        <p>Your favorites list is empty.</p>
                    ) : (
                        favoriteItems.map(courseId => {
                            const course = courses[courseId];
                            if (course) {
                                return (
                                    <FavoriteItem 
                                        key={courseId}
                                        courseId={courseId}
                                        name={course.name}
                                        imgBG={course.imgBG}
                                        price={course.prix}
                                        onRemove={removeFromFavorite}
                                    />
                                );
                            }
                            return <p key={courseId}>Loading...</p>;
                        })
                    )}
                </div>
                <div className='continue-shopping'>
                    <button className='btn-continue' onClick={() => navigate("/courses")}>Continue Shopping</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Favorites;
