import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import axios from 'axios';
import { mediaBaseUrl } from '../constants/url.constant';


const Update = () => {
    //use state to take values from this form
    const [book, setBook] = useState({
        mediaType: "book",
        title: "",
        creator: " ",
        description: "",
        cover: "",
        year: "",
        durationMinutes: "",
    });

    const navigate = useNavigate() //go back to home when done with form fill
    const location = useLocation() //to get l id lal update

    const bookId = location.pathname.split("/")[2];


    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }; //update the data we input in the form

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.patch(mediaBaseUrl + "Update/" + bookId, book);
            navigate("/movies");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(book)
    return (
        <Layout>
            <div className="form">
                <h1>Update Movie</h1>
                <input
                    type="text"
                    placeholder="title"
                    onChange={handleChange}
                    name="title"
                />
                <input
                    type="text"
                    placeholder="creator"
                    onChange={handleChange}
                    name="creator"
                />
                <input
                    type="text"
                    placeholder="description"
                    onChange={handleChange}
                    name="description"
                />
                <input
                    type="text"
                    placeholder="cover"
                    onChange={handleChange}
                    name="cover"
                />
                <input
                    type="number"
                    placeholder="Duration of the movie"
                    onChange={handleChange}
                    name="durationMinutes"
                />
                <input
                    type="number"
                    placeholder="year of release"
                    onChange={handleChange}
                    name="year"
                />
                <button className="formButton" onClick={handleClick}>
                    Add
                </button>
            </div>
        </Layout>
    );
};

export default Update;