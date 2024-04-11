import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { mediaBaseUrl, userCartBaseUrl } from "../constants/url.constant";
import "./BookPage.css";
import Layout from "../layout/layout";

const BookPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const userId = 1
  const bookId = location.pathname.split("/")[2];
  const [book, setBook] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const userCartObj = {
    mediaId: bookId,
    userId: 1,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${mediaBaseUrl}GetBookById/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(userCartBaseUrl + "AddToCart", userCartObj);
      console.log(res.status, res.statusText);
      if (res.status == 200) {
        alert("added to cart");
        nav(`/usercart/${userId}`)
      }
    } catch (error) {
      console.log(error);
    }
    setAddedToCart(true);
  };

  if (!book) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="book-container" key={book.mediaId}>
        <div
          className={`book ${expanded ? "expanded" : ""}`}
          onClick={handleClick}
        >
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-description">{book.description}</p>
            <p>Year of Release: {book.year}</p>
            <p>Number of Pages: {book.nbPages}</p>
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

export default BookPage;
