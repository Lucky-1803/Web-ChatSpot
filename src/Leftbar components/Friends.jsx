import React, { useEffect, useState } from "react";
import "./Friends.css";
import { useNavigate } from "react-router-dom";

function Friends({ setRefresh }) {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  // get friends
  const myFriends = async () => {
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
        setFriends([]);
        return;
      }

      setFriends(data);
    } catch (err) {
      console.error(err);
      setFriends([]);
    }
  };

  useEffect(() => {
    myFriends();
  }, []);

  // remove friend (friendId)
  const removeFriend = async (friendId) => {
    await fetch(
      `http://localhost:5000/api/friends/removefriends/${friendId}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    setFriends(prev =>
      prev.filter(friend => friend._id !== friendId)
    );

    setRefresh(prev => !prev);
  };

  // create chat
  const createChat = async (friendId) => {
    const res = await fetch(
      "http://localhost:5000/api/message/createchat",
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverid: friendId }),
      }
    );

    const data = await res.json();
    if (data.success) {
      navigate(`/mainHome/message/chat/${data.chat._id}`);
    }
  };

  return (
    <div className="friendsbox">
      <div className="heading">
        <h2>Friends</h2>
      </div>

      <div className="fcards">
        {friends.length === 0 ? (
          <p>You dont have any friends</p>
        ) : (
          friends.map(friend => (
            <div className="fcard" key={friend._id}>
              <div className="fimg">
                <img
                  src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
                  alt=""
                />
              </div>

              <div className="names">
                <div className="naam">{friend.name}</div>
                <div className="uname">@{friend.username}</div>
              </div>

              <div className="bttn">
                <button
                  className="btn1"
                  onClick={() => createChat(friend._id)}
                >
                  Message
                </button>

                <button
                  className="btn2"
                  onClick={() => removeFriend(friend._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Friends;
