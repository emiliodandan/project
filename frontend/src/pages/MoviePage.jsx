import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { mediaBaseUrl } from "../constants/url.constant";
import "./MoviePage.css";
import Layout from "../layout/layout";
import { userCartBaseUrl } from "../constants/url.constant";
import Swal from "sweetalert2";


const MoviePage = () => {
  
  const userId = 1;
  const location = useLocation();
  const nav = useNavigate();
  const movieId = location.pathname.split("/")[2];
  const [movie, setMovie] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const userCartObj = {
    mediaId: movieId,
    userId: 1,
  };

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

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(userCartBaseUrl + "AddToCart", userCartObj);
      console.log(res.status, res.statusText);
      if (res.status == 200) {
        Swal.fire({
          icon:"success",
          title: "Movie added successfully to cart"
      });
      }
    } catch (error) {
      console.log(error);
    }
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
            <p className="movie-duration">
              Duration: {movie.durationMinutes} minutes
            </p>
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
