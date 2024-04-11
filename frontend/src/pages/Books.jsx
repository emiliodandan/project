import React from "react";
import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import Layout from "../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../constants/url.constant";
//import {Edit, Delete} from '@mui/icons-material'


const Books=()=>{
    const [books,setBooks]=useState([])
    const navigate = useNavigate();

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
                        <button className="delete" onClick={()=>handleDelete(book.mediaId)}>Delete</button>
                        <button className="update" onClick={()=>navigate(`updatebook/${book.mediaId}`)}>Update</button>
                    </div>
                ))}
            </div>
            <button className="Button" onClick={()=>navigate("/addbooks")}>Add new Book</button>
        </div>
        </Layout>
    )
}

export default Books;
