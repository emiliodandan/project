import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import axios from 'axios';
import { mediaBaseUrl } from '../constants/url.constant';


const UpdateBooks = () => {
    //use state to take values from this form
    const [book, setBook] = useState({
        mediaType: "book",
        title: "",
        creator: "",
        description: "",
        cover: "",
        nbPages: "",
        year: ""
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
            await axios.put(mediaBaseUrl + "UpdateBook/" + bookId, book);
            navigate("/books");
        } catch (err) {
            console.log(err);
        }
    };

    console.log(book)
    return (
        <Layout>
            <div className="form_container">
                <div className="form">
                    <h1>Update Book</h1>
                    <input type='text' placeholder="title" onChange={handleChange} name="title" />
                    <input type='text' placeholder="creator" onChange={handleChange} name="creator" />
                    <input type='text' placeholder="desc" onChange={handleChange} name="description" />
                    <input type='text' placeholder="cover" onChange={handleChange} name="cover" />
                    <input type='number' placeholder="Number of pages" onChange={handleChange} name="nbPages" />
                    <input type='number' placeholder="date of release" onChange={handleChange} name="year" />
                    <button className="formButton" onClick={handleClick}>Add</button>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateBooks;