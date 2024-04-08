import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usersBaseUrl } from "../constants/url.constant";

const Register=()=>{
    const [User, setUser]=useState({
        Email:"",
        Username:"",
        Password:""
    });
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setUser(prev=>({...prev,[e.target.name]: e.target.value}))
    }
    const handleClick = async e =>{
        e.preventDefault();
        try{
            await axios.post(usersBaseUrl + "AddUser/", User);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="form">
            <h1>Register</h1>
            <input type='email' placeholder="E-mail" onChange={handleChange} name="Email" className="input"/>
            <input type='text' placeholder="UserName" onChange={handleChange} name="Username" className="input"/>
            <input type='password' placeholder="Password" onChange={handleChange} name="Password" className="input"/>
        <button className="formButton" onClick={handleClick}>Register</button>
        </div>
    )
}

export default Register;