import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/friends/myfriends",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Friends API error:", data);
        setFriends([]);
        return;
      }

      setFriends(data);
    } catch (err) {
      console.error("Home friends fetch failed:", err);
      setFriends([]);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="Home">
      {friends.map(friend => (
        <div className="friendinhome" key={friend._id}>
          
          <div className="frndnav">
            <div className="frndimg">
              <img
                src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
                alt=""
              />
            </div>

            <div className="frndusername">
              {friend.username}
            </div>
          </div>

          <div className="frndmainimg">
            <img
              src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
              alt=""
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default Home;
