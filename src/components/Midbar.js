import React from 'react'
import "./Midbar.css"
import {Routes , Route } from 'react-router-dom'
import Message from '../Leftbar components/Message'
import Friends from '../Leftbar components/Friends'
import Search from '../Leftbar components/Search'
import Notification from '../Leftbar components/Notification'
import Home from '../Leftbar components/Home'

function Midbar({setRefresh}) {
  return (
    <div className="MB">
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='message/*' element={<Message/>}/>
        <Route path='friends' element={<Friends setRefresh={setRefresh}/>}/>
        <Route path='notification' element={<Notification setRefresh={setRefresh}/>}/>
        <Route path='search' element={<Search/>}/>
      </Routes>

    </div>
  )
}

export default Midbar
