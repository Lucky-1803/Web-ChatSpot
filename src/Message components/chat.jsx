import React, { useState, useEffect } from 'react';
import "./chat.css";
import { useNavigate, useParams } from 'react-router-dom';
import io from "socket.io-client"

const API_URL = process.env.REACT_APP_API_URL;

const socket = io(API_URL,{
  transports : ["websocket"]
} )
function Chat() {
  const navigate = useNavigate();
  const { chatid } = useParams();
  const [user, setUser] = useState(null);
  const [msg , setMsg] = useState("")
  const [messages , setMessages] = useState([])


  
  const fetchChat = async () => {
  try {
    console.log("fetching chat with :", chatid)
    const res = await fetch(`${API_URL}/api/chat/fetchChat/${chatid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const data = await res.json();
    // console.log("users : ", data.users)

    if (!res.ok) throw new Error(data.error || "Failed to fetch chat");

    if (!data || !data.users) {
      console.error("Invalid Chat data :", data);
      return
    }

    const myId = String(localStorage.getItem("userid"));
    const otherUser = data.users.find(u => String(u._id) !== myId);
    console.log("otheruser : ",otherUser)
    setUser(otherUser);

  } catch (err) {
    console.error(err);
    alert("Could not load chat");
  }
};
  
  // send message 

  const sendMsg = async() =>{
    if(!msg.trim()) return
    const res = await fetch(`${API_URL}/api/message/sendmsg/${chatid}` , {
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem("token")
      },
      body: JSON.stringify({
        content : msg
      })
    })
    // const data = await res.json()
    setMsg("")
  }

  // Fetch all Messages 
  
  const allMsgs = async()=>{
    const res = await fetch(`${API_URL}/api/message/allMsgs/${chatid}`,{
      method:"GET",
      headers: {
        "auth-token" : localStorage.getItem("token")
      }
    })
    const data = await res.json()
    setMessages(data)
  }
  const myId = localStorage.getItem("userid")

  useEffect(() => {
    if(chatid){
      fetchChat()
      allMsgs();
      socket.emit("joinChat",chatid)

      socket.on("messageReceived",(newMsg)=>{
        setMessages((prev)=>[...prev, newMsg])
      })

      return () =>{
        socket.off("messageReceived")
      }
    }
  }, [chatid]);
  
  return (
    <div className='chat'>
      {!user ? (<p>Loading chat...</p>): (
      <>
      <div className="chattop">
        <div className="back" onClick={() => navigate("/mainHome/message/chatlist")}>
          <img src="/arrowleft.svg" alt="Back" />
        </div>
        <div className="cuser">
          <div className="cuimg">
            <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360" alt={`${user.name} profile`} />
          </div>
          <div className="cnames">
            <div className="cname">{user.name}</div>
            <div className="cusername">@{user.username}</div>
          </div>
        </div>
      </div>

      <div className="msgarea">
        <div className="chatmsgs">
          {messages.map((m)=>(
          <div key={m._id} className={String(m.sender?._id) === String(myId)? "mychatmsg ": "otherchatmsg"}>
            {m.content}
          </div>

          ))}
        </div>
        <div className="input">
          <input type="text" onChange={(e)=> setMsg(e.target.value)} value={msg} placeholder='Type message here...' />
          <button className='send' onClick={sendMsg}>Send</button>
        </div>
      </div>
      </>)}
    </div>
  )
}

export default Chat;
