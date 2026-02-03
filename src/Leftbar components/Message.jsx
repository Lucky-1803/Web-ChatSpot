import React from 'react'
import "./message.css"
import { Routes , Route } from 'react-router-dom'
import Chat from '../Message components/chat'
import Chatlist from '../Message components/chatlist'

function Message() {
  return (
    <div className="message">
      <Routes>
        <Route path='/' element={<Chatlist/>}/>
        <Route path='chat/:chatid' element={<Chat/>}/>
        <Route path='chatlist' element={<Chatlist/>}/>
      </Routes>
    </div>
  )
}

export default Message
