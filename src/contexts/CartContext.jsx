import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

function CartContextProvider(props) {
    const getDefaultCart = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : {};
    };

    const [cartItems, setCartItems] = useState(getDefaultCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (courseId) => {
        setCartItems((prev) => {
            if (!prev[courseId]) {
                return { ...prev, [courseId]: 1 };
            }
            return prev;
        });
    };

    const removeFromCart = (courseId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[courseId]) {
                delete updatedCart[courseId];
            }
            return updatedCart;
        });
    };

    const updateCartItemCount = (newAmount, courseId) => {
        setCartItems((prev) => {
            if (newAmount > 0) {
                return { ...prev, [courseId]: newAmount };
            } else {
                const updatedCart = { ...prev };
                delete updatedCart[courseId];
                return updatedCart;
            }
        });
    };

    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
