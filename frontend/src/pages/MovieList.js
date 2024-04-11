import React from "react";
import BookRankingPage from "../layout/BookRankingPage";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.mediaId}>
          <img src={movie.cover} alt={movie.title} />
          <BookRankingPage maxStars={5} stars={movie.ranking} /> {/* Pass stars and maxStars props */}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
