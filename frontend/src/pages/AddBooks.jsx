import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout";
import { mediaBaseUrl } from "../constants/url.constant";
import axios from "axios";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";


const AddBooks=()=>{
    const [book, setBook]=useState({
        mediaType: "book",
        title:"",
        creator: "",
        description:"",
        cover:"",
        nbPages: "",
        year: ""
    });
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setBook(prev=>({...prev,[e.target.name]: e.target.value}))
    }
    const handleClick = async e =>{
        e.preventDefault();
        try{
            await axios.post(mediaBaseUrl + "CreateBook", book)
            navigate("/books");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Layout>
        <div className="form_container">
            <div className="form">
                <h1>Add New Book</h1>
                <input type='text' placeholder="title" onChange={handleChange} name="title"/>
                <input type='text' placeholder="creator" onChange={handleChange} name="creator"/>
                <input type='text' placeholder="desc" onChange={handleChange} name="description"/>
                <input type='text' placeholder="cover" onChange={handleChange} name="cover"/>
                <input type='number' placeholder="Number of pages" onChange={handleChange} name="nbPages"/>
                <input type='number' placeholder="date of release" onChange={handleChange} name="year"/>
            <button className="formButton" onClick={handleClick}>Add</button>
            </div>
        </div>
        </Layout>
    )
}

export default AddBooks;