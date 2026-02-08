import React , {useState , useEffect} from 'react'
import "./Notification.css"

const API_URL = process.env.REACT_APP_API_URL;

function Notification({setRefresh}) {

  // get all requests 
  const [req , setReq] = useState([])

  const requests =async()=>{
    try {
      const res = await fetch (`${API_URL}/api/friends/pendingreq` , {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      })
      const data = await res.json()
      setReq(data)

    }catch(error){
      console.log(error)
    }
   }
   useEffect(() => {
     requests()
   }, [])

  //  Accept Friend Request 

  const acceptReq = async(reqId)=>{
    try{
      const res = await fetch (`${API_URL}/api/friends/acceptreq/${reqId}`, {
        method: "POST",
        headers : {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      })
      const data = await res.json()
      if(data.success){
        setReq(prev => prev.filter(r => r._id !== reqId))
        setRefresh(prev=>!prev)
      }
    }catch(error){
      console.log(error)
    }
  }
   
  const cancelreq = async(id) =>{
    try{
      const res = await fetch(`${API_URL}/api/friends/cancelreq/${id}`,{
        method :"DELETE",
        headers : {
          "auth-token" : localStorage.getItem("token")
        }
      })
      const data = await res.json()
      if(data.success){
        setReq(prev => prev.filter(r => r._id !== id))
        setRefresh(prev => !prev)        
      }
    }catch(error){
      console.log(error)
    }
  }
    
  return (
  <div className="noti">
    <h2>Notifications</h2>
    { req.length===0 ? (
      <p>No pending Requests</p>
    ):(
      req.map((user) => ( 
    <div className = "notiCards" key = {user._id}>
      <div className="notiimg">
        <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360" alt="" />
      </div>
      <div className="Notinames">
        <div className="Notiname">{user.sender?.name}</div>
        <div className="Notiusername">{user.sender?.username}</div>
      </div>    
      <div className="notibutton">
        <button onClick = {()=>acceptReq(user._id)}>Accept</button>
        <button onClick={()=> cancelreq(user._id)}>X</button>
      </div>
    </div>
      ))
    )}
    </div>
  )
}

export default Notification
