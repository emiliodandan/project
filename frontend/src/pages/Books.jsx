import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Layout from "../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../constants/url.constant";
//import {Edit, Delete} from '@mui/icons-material'
import {Button} from '@mui/material'



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
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.creator}</span>
                        <span>{book.nbPages}</span>
                        <span>{book.year}</span>
                        <Button className="delete" variant='outlined' color='error' onClick={()=>handleDelete(book.mediaId)}>Delete</Button>
                        <Button className="update" variant='outlined' color='warning' sx={{mx:3}} onClick={()=>navigate(`/update/${book.mediaId}`)}>Edit</Button>
                    </div>
                ))}
            </div>
            <button className="Button" onClick={()=>navigate("/addbooks")}>Add new Book</button>
        </div>
        </Layout>
    )
}

export default Books;
