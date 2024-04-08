import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usersBaseUrl } from "../constants/url.constant";

const Register=()=>{
    const [User, setUser]=useState({
        FirstName:"",
        LastName:"",
        PhoneNumber:"",
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
            await axios.get(usersBaseUrl + "AddUser/")
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="form">
            <h1>Register</h1>
            <input type='text' placeholder="FisrtName" onChange={handleChange} name="FirstName" className="inputRegister"/>
            <input type='text' placeholder="LastName" onChange={handleChange} name="LastName" className="input"/>
            <input type='phone' placeholder="Phone number" onChange={handleChange} name="PhoneNumber" className="input"/>
            <input type='email' placeholder="E-mail" onChange={handleChange} name="Email" className="input"/>
            <input type='text' placeholder="UserName" onChange={handleChange} name="Username" className="input"/>
            <input type='password' placeholder="Password" onChange={handleChange} name="Password" className="input"/>
        <button className="formButton" onClick={handleClick}>Register</button>
        </div>
    )
}

export default Register;