import "./App.css";
import Leftbar from "./components/Leftbar";
import Login from "./components/Login";
// import Home from "./Leftbar components/Home"
import Midbar from "./components/Midbar"
import Rightbar from "./components/Rightbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import {useState} from 'react'

function App() {
  const [refresh , setRefresh] = useState(false)
  return (
    <Router>
      <Routes>
        <Route path="/mainHome/*" element={
            <div className="Bars">
              <Leftbar />
              <Midbar setRefresh={setRefresh}/>
              <Rightbar refresh={refresh}/>
            </div>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
