import React, { useEffect, useState } from "react";
import "./chatlist.css";
import { useNavigate } from "react-router-dom";

function Chatlist() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const myId = localStorage.getItem("userid");

  // 🔹 Fetch all chats
  const getAllChats = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/chat/getallChats",
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Chat API error:", data);
        setChats([]);
        return;
      }

      setChats(data);
    } catch (err) {
      console.error("Failed to load chats:", err);
      setChats([]);
    }
  };

 const deleteChat = async (chatId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/chat/deletechat/${chatId}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      }
    );

    const data = await res.json();

    if (data.success) {
      setChats(prev => prev.filter(c => c._id !== chatId));
    }
  } catch (err) {
    console.error("Delete chat failed", err);
  }
};

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="chatlist">
      <div className="heading">
        <h1>Messages</h1>
      </div>

      <div className="chats">
        {chats.length === 0 ? (
          <p style={{ color: "white", padding: "10px" }}>
            No chats yet
          </p>
        ) : (
          chats.map(chat => {
            const otherUser = chat.users?.find(
              u => String(u._id) !== String(myId)
            );

            if (!otherUser) return null;

            return (
              <div
                className="mchat"
                key={chat._id}
                onClick={() =>
                  navigate(`/mainHome/message/chat/${chat._id}`)
                }
              >
                <div className="Chatimg">
                  <img
                    src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360"
                    alt=""
                  />
                </div>

                <div className="names">
                  <div className="name">{otherUser.name}</div>
                  <div className="lastmsg">Last message...</div>
                </div>

                {/* Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    onClick={e => e.stopPropagation()}
                  >
                    More
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat._id);
                        }}
                      >
                        Delete Chat
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Chatlist;
