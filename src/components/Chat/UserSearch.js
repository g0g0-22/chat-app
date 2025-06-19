// src/components/Chat/UserSearch.js
import React, { useState } from "react";
import { getDocs, collection, query, where, serverTimestamp, addDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { createChat } from "../../services/chatService";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

export default function UserSearch() {
  
    const [username, setUsername] = useState("");
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleStartChat = async () => {
        if(!username.trim()) return alert("Enter a username");
        
        const usersQ = query(
            collection(db,"users"),
            where("username","==",username.trim())
        );
        
        const snap = await getDocs(usersQ);
        if(snap.empty) return alert("User not found");
        const otherId = snap.docs[0].id;
        if(otherId === currentUser.id) return alert("Thats you!");

        const chatRef = await addDoc(collection(db, "chats"), {
            participants: [currentUser.id, otherId],
            isGroup: false,
            name: "",
            createdAt: serverTimestamp(),
            lastMessage: { text: "", senderId: "", createdAt: serverTimestamp() }
        });
        navigate(`/chats/${chatRef.id}`);
    }
    return (
        <div>
            <input
                value = {username}
                onChange={e => setUsername(e.target.value)}
                placeholder = "Username"
            />
            <button onClick={handleStartChat}>Chat</button>
        </div>
    );
}
