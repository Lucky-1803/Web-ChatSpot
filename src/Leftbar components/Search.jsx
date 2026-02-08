import React, { useEffect, useState } from 'react'
import "./Search.css"

const API_URL = process.env.REACT_APP_API_URL;

function Search() {

  const [users , setUsers] = useState([])
  const [search , setSearch] = useState("")

  useEffect(() => {
   fetchUser()
  }, [])
  

  const fetchUser = async()=>{
    const res = await fetch(`${API_URL}/api/auth/getallusers`,{
      method: "GET",
      headers:{
        "auth-token": localStorage.getItem("token")
      }
    })
    const data = await res.json()
    setUsers(data)
  }

  const filteredUsers = search? users.filter(user=>
    user.name.toLowerCase().includes(search.toLowerCase())||
    user.username.toLowerCase().includes(search.toLowerCase())
  ) : []

  return (
    <div className='searchbar'>
      <h1>Search</h1>
      <div className="Sinput">
      <input type="text" placeholder='Search...' value={search} 
      onChange={(e)=>setSearch(e.target.value)} />

      {/* suggestion of search */}
      <div className="search-userss">

      {search && filteredUsers.length===0 ? (<p>No such user found</p>): (filteredUsers.map((user)=>(

     
        <div className="searchuser" key={user._id}>
          <div className="searchimg">
            <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360" alt="" />
          </div>

          <div className="searchnames">
            <div className="searchname">{user.name}</div>
            <div className="searchusername">{user.username}</div>
          </div>
          {!user.isFriend && (<div className="searchbtn" ><button>Add Friend</button></div>)}
        </div>
        ))

  )}
      </div>
      </div>
    </div>
  )
}

export default Search
