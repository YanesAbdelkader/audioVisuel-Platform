import React from 'react';
import API_URL from '../services/Api_URL';
import '../styles/CartItems.css'

function CartItem({ courseId, name, imgBG, quantity, prix, onRemove, }) {
    return (
        <div className="cart-item">
            <span><img src={`${API_URL}/images/${imgBG}`} alt="Course" /></span>
            <span className='course-name'>{name}</span>
            <span className='course-price'>{prix} DA</span>
            <button onClick={() => onRemove(courseId)}>Remove</button>
            {console.log(prix)}
        </div>
    );
}

export default CartItem;
