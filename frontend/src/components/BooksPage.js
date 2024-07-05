import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5000/books/${bookId}`);
        // Update the books state after deletion
        setBooks(books.filter(book => book.book_id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.book_id}>
            <Link to={`/books/${book.book_id}`}>{book.title}</Link>
            <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
            <Link to={`/books/${book.book_id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/books/add">Add New Book</Link>
    </div>
  );
};


export default BooksPage;
