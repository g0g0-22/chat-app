import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.js";
import { useEffect, useState } from "react";

export default function WelcomeMessage(){
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState("");
    useEffect(()=>{
        const fetchUserData = async () => {
            if(!currentUser) return;
            const userDoc = await getDoc(doc(db,"users", currentUser.uid));
            if(userDoc.exists()){
                setDisplayName(userDoc.data().name);
            }
        };
        fetchUserData();
    }, [currentUser]);
    if(!currentUser) return null;
    return <p>Welcome, {displayName}!</p>
}