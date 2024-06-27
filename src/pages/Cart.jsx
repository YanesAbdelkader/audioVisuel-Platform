import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItems';
import { fetchCourseById } from '../services/CourseServices';
import { CartContext } from '../contexts/CartContext';


function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateCartItemCount } = useContext(CartContext);
    const [courses, setCourses] = useState({});

    useEffect(() => {
        const loadCourses = async () => {
            const courseIds = Object.keys(cartItems);
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
            }
        };

        loadCourses();
    }, [cartItems]);

    const calculateSubtotal = () => {
        return Object.entries(cartItems).reduce((total, [courseId, count]) => {
            const course = courses[courseId];
            if (course) {
                return total + course.prix * count;
            }
            return total;
        }, 0);
    };

    return (
        <>
            <Header />
            <div className='cart'>
                <div>
                    <h1>Your Cart Items</h1>
                </div>
                <div className='cart-items' >
                    {Object.entries(cartItems).length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        Object.entries(cartItems).map(([courseId, count]) => {
                            const course = courses[courseId];
                            if (course) {
                                {console.log(course)}
                                return (
                                    <CartItem 
                                        key={courseId}
                                        courseId={courseId}
                                        name={course.name}
                                        imgBG={course.imgBG}
                                        prix={course.prix}
                                        quantity={count}
                                        onRemove={removeFromCart}
                                        onUpdateQuantity={updateCartItemCount}
                                    />
                                );
                            }
                            return <p key={courseId}>Loading...</p>;
                        })
                    )}
                </div>
                <div className='checkout'>
                    <p className='sub'> Subtotal: {calculateSubtotal()} DA</p>
                    <button className='btn-continue' onClick={() => navigate("/courses")}>Continue Shopping</button>
                    {Object.entries(cartItems).length >= 1 && <button className='btn-check' onClick={() => navigate("/checkout")}>Checkout</button>}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
