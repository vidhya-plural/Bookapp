import React, { useState } from 'react';
import axios from 'axios';

const AddAuthorForm = () => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/authors', {
        name,
        biography
      });
      console.log('Author added:', response.data);
      // Clear form fields or redirect to authors page
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Biography:</label>
      <textarea value={biography} onChange={(e) => setBiography(e.target.value)} required />

      <button type="submit">Add Author</button>
    </form>
  );
};

export default AddAuthorForm;
