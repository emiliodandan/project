import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../constants/url.constant";


const Books=()=>{
    const [books,setBooks]=useState([])

    useEffect(()=>{
        const fetchAllBooks=async()=>{
            try{
                const res= await axios.get(mediaBaseUrl + "GetAllBooks")
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete= async (id)=>{
        try{
            await axios.delete(mediaBaseUrl + "DeleteBook/" +id)
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Layout>
        <div>
            <h1>Books Shop</h1>
            <div className="books">
                {books.map(book=>(
                    <div className="book" key={book.mediaId}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.creator}</span>
                        <span>{book.nbPages}</span>
                        <span>{book.year}</span>
                        <button className="delete" onClick={()=>handleDelete(book.mediaId)}>Delete</button>
                        <button className="update"><Link to={`/update/${book.mediaId}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="Button"><Link to="/addbooks">Add new Book</Link></button>
        </div>
        </Layout>
    )
}

export default Books;
