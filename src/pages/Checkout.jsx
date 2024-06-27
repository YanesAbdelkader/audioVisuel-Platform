import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../contexts/CartContext';
import '../styles/Chekout.css';
import { AuthContext } from '../contexts/Auth-Context';
import { fetchCourseById } from '../services/CourseServices';
import { checkout } from '../services/Payment Service';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { ClinetConnected } = useContext(AuthContext);
  ClinetConnected();

  const { cartItems, removeFromCart } = useContext(CartContext);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [courses, setCourses] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [successful, setSuccessful] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseIds = Object.keys(cartItems);
      try {
        const coursesData = await Promise.all(courseIds.map(id => fetchCourseById(id)));
        const coursesById = coursesData.reduce((acc, course) => {
          acc[course.id] = course;
          return acc;
        }, {});
        setCourses(coursesById);

        const amount = coursesData.reduce((total, course) => {
          return total + (course.prix * cartItems[course.id]);
        }, 0);
        setTotalAmount(amount);
      } catch (error) {
        console.error('Error fetching course details', error);
      }
    };

    fetchCourseDetails();
  }, [cartItems]);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cartData = {
      course_ids: Object.keys(cartItems),
      totalAmount,
      paymentDetails,
    };

    try {
      await checkout(cartData);
      setSuccessful('Payment Successful');
      Object.keys(cartItems).forEach((cartItemId) => {
        removeFromCart(cartItemId);
      });
      navigate('/profile/0');
    } catch (error) {
      setError('There was an error processing the payment!');
      console.error('There was an error processing the payment!', error);
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-form-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h1>Checkout</h1>
          {successful && (
            <div className="success-message">
              <p>{successful}</p>
            </div>
          )}
          {error && (
            <div className="error-message" onClick={()=> setError(null)}>
              <p>{error}</p>
            </div>
          )}
          <div className="payment-details">
            <h2>Payment Details</h2>
            <label>
              Card Number:
              <input
                type="number"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              CVV:
              <input
                type="number"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="order-summary">
            <h2>Order Summary</h2>
            {Object.keys(cartItems).map((courseId) => {
              const course = courses[courseId];
              return course ? (
                <div key={courseId} className="course-item">
                  <p>{course.name}</p>
                  <p>Quantity: {cartItems[courseId]}</p>
                  <p>Price: {course.prix} DA</p>
                </div>
              ) : null;
            })}
            <h3>Total Amount: {totalAmount.toFixed(2)} DA</h3>
          </div>
          <button type="submit">Submit Payment</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
