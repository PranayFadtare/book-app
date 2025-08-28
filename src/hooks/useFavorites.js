// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = window.localStorage.getItem('favoriteBooks');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  const removeFavorite = (bookId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((book) => book.id !== bookId));
  };

  const isFavorite = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};