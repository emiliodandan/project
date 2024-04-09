import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} - {book.description}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
