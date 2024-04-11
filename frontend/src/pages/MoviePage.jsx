import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { mediaBaseUrl } from "../constants/url.constant";
import "./MoviePage.css";
import Layout from "../layout/layout";

const MoviePage = () => {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];
  const [movie, setMovie] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${mediaBaseUrl}GetMovieById/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    
  };

  if (!movie) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="movie-container" key={movie.mediaId}>
        <div
          className={`movie ${expanded ? "expanded" : ""}`}
          onClick={handleClick}
        >
          <img src={movie.cover} alt={movie.title} className="movie-cover" />
          <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-duration">Duration: {movie.durationMinutes} minutes</p>
            <p className="movie-year">Release Year: {movie.year}</p>
          </div>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </Layout>
  );
};

export default MoviePage;
