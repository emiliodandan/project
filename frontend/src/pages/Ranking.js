import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import MovieList from './MovieList';
import Layout from '../layout/layout';
import axios from 'axios';
import { userCartBaseUrl } from '../constants/url.constant';
const Ranking = () => {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const res = await axios.get(userCartBaseUrl+'GetRankingsBooks/1')
      setBooks(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getMovies = async () => {
    try {
      const res = await axios.get(userCartBaseUrl+'GetRankingsMovies/1')
      setMovies(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks();
    getMovies();
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
