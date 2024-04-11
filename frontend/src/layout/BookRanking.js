import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './BookRanking.css'; // Import CSS file for styling
import { userCartBaseUrl } from '../constants/url.constant';

const BookRanking = ({ maxStars, cartItemId, userId }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    addRanking(cartItemId, userId, value);
  };

  return (
    <div className="book-ranking">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index} onClick={() => handleRatingChange(starValue)}>
            <FaStar className={starValue <= rating ? 'star-filled' : 'star-empty'} />
          </span>
        );
      })}
    </div>
  );
};

const addRanking = async (cartItemId, userId, rating) => {
  try {
    const res = await axios.patch(`${userCartBaseUrl}AddRanking/${userId}/${cartItemId}/${rating}`);
    console.log(res.data); // Optionally handle response data
  } catch (error) {
    console.log(error);
  }
};

export default BookRanking;
