import React, { useEffect, useState } from "react";
import "./Login.css";
import {useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [credentials, setcredentials] = useState({identifier: "",password: ""})
  let navigate = useNavigate()
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(89, 111, 54)"
  
    return () => {
     document.body.style.backgroundColor = "white"
    }
  }, [])
  
  const handleSubmit= async (e)=>{
    e.preventDefault()
    console.log("API_URL : ",API_URL)
    const response = await fetch(`${API_URL}/api/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({identifier:credentials.identifier, password:credentials.password})
    })
    const json = await response.json()
    if(json.success){
        localStorage.setItem("token",json.authtoken)
        localStorage.setItem("userid", json.userid)
        alert("Login successful")
        navigate("/mainHome")
    
    }else {
      alert("something went wrong")
    }
  }
  
 const onChange = (e)=>{
    setcredentials({...credentials,[e.target.name]: e.target.value})
  }
  return (
    <div className="login">
      <div className="left"></div>
      <div className="li">
        <form className="form" onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username or email
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              name = "identifier"
              onChange={onChange}
              autoComplete="username"

            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
          <button onClick={()=> navigate("/signup")} className="cna bttn2">Create new Account</button>
      </div>
    </div>
  );
  }


export default Login;
