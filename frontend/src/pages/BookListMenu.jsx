// BookList.js
import React from 'react';
import styles from './BookListMenu.module.css';
import {useNavigate} from 'react-router-dom';

const BookList = ({ books }) => {
    const nav = useNavigate();
  return (
    <div className={styles['book-list-container']}>
      <ul className={styles['book-list']}>
        {books.map(book => (
          <li key={book.id} className={styles['book-item']}>
            <div className={styles['book-cover-container']}>
              <div className={styles['book-flipper']}>
                <div className={styles['book-front']}>
                  <img src={book.cover} alt={book.title} className={styles['book-cover']} onClick={() => nav(`/viewbook/${book.mediaId}`)}/>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
