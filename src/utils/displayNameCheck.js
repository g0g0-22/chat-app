import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function displayNameTaken(displayName){
    const q = query(collection(db, "users"),where("name", "==", displayName));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}