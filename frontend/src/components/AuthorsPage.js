import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(`http://localhost:5000/authors/${authorId}`);
        // After successful deletion, update the authors list
        setAuthors(authors.filter(author => author.author_id !== authorId));
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  return (
    <div>
      <h2>All Authors</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/authors/add" className="btn btn-primary">Add Author</Link>
      </div>
      <ul>
        {authors.map(author => (
          <li key={author.author_id}>
            <Link to={`/authors/${author.author_id}`}>{author.name}</Link>
            {' '}
            <Link to={`/authors/edit/${author.author_id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
            {' '}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteAuthor(author.author_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
