// import React from "react";
import "./Leftbar.css";
import logo from "./logo.png";
import home from "./home.png";
import search from "./search.png";
import messages from "./messages.png";
import profile from "./profile.png";
import notification from "./notification.png"
import { useNavigate } from "react-router-dom";

function Leftbar() {
  const navigate = useNavigate()
  return (
    <div className="LB" >
      <div className="img">
        <img src={logo} alt="logo" />
      </div>
      <div className="home" onClick={()=>{navigate("/mainHome")}}>
        <img src={home} alt="home" />
        Home
      </div>      
      <div className="messages" onClick={()=>{navigate("/mainHome/message")}}>
        <div className="notif-icon" style = {{position : "relative"}}>
        <img src={messages} alt="messages" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"  style={{ fontSize: "12px", padding: "4px 4px", minWidth: "22px" }}>99+</span>
        </div>        
        Messages
      </div>
      <div className="search" onClick={()=>{navigate("/mainHome/search")}}>
        <img src={search} alt="search" />
        Search
      </div>
      <div className="notification"  onClick={()=>{navigate("/mainHome/notification")}}>
        <div className="notif-icon" style = {{position : "relative"}}>
        <img src={notification} alt="notification" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"  style={{ fontSize: "12px", padding: "4px 4px", minWidth: "22px" }}>99+</span>
        </div>        
        Notification
      </div>
      <div className="profile"  onClick={()=>{navigate("/mainHome/friends")}}>
        <img src={profile} alt="profile" />
        Friends
      </div>
      <div className="Logout">
        <button onClick={()=>navigate("/")} >Log out</button>
      </div>            
    </div>
  );
}

export default Leftbar;
