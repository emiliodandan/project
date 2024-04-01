import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';


const Update =() =>{
    //use state to take values from this form
    const[book, setBook]=useState({
        title:"",
        desc:"",
        price:"",
        cover:"",
    });

    const navigate = useNavigate() //go back to home when done with form fill
    const location = useLocation() //to get l id lal update
    
    const bookId = location.pathname.split("/")[2];
    

    const handleCHange=(e)=>{
        setBook(prev=>({...prev, [e.target.name]:e.target.value}));
    }; //update the data we input in the form

    const handleClick= async e=>{
        e.preventDefault();
        try{
            await axios.put("http://localhost:8800/books/"+ bookId, book);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    console.log(book)
    return(
        <Layout>
        <div className='form'>
            <h1>Update the Book</h1>
            <input type="text" placeholder='title' onChange={handleCHange} name="title"/>
            <input type="text" placeholder='desc' onChange={handleCHange} name="desc"/>
            <input type="number" placeholder='price' onChange={handleCHange} name="price"/>
            <input type="text" placeholder='cover' onChange={handleCHange} name="cover"/> 
        
            <button className="formButton" onClick={handleClick}>Update</button>
        
        </div>
        </Layout>
    );
};

export default Update;