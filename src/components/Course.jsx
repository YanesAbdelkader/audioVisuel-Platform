import React from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../services/Api_URL'
function Course(props) {
  const { data } = props;
  const { id, name, duration, prix, imgBG, category_name, category_id } = data
  function secondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    if(hours>=1){
      if(remainingMinutes>=1){
        return hours +' h '+remainingMinutes+' min'
      }else{
        return hours +' hours'
      }
    }else{
      return remainingMinutes + ' minutes' 
    }  
  }
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <div className="card" style={{ width: '20.2rem', margin: '1rem' }}>
        <img className="card-img-top" style={{height:'200px'}} src={`${API_URL}/images/${imgBG}`} alt="Course" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Duration: {secondsToHoursAndMinutes(duration)} </p>
          <p className="card-text" id={category_id}>Categorie : {category_name} </p>
          <p className="card-text">Price: {prix} DA</p>
          <Link to={`/courseDetail/${id}`} className="btn btn-primary" 
          style={{ backgroundColor: 'red', border: '1px solid red' }} >
            Go to Details
          </Link>
        </div>
      </div>
    </>
  );
}

export default Course;