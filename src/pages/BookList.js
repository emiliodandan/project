import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} - {book.rating}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
