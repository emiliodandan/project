import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './BookRanking.css'; // Import CSS file for styling

const BookRanking = ({ maxStars, stars }) => {
  const [rating, setRating] = useState(stars || 0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="book-ranking">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index} onClick={() => handleClick(starValue)}>
            <FaStar className={starValue <= rating ? 'star-filled' : 'star-empty'} />
          </span>
        );
      })}
    </div>
  );
};

export default BookRanking;
