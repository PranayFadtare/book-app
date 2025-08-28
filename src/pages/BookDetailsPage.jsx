// src/pages/BookDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../contexts/ThemeContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        // We fetch all books and find the one with the matching ID
        // In a real-world scenario, you might have an API endpoint like /books/:id
        const response = await fetch('https://my-json-server.typicode.com/pranayBaynineventures/assignment-get_all_books/books');
        const books = await response.json();
        const foundBook = books.find(b => b.id === id);
        if (foundBook) {
          setBook(foundBook);
        } else {
          throw new Error('Book not found!');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return (
    <div className={`text-center mt-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      Loading book details...
    </div>
  );
  if (error) return (
    <div className="text-center mt-10 text-red-500">
      Error: {error}
    </div>
  );
  if (!book) return null;

  const isBookFavorite = isFavorite(book.id);

  const handleFavoriteClick = () => {
    if (isBookFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <Link 
        to="/" 
        className={`mb-4 inline-block ${
          isDark 
            ? 'text-indigo-400 hover:text-indigo-300' 
            : 'text-indigo-600 hover:text-indigo-500'
        } hover:underline`}
      >
        &larr; Back to list
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={book.coverImage} alt={book.title} className="w-full md:w-1/3 h-auto object-cover rounded-lg" />
        <div className="flex-1">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {book.title}
          </h1>
          <p className={`text-xl mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            by {book.authors.join(', ')}
          </p>
          <p className={`text-md mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <strong>First Published:</strong> {book.publishedYear}
          </p>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {book.description}
          </p>
          
          <button
            onClick={handleFavoriteClick}
            className={`mt-6 px-4 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 ${
              isBookFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isBookFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;