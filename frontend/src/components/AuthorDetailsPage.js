import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorDetailsPage = () => {
  const { author_id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetchAuthorDetails();
  }, [author_id]);

  const fetchAuthorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/authors/${author_id}`);
      setAuthor(response.data);
    } catch (error) {
      console.error('Error fetching author details:', error);
    }
  };

  return (
    <div>
      {author ? (
        <div>
          <h2>{author.name}</h2>
          <p>Biography: {author.biography}</p>
        </div>
      ) : (
        <p>Loading author details...</p>
      )}
    </div>
  );
};

export default AuthorDetailsPage;
