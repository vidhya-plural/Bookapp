import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [price, setPrice] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/books', {
        title,
        author_id: parseInt(authorId),  // Ensure authorId is parsed as integer
        genre_id: parseInt(genreId),    // Ensure genreId is parsed as integer
        price,
        publication_date: publicationDate
      });
      console.log('Book added:', response.data);
      // Clear form fields or redirect to books page
      setTitle('');
      setAuthorId('');
      setGenreId('');
      setPrice('');
      setPublicationDate('');
    } catch (error) {
      console.error('Error adding book:', error);
    } 
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Author ID:</label>
      <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />

      <label>Genre ID:</label>
      <input type="text" value={genreId} onChange={(e) => setGenreId(e.target.value)} required />

      <label>Price:</label>
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />

      <label>Publication Date:</label>
      <input type="text" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
