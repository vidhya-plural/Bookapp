// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
};

// Endpoint to get all books
app.get('/books', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err); // Pass error to the error handler middleware
  }
});

// Endpoint to get a specific book by book_id
app.get('/books/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to add a new book
app.post('/books', async (req, res, next) => {
  const { title, author_id, genre_id, price, publication_date } = req.body;
  
  // Validate inputs
  if (!title || !author_id || !genre_id || !price || !publication_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query('INSERT INTO books (title, author_id, genre_id, price, publication_date) VALUES (?, ?, ?, ?, ?)', 
                   [title, author_id, genre_id, price, publication_date]);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update a book by book_id
app.put('/books/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  const { title, author_id, genre_id, price, publication_date } = req.body;
  
  // Validate inputs
  if (!title || !author_id || !genre_id || !price || !publication_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query('UPDATE books SET title=?, author_id=?, genre_id=?, price=?, publication_date=? WHERE book_id=?',
                   [title, author_id, genre_id, price, publication_date, book_id]);
    if (result.changedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to delete a book by book_id
app.delete('/books/:book_id', async (req, res, next) => {
  const book_id = req.params.book_id;
  try {
    const [result] = await db.query('DELETE FROM books WHERE book_id = ?', [book_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to get all authors
app.get('/authors', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to get a specific author by author_id
app.get('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM authors WHERE author_id = ?', [author_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to add a new author
app.post('/authors', async (req, res, next) => {
  const { name, biography } = req.body;
  
  // Validate inputs
  if (!name || !biography) {
    return res.status(400).json({ message: 'Name and biography are required' });
  }

  try {
    await db.query('INSERT INTO authors (name, biography) VALUES (?, ?)', [name, biography]);
    res.status(201).json({ message: 'Author added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update an author by author_id
app.put('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  const { name, biography } = req.body;
  
  // Validate inputs
  if (!name || !biography) {
    return res.status(400).json({ message: 'Name and biography are required' });
  }

  try {
    const [result] = await db.query('UPDATE authors SET name=?, biography=? WHERE author_id=?', [name, biography, author_id]);
    if (result.changedRows === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to delete an author by author_id
app.delete('/authors/:author_id', async (req, res, next) => {
  const author_id = req.params.author_id;
  try {
    const [result] = await db.query('DELETE FROM authors WHERE author_id = ?', [author_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to get all genres
app.get('/genres', async (req, res, next) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM genres');
    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to get a specific genre by genre_id
app.get('/genres/:genre_id', async (req, res, next) => {
  const genre_id = req.params.genre_id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM genres WHERE genre_id = ?', [genre_id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to add a new genre
app.post('/genres', async (req, res, next) => {
  const { genre_name } = req.body;
  
  // Validate inputs
  if (!genre_name) {
    return res.status(400).json({ message: 'Genre name is required' });
  }

  try {
    await db.query('INSERT INTO genres (genre_name) VALUES (?)', [genre_name]);
    res.status(201).json({ message: 'Genre added successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to update a genre by genre_id
app.put('/genres/:genre_id', async (req, res, next) => {
  const genre_id = req.params.genre_id;
  const { genre_name } = req.body;
  
  // Validate inputs
  if (!genre_name) {
    return res.status(400).json({ message: 'Genre name is required' });
  }

  try {
    const [result] = await db.query('UPDATE genres SET genre_name=? WHERE genre_id=?', [genre_name, genre_id]);
    if (result.changedRows === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json({ message: 'Genre updated successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Endpoint to delete a genre by genre_id
app.delete('/genres/:genre_id', async (req, res, next) => {
  const genre_id = req.params.genre_id;
  try {
    const [result] = await db.query('DELETE FROM genres WHERE genre_id = ?', [genre_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.json({ message: 'Genre deleted successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Middleware to handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
