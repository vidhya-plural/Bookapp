import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBookForm = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, [book_id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books/${book_id}`);
      const { title, author_id, genre_id, price, publication_date } = response.data;
      setBook(response.data);
      setTitle(title);
      setAuthorId(author_id);
      setGenreId(genre_id);
      setPrice(price);
      setPublicationDate(publication_date);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Convert ISO 8601 date to MySQL-compatible format
      const formattedPublicationDate = new Date(publicationDate).toISOString().slice(0, 10);
  
      const response = await axios.put(`http://localhost:5000/books/${book_id}`, {
        title,
        author_id: authorId,
        genre_id: genreId,
        price,
        publication_date: formattedPublicationDate  // Use the formatted date here
      });
      console.log('Book updated:', response.data);
      // Optionally, clear form fields or handle success state
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      {book ? (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          {/* Other input fields for author, genre, price, and publication date */}
          <label>Author ID:</label>
          <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />

          <label>Genre ID:</label>
          <input type="text" value={genreId} onChange={(e) => setGenreId(e.target.value)} required />

          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Publication Date:</label>
          <input type="text" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />

          <button type="submit">Update Book</button>
        </form>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default EditBookForm;
