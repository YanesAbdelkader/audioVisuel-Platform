import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import img1 from '../assets/image2.jpg';
import img2 from '../assets/image1.jpg';
import img3 from '../assets/image3.jpg';
import { Checks } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { fetchCategory } from '../services/CourseServices';
import API_URL from '../services/Api_URL';

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        setError('Failed to fetch categories');
      }
    };

    getCategoryData();
  }, []);
  return (
    <div>
      <Header />
      <div className='main-home' >
        <h1>Welcome to AudioVisual Courses <br/><hr /> Your Gateway to Mastering Audio and Visual Arts</h1>
        <p style={{width:'85%',fontSize:'22px',color:'#ddd'}}>
        Unlock your potential with our comprehensive online courses in audio and visual arts. Designed for both aspiring and seasoned professionals, our courses are led by industry experts, providing top-notch education and practical insights. Enhance your skills in audio engineering, video production, or sound design with our flexible, user-friendly platform. Join us today and transform your passion into a rewarding career.
        </p>
        <button onClick={() => navigate("/courses/0")}>Explore our courses</button>
      </div>
      <h2 className='title'>Our Best Categories</h2>
      <div className='main-categories'>
        {error&&<span>{error}</span>}
        {categories.map((category) => (
          <div key={category.id} className='category' onClick={() => navigate(`/courses/${category.id}`)}>
            <img src={`${API_URL}/images/${category.image}`} alt="Category" />
            <h4>{category.name}</h4>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <div className='main-suggest'>
        <div className='main-suggest-left'>
          <div>
            <h2>Our courses are very rich</h2>
            <ul>
              <li><Checks size={22} className='i' />Easy to follow</li>
              <li><Checks size={22} className='i' />Step by step</li>
              <li><Checks size={22} className='i' />Pomodoro method</li>
            </ul>
            <p>
                Our courses are rich in content and designed to be easy to follow. With a step-by-step approach and the effective Pomodoro method, we ensure you stay engaged and productive. Dive into the world of audio and visual arts with our expertly crafted courses and transform your skills today.
            </p>
          </div>
          <img src={img1} alt="Rich courses" />
        </div>
        <div className='main-suggest-right'>
          <img src={img2} alt="Client focus" />
          <div className='right-suggest'>
            <h2>The client is in our eyes</h2>
            <ul>
              <li><Checks size={22} className='i' />Affordable prices</li>
              <li><Checks size={22} className='i' />Professional instructors</li>
              <li><Checks size={22} className='i' />High quality</li>
            </ul>
            <p>
            At AudioVisual, the client is our priority. We offer high-quality courses at affordable prices, taught by professional instructors. Experience top-notch education tailored to your needs and budget. Join us today and elevate your skills in audio and visual arts.
            </p>
          </div>
        </div>
      </div>
      <div className='main-action'>
        <h2>Start your journey with us</h2>
        <p style={{width:'80%'}}>
        Begin your journey with us and discover a world of opportunities. Our courses provide expert guidance and practical skills in audio and visual arts. Whether you’re a beginner or seasoned enthusiast, we offer the tools and support you need to succeed. Join us and unleash your creativity today.
        </p>
        <button onClick={() => navigate("/courses/0")}>Buy Courses now!</button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
