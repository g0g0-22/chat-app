import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
    
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp, addDoc, collection, Timestamp } from "firebase/firestore";
import displayNameTaken from "../utils/displayNameCheck";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password, displayName) {
        if (await displayNameTaken(displayName)) {
            const error = new Error("Display name already taken");
            error.code = "display-name-taken";
            throw error;
        }
        
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCred.user.uid;
        await setDoc(doc(db, "users", uid), {
            name: displayName,
            email: email,
            userID: uid,
            photoURL: "",
        });
        return userCred;
    }
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout(){
        return signOut(auth);
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user);  // Update state with the new user or null
        setLoading(false);     // Stop loading once we know the auth state
    });
    return unsubscribe; // Cleanup the listener on unmount
    }, []);
    
    const value = { currentUser, signup, login, logout };

    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
