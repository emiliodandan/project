import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from 'axios';
import { mediaBaseUrl } from "../constants/url.constant";
import BookListMenu from "./BookListMenu";
import MovieList from "./MovieListMenu";

function Home(){
    const [newBooks, setNewBooks] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    //const []

    const getNewBooks = async () => {
        try {
            const res = await axios.get(mediaBaseUrl + 'GetNewBooks');
            setNewBooks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getNewMovies = async () => {
        try {
            const res = await axios.get(mediaBaseUrl + 'GetNewMovies');
            setNewMovies(res.data); // Corrected to setNewMovies
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNewBooks();
        getNewMovies();
    }, []);

    return(
        <Layout>
            <div>
                <h1>LibraFlick</h1>
                <h3>Your Ultimate Library Book and Movie Management System</h3>
                <p>Welcome to LibraFlick, your one-stop solution for organizing and managing your library of books and movies with ease and efficiency. Whether you're a voracious reader, a film enthusiast, or both, LibraFlick offers a seamless platform to catalog, track, and explore your favorite titles.</p>
                <p>LibraFlick transforms the way you manage and engage with your library of books and movies, offering unparalleled convenience, exploration, and enjoyment. Join our community today and embark on a journey of literary and cinematic discovery like never before.</p>
                <h3>New Release Movies</h3>
                <MovieList movies={newMovies} />
                <h3>New Release Books</h3>
                <BookListMenu books={newBooks} />
            </div>
        </Layout>
    )
}
export default Home;
