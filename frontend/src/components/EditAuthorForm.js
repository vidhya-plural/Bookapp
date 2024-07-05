import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditAuthorForm = () => {
  const { author_id } = useParams();
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');

  useEffect(() => {
    console.log('Fetching author details for author_id:', author_id);
    fetchAuthorDetails();
  }, [author_id]);

  const fetchAuthorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/authors/${author_id}`);
      console.log('Author details fetched:', response.data);
      const { name, biography } = response.data;
      setAuthor(response.data);
      setName(name);
      setBiography(biography);
    } catch (error) {
      console.error('Error fetching author details:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/authors/${author_id}`, {
        name,
        biography
      });
      console.log('Author updated:', response.data);
      // Optionally, clear form fields or redirect to authors page
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  // Ensure that author is not null before rendering the form
  if (!author) {
    return <p>Loading author details...</p>;
  }

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Biography:</label>
        <textarea value={biography} onChange={(e) => setBiography(e.target.value)} required />

        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default EditAuthorForm;
