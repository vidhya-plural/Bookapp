// src/service.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books API functions
export const getAllBooks = async () => {
  const response = await service.get('/books');
  return response.data;
};

export const getBookById = async (bookId) => {
  const response = await service.get(`/books/${bookId}`);
  return response.data;
};

export const addBook = async (newBook) => {
  const response = await service.post('/books', newBook);
  return response.data;
};

export const updateBook = async (bookId, updatedBook) => {
  const response = await service.put(`/books/${bookId}`, updatedBook);
  return response.data;
};

export const deleteBook = async (bookId) => {
  const response = await service.delete(`/books/${bookId}`);
  return response.data;
};

// Authors API functions
export const getAllAuthors = async () => {
  const response = await service.get('/authors');
  return response.data;
};

export const getAuthorById = async (authorId) => {
  const response = await service.get(`/authors/${authorId}`);
  return response.data;
};

export const addAuthor = async (newAuthor) => {
  const response = await service.post('/authors', newAuthor);
  return response.data;
};

export const updateAuthor = async (authorId, updatedAuthor) => {
  const response = await service.put(`/authors/${authorId}`, updatedAuthor);
  return response.data;
};

export const deleteAuthor = async (authorId) => {
  const response = await service.delete(`/authors/${authorId}`);
  return response.data;
};

// Genres API functions
export const getAllGenres = async () => {
  const response = await service.get('/genres');
  return response.data;
};

export const getGenreById = async (genreId) => {
  const response = await service.get(`/genres/${genreId}`);
  return response.data;
};

export const addGenre = async (newGenre) => {
  const response = await service.post('/genres', newGenre);
  return response.data;
};

export const updateGenre = async (genreId, updatedGenre) => {
  const response = await service.put(`/genres/${genreId}`, updatedGenre);
  return response.data;
};

export const deleteGenre = async (genreId) => {
  const response = await service.delete(`/genres/${genreId}`);
  return response.data;
};

export default service;
