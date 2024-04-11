import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';
import axios from 'axios';
import { mediaBaseUrl } from '../constants/url.constant';

const UpdateBook = () => {
    const [book, setBook] = useState({
        mediaType: "book",
        title: "",
        creator: "",
        description: "",
        cover: "",
        nbPages: "",
        year: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[3];

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.patch(mediaBaseUrl + "UpdateBook/" + bookId, book);
            navigate("/books");
        } catch (err) {
            console.log(err);
        }
    };
    
    

    return (
        <Layout>
            <div className="form_container">
                <div className="form">
                    <h1>Update Book</h1>
                    <input type='text' placeholder="Title" onChange={handleChange} name="title" />
                    <input type='text' placeholder="Creator" onChange={handleChange} name="creator" />
                    <input type='text' placeholder="Description" onChange={handleChange} name="description" />
                    <input type='text' placeholder="Cover" onChange={handleChange} name="cover" />
                    <input type='number' placeholder="Number of Pages" onChange={handleChange} name="nbPages" />
                    <input type='number' placeholder="Year" onChange={handleChange} name="year" />
                    <button className="formButton" onClick={handleClick}>Update</button>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateBook;
