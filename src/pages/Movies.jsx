import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/layout";

const Movies=()=>{
    const [movies,setMovies]=useState([])

    useEffect(()=>{
        const fetchAllMovies=async()=>{
            try{
                const res= await axios.get("http://localhost:8800/movies/")
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllMovies();
    }, [])

    const handleDelete= async (id)=>{
        try{
            await axios.delete("http://localhost:8800/movies/"+id)
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
                    <div className="movie" key={movie.id}>
                        {movie.cover && <img src={movie.cover} alt="" />}
                        <h2>{movie.title}</h2>
                        <p>{movie.desc}</p>
                        <span>{movie.price}</span>
                        <button className="delete" onClick={()=>handleDelete(movie.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${movie.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="Button"><Link to="/addmovies">Add new Movie</Link></button>
        </div>
        </Layout>
    )
}

export default Movies;
