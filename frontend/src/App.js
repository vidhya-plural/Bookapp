import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BooksPage from './components/BooksPage';
import BookDetailsPage from './components/BookDetailsPage';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import AuthorsPage from './components/AuthorsPage';
import AuthorDetailsPage from './components/AuthorDetailsPage';
import AddAuthorForm from './components/AddAuthorForm';
import EditAuthorForm from './components/EditAuthorForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Bookstore</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/add" element={<AddBookForm />} />
            <Route path="/books/:book_id" element={<BookDetailsPage />} />
            <Route path="/books/:book_id/edit" element={<EditBookForm />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/add" element={<AddAuthorForm />} />
            <Route path="/authors/:author_id" element={<AuthorDetailsPage />} />
            <Route path="/authors/edit/:author_id" element={<EditAuthorForm />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
