import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import BookList from './BookList';
import Layout from '../layout/layout';

const Ranking = () => {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch movies
    fetch('https://api.example.com/movies')
      .then(response => response.json())
      .then(data => setMovies(data));

    // Fetch books
    fetch('https://api.example.com/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <Layout>
    <div>
      <h1>Ranking Page</h1>
      <h2>Movies</h2>
      <MovieList movies={movies} />
      <h2>Books</h2>
      <BookList books={books} />
    </div>
    </Layout>
  );
};

export default Ranking;
