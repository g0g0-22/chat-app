// src/services/chatService.js
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  arrayUnion
} from "firebase/firestore";
import { db } from "../firebase";
import { WriteBatch } from "firebase/firestore";
/**
 * Create a new 1:1 or group chat.
 * @param {string[]} participantUids — array of UIDs to include (2+ entries for group)
 * @param {string} [name] — optional name for group chats
 * @returns {Promise<string>} the new chatId
 */
export async function createChat(participantUids, name = "") {
  const chatRef = await addDoc(collection(db, "chats"), {
    participants: participantUids,
    isGroup: participantUids.length > 2,
    name: name,
    createdAt: serverTimestamp(),
    lastMessage: {
      text: "",
      senderId: "",
      createdAt: serverTimestamp()
    }
  });
  return chatRef.id;
}

/**
 * Send a message into a chat.
 * Also updates the parent chat’s lastMessage for easy sorting in ChatList.
 * @param {string} chatId
 * @param {string} senderUid
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function sendMessage(chatId, senderUid, text) {
  // 1) add into messages subcollection
  const msgsRef = collection(db, "chats", chatId, "messages");
  const msgDoc = await addDoc(msgsRef, {
    senderId: senderUid,
    text,
    type: "text",
    createdAt: serverTimestamp(),
    readBy: [senderUid]
  });

  // 2) update the parent chat’s lastMessage
  const chatDoc = doc(db, "chats", chatId);
  await updateDoc(chatDoc, {
    lastMessage: {
      text,
      senderId: senderUid,
      createdAt: serverTimestamp()
    }
  });
}

/**
 * Subscribe to the current user’s chat list.
 * Calls onUpdate with an array of chat docs whenever they change.
 */
export function subscribeToUserChats(currentUid, onUpdate) {
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("participants", "array-contains", currentUid),
    orderBy("lastMessage.createdAt", "desc")
  );
  return onSnapshot(q, snapshot => {
    const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    onUpdate(chats);
  });
}

/**
 * Subscribe to messages in a specific chat.
 * Calls onUpdate with an array of message docs whenever they change.
 */
export function subscribeToChatMessages(chatId, onUpdate) {
  const msgsRef = collection(db, "chats", chatId, "messages");
  const q = query(msgsRef, orderBy("createdAt", "asc"));
  return onSnapshot(q, snapshot => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    onUpdate(messages);
  });
}

/**
 * Mark all unread messages in a chat as read by the current user.
 */
export async function markChatAsRead(chatId, currentUid, messages) {
  const batch = writeBatch(db);
    for (let msg of messages) {
    if (!msg.readBy.includes(currentUid)) {
        const msgRef = doc(db, "chats", chatId, "messages", msg.id);
        batch.update(msgRef, { readBy: arrayUnion(currentUid) });
        }
    }
    await batch.commit();
}
