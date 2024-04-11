import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../constants/url.constant";
import Swal from "sweetalert2";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get(mediaBaseUrl + "GetAllMovies");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(mediaBaseUrl + "DeleteMovie/" + id);
      setTimeout(
        Swal.fire({
          icon: "success",
          title: "Movie deleted successfully",
        }),
        500000
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div>
        <h1>Movies Shop</h1>
        <div className="movies">
          {movies.map((movie) => (
            <div className="movie" key={movie.mediaId}>
              {movie.cover && (
                <img
                  src={movie.cover}
                  alt=""
                  onClick={() => navigate(`/viewmovie/${movie.mediaId}`)}
                />
              )}
              <button
                className="delete"
                onClick={() => handleDelete(movie.mediaId)}
              >
                Delete
              </button>
              <button
                className="update"
                onClick={() => navigate("updatemovie/" + movie.mediaId)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
        <button className="Button" onClick={() => navigate("/addmovies")}>
          Add new Movie
        </button>
      </div>
    </Layout>
  );
};

export default Movies;
