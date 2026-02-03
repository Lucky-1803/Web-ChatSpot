import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(89, 111, 54)";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const [credentials, setcredentials] = useState({name:"",username:"",email:"",password:"",cpassword:""})
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {name,username,email,password,cpassword} = credentials
    e.preventDefault()
    if(password !==cpassword){
      alert("Password doesnt match to confirm password")
      return
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser",{
      method : "POST",
      headers : {     
        "Content-type": "application/json"
      },
      body : JSON.stringify({name,username,email,password})
    })
    const json = await response.json()
    if(!response.ok){
      if(json.errors){
        let errorMessages = json.errors.map((err)=>err.msg).join("\n")
        alert(errorMessages)
      }else {
        alert(json.error || "something went wrong")
      }
      return
      }      
    alert("signup successful")
    localStorage.setItem("token", json.authtoken)
    navigate("/mainHome")
  }
const onChange = (e)=>{
  setcredentials({...credentials, [e.target.name]:e.target.value})
}

  return (
    <div className="signup">
      <div className="left"></div>
      <div className="su">
        <form className="form" onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              name="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              name = "username"
              onChange={onChange}
              autoComplete="username"

            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name = "cpassword"
              onChange={onChange}
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <button onClick={()=> navigate("/")} className="libttn2">Log In</button>
      </div>
    </div>
  );
}

export default Signup;
