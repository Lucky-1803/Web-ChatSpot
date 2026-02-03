import React, { useState, useEffect } from 'react'
import "./Rightbar.css"


function Rightbar({refresh}) {

  const [users, setusers] = useState([])
  const[myname , setMyname]= useState(null)

  // Send friend request
  const sendRequest = async (userId)=>{
    let res = await fetch(`http://localhost:5000/api/friends/sendreq/${userId}`,{
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("token")
      },
      body : JSON.stringify({receiverId : userId})
    })

    const data = await res.json()
    if (data.success){
      setusers(prev => 
        prev.map(u => 
          u._id === userId ? {...u , requestStatus: "sent"} : u
         )
      )
    }
  }
  
  // Your id

  const loggedIn = async()=>{
    const res = await fetch("http://localhost:5000/api/auth/getuser" , {
      method: "POST",
      headers :{
        "auth-token": localStorage.getItem("token")
      }
    })
    const data = await res.json()
    setMyname(data)
  }

  // fetchusers
useEffect(() => {
  const fetchUser = async()=>{
    const res = await fetch("http://localhost:5000/api/auth/getallusers",{
      method : "GET",
      headers : {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const data = await res.json()
    setusers(data)
  };
  loggedIn()
  fetchUser()
}, [refresh])

  return (
    <div className = "RB">
      <div className="suggest">
        <h4>Suggestions for you</h4>
        {/* <a href="">See All</a> */}
      </div>
      <div className="suggestions">
   
      {users.map((user,index)=>(
      <div className="cards" key = {user._id}>
        <div className="leftc">
          <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360" alt="" />
          </div>
        <div className="mid">
          <div className="name">{user.name}</div>
          <div className="username">{user.username}</div>
        </div>
        <div className="rightc">
          <button onClick = {()=>sendRequest(user._id)}
            disabled = {user.requestStatus === "sent"}
            className = {user.requestStatus==="sent"? "sent-btn":"add-btn"}>
              {user.requestStatus === "sent" ? "Sent" : "Add friend"}
              </button>
        </div>
      </div>
      ))}
      
      </div>
      <div className="myprofile">
        <div className="myimg">
          <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360" alt="" />
        </div>
        <div className="mynames">
          {myname && 
            (<><div className="myname">{myname.name}</div>
            <div className="myusername">{myname.username}</div></>)
         }
        </div>
      </div>
    </div>
  )
}

export default Rightbar
