import React, { createContext, useState, useEffect } from 'react';

export const FavContext = createContext(null);

function FavContextProvider(props) {

  const getDefaultFavorite = () => {
    const storedFavorites = localStorage.getItem('favorite');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  const [favoriteItems, setFavoriteItems] = useState(getDefaultFavorite);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addToFavorite = (courseId) => {
    setFavoriteItems((prev) => {
      if (prev.includes(courseId)) return prev; 
      return [...prev, courseId];
    });
  }

  const removeFromFavorite = (courseId) => {
    setFavoriteItems((prev) => prev.filter(id => id !== courseId));
  }

  const contextValue = { favoriteItems, addToFavorite, removeFromFavorite };

  return (
    <FavContext.Provider value={contextValue}>
      {props.children}
    </FavContext.Provider>
  );
}

export default FavContextProvider;
