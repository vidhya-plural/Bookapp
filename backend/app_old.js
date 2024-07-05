// app.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to get all books
app.get('/books', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get a specific book by book_id
app.get('/books/:book_id', async (req, res) => {
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
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to add a new book
app.post('/books', async (req, res) => {
  const { title, author_id, genre_id, price, publication_date } = req.body;
  try {
    await db.query('INSERT INTO books (title, author_id, genre_id, price, publication_date) VALUES (?, ?, ?, ?, ?)', 
                   [title, author_id, genre_id, price, publication_date]);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to update a book by book_id
app.put('/books/:book_id', async (req, res) => {
  const book_id = req.params.book_id;
  const { title, author_id, genre_id, price, publication_date } = req.body;
  try {
    await db.query('UPDATE books SET title=?, author_id=?, genre_id=?, price=?, publication_date=? WHERE book_id=?',
                   [title, author_id, genre_id, price, publication_date, book_id]);
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to delete a book by book_id
app.delete('/books/:book_id', async (req, res) => {
  const book_id = req.params.book_id;
  try {
    await db.query('DELETE FROM books WHERE book_id = ?', [book_id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get all authors
app.get('/authors', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get a specific author by author_id
app.get('/authors/:author_id', async (req, res) => {
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
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to add a new author
app.post('/authors', async (req, res) => {
  const { name, biography } = req.body;
  try {
    await db.query('INSERT INTO authors (name, biography) VALUES (?, ?)', [name, biography]);
    res.status(201).json({ message: 'Author added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to update an author by author_id
app.put('/authors/:author_id', async (req, res) => {
  const author_id = req.params.author_id;
  const { name, biography } = req.body;
  try {
    await db.query('UPDATE authors SET name=?, biography=? WHERE author_id=?', [name, biography, author_id]);
    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to delete an author by author_id
app.delete('/authors/:author_id', async (req, res) => {
  const author_id = req.params.author_id;
  try {
    await db.query('DELETE FROM authors WHERE author_id = ?', [author_id]);
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get all genres
app.get('/genres', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM genres');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get a specific genre by genre_id
app.get('/genres/:genre_id', async (req, res) => {
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
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to add a new genre
app.post('/genres', async (req, res) => {
  const { genre_name } = req.body;
  try {
    await db.query('INSERT INTO genres (genre_name) VALUES (?)', [genre_name]);
    res.status(201).json({ message: 'Genre added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to update a genre by genre_id
app.put('/genres/:genre_id', async (req, res) => {
  const genre_id = req.params.genre_id;
  const { genre_name } = req.body;
  try {
    await db.query('UPDATE genres SET genre_name=? WHERE genre_id=?', [genre_name, genre_id]);
    res.json({ message: 'Genre updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to delete a genre by genre_id
app.delete('/genres/:genre_id', async (req, res) => {
  const genre_id = req.params.genre_id;
  try {
    await db.query('DELETE FROM genres WHERE genre_id = ?', [genre_id]);
    res.json({ message: 'Genre deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
