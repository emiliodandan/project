import React from "react";
import BookRanking from "../layout/BookRanking";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.mediaId}>
          <img src={movie.cover} alt={movie.title} />
          <BookRanking maxStars={5} stars={movie.ranking} /> {/* Pass stars and maxStars props */}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
