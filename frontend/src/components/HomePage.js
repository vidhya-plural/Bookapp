import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Bookstore Application</h1>
      <p>This application allows you to manage books and authors.</p>
      <div>
        <Link to="/books">
          <button>Books Page</button>
        </Link>
        <Link to="/authors">
          <button>Authors Page</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
