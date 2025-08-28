// src/pages/FavoritesPage.jsx
import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { isDark } = useTheme();

  if (favorites.length === 0) {
    return (
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          My Favorites
        </h1>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          You haven't added any favorite books yet.
        </p>
        <Link 
          to="/" 
          className={`mt-4 inline-block ${
            isDark 
              ? 'text-indigo-400 hover:text-indigo-300' 
              : 'text-indigo-600 hover:text-indigo-500'
          } hover:underline`}
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-6 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        My Favorites
      </h1>
      <div className="space-y-4">
        {favorites.map(book => (
          <div key={book.id} className={`p-4 rounded-lg shadow-md flex items-center justify-between ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-4">
              <img src={book.coverImage} alt={book.title} className="w-16 h-24 object-cover rounded" />
              <div>
                <Link 
                  to={`/book/${book.id}`} 
                  className={`font-bold text-lg hover:underline ${
                    isDark ? 'text-white hover:text-indigo-300' : 'text-gray-800 hover:text-indigo-600'
                  }`}
                >
                  {book.title}
                </Link>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {book.authors.join(', ')}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFavorite(book.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;