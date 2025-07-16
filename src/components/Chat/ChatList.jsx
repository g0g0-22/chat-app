// src/components/Chat/ChatList.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { subscribeToUserChats } from "../../services/chatService";
import "./ChatList.css"
import { setUserId } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
export default function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUid, setCurrentUid] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = getAuth();
    const unsubscribeToAuth = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUid(user.uid);
      }else{
        setChats([]);
        setLoading(false);
        setUserId(null);

      }
    });
    return ()=>unsubscribeToAuth();
  }, []);

  useEffect(()=>{
    if(!currentUid) return;
    setLoading(true);
    const unsubscribeChats = subscribeToUserChats(currentUid, (chatDocs)=>{
      setChats(chatDocs);
      setLoading(false);
    });
    return ()=>unsubscribeChats();
  }, [currentUid])

  if (loading) return <div className="chat-list__loading">Loading chats…</div>;
  if (!currentUid) return <div className="chat-list__empty">Please sign in.</div>;
  return (
    <ul className="chat-list">
      {chats.map((c) => (
        <li
          key={c.id}
          className="chat-item"
          onClick={() => navigate(`/chats/${c.id}`)}
        >
          <strong className="chat-item__title">
            {c.isGroup
              ? c.name || "Unnamed Group"
              : c.participants.find((uid) => uid !== currentUid)}
          </strong>
          <br />
          <small className="chat-item__last-message">
            {c.lastMessage?.text || "No messages yet"}
          </small>
        </li>
      ))}
    </ul>
  );
}
