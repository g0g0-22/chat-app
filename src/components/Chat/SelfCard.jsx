import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import "./SelfCard.css"
import { Img } from "react-image";

export default function SelfCard(){
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("")
    
    useEffect(()=>{
        const fetchUserData = async () => {
            if(!currentUser) return;
            const userDoc = await getDoc(doc(db,"users", currentUser.uid));
            if(userDoc.exists()){
                setDisplayName(userDoc.data().name);
                setPhotoUrl(userDoc.data().photoURL)
            }
        };
        fetchUserData();
    }, [currentUser]);
    
    if(!currentUser) return <p>Buggy</p>;
    
    return (
        <div className="self-card">
        <span className="self-name">{displayName}</span>
        <Img src={photoUrl} alt="Profile" className="self-img" />
        </div>


    )
}