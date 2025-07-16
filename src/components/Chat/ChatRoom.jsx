// src/components/Chat/ChatRoom.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ChatRoom.css";

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: "1", sender: "Alice", text: "Hey there!", own: false },
    { id: "2", sender: "You",   text: "Hello! How are you?", own: true  },
    { id: "3", sender: "Alice", text: "Doing great, thanks!", own: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const endRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;
    setMessages(msgs => [
      ...msgs,
      { id: Date.now().toString(), sender: "You", text, own: true },
    ]);
    setNewMessage("");
  };

  return (
    <div className="chat-room">
      <div className="messages-container">
        {messages.map(m => (
          <div
            key={m.id}
            className={`message-item${m.own ? " own" : ""}`}
          >
            <div className="message-text">{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message…"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
