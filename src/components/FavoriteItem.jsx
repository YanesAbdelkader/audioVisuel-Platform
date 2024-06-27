import React, { useContext } from 'react';
import API_URL from '../services/Api_URL';
import '../styles/FavoriteItem.css'; 
import { CartContext } from '../contexts/CartContext';

function FavoriteItem({ courseId, name, imgBG, price, onRemove }) {
    const { addToCart } = useContext(CartContext); 

    const handleAddToCart = () => {
        addToCart(courseId);
    };
    return (
        <div className="favorite-item">
            <span><img src={`${API_URL}/images/${imgBG}`} alt="Course" /></span>
            <span className='course-name'>{name}</span>
            <span className='course-price'>{price} DA</span>
            <div className="favorite-item-buttons">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={() => onRemove(courseId)}>Remove</button>
            </div>
        </div>
    );
}

export default FavoriteItem;
