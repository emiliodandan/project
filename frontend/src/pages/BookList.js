import React from "react";
import BookRankingPage from "../layout/BookRankingPage";
import "./BookList.css";

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.mediaId}>
          <img src={book.cover} alt={book.title} />
          <BookRankingPage maxStars={5} stars={book.ranking} /> {/* Pass stars and maxStars props */}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
