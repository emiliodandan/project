// BookList.js
import React from "react";
import styles from "./BookListMenu.module.css";
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
  const nav = useNavigate();
  return (
    <div className={styles["book-list-container"]}>
      <ul className={styles["book-list"]}>
        {movies.map((movie) => (
          <li key={movie.mediaId} className={styles["movie-item"]}>
            <div className={styles["movie-cover-container"]}>
              <div className={styles["movie-flipper"]}>
                <div className={styles["movie-front"]}>
                  <img
                    src={movie.cover}
                    alt={movie.title}
                    className={styles["movie-cover"]}
                    onClick={() => nav(`/viewmovie/${movie.mediaId}`)}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
