import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Layout from "../layout/layout";
import axios from "axios";
import { mediaBaseUrl } from "../constants/url.constant";
import {Button} from '@mui/material'

const Movies=()=>{
    const [movies,setMovies]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchAllMovies=async()=>{
            try{
                const res= await axios.get(mediaBaseUrl + "GetAllMovies")
                setMovies(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllMovies();
    }, [])

    const handleDelete= async (id)=>{
        try{
            await axios.delete(mediaBaseUrl+ "DeleteMovie/" + id)
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Layout>
        <div>
            <h1>Movies Shop</h1>
            <div className="movies">
                {movies.map(movie=>(
                    <div className="movie" key={movie.mediaId}>
                        {movie.cover && <img src={movie.cover} alt="" />}
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <span>{movie.creator}</span>
                        <span>{movie.year}</span>
                        <span>{movie.durationMinutes}</span>
                        <Button className="delete" variant='outlined' color='error' onClick={()=>handleDelete(movie.mediaId)}>Delete</Button>
                        <Button className="update" variant='outlined' color='warning' sx={{mx:3}} onClick={()=>navigate(`/update/${book.mediaId}`)}>Edit</Button>
                    </div>
                ))}
            </div>
            <button className="Button" onClick={()=>navigate("/addmovies")}>Add new Movie</button>
        </div>
        </Layout>
    )
}

export default Movies;
