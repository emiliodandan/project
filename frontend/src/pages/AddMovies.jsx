import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout";
import axios from "axios";

const AddMovies = () => {
  const [movie, setMovie] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/movies", movie);
      navigate("/movies");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="form">
        <h1>Add New Movie</h1>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="desc"
          onChange={handleChange}
          name="desc"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="date"
          placeholder="date of release"
          onChange={handleChange}
          name="releasedate"
        />
        <button className="formButton" onClick={handleClick}>
          Add
        </button>
      </div>
    </Layout>
  );
};

export default AddMovies;
