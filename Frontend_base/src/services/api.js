import axios from 'axios';

const apiUrl = 'http://localhost:3000'; // Replace with your API URL

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllBooks = () => api.get('/books');
export const getBookById = (id) => api.get(`/books/${id}`);
export const addNewBook = (data) => api.post('/books', data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const getAllAuthors = () => api.get('/authors');
export const getAuthorById = (id) => api.get(`/authors/${id}`);
export const addNewAuthor = (data) => api.post('/authors', data);
export const updateAuthor = (id, data) => api.put(`/authors/${id}`, data);
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);
