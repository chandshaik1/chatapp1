import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const socket = io("http://localhost:3001"); // Use your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      // Send message to the server
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-messages">
          <ul className="list-group">
            {messages.map((msg, index) => (
              <li key={index} className="list-group-item">
                {msg}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-input">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
