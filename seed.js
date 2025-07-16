// seed.js
import admin from "firebase-admin";
import { faker } from "@faker-js/faker";

// Point at the local emulators
process.env.FIRESTORE_EMULATOR_HOST     = "127.0.0.1:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

console.log("🔄 seed.js starting…");

// Initialize Admin SDK against the emulator project
admin.initializeApp({ projectId: "chat-app-d9a3b" });
const auth = admin.auth();
const db   = admin.firestore();
db.settings({ host: "127.0.0.1:8080", ssl: false });

async function seed() {
  // 1) Create Auth users and mirror them in Firestore
  const userIds = [];
  const defaultPassword = "pass1234";

  for (let i = 0; i < 10; i++) {
    const uid         = faker.string.uuid();
    const email       = `user${i}@example.com`;
    const displayName = faker.person.fullName();
    const photoURL    = faker.image.avatar();

    // Create the user in the Auth emulator
    await auth.createUser({
      uid,
      email,
      password:    defaultPassword,
      displayName,
      photoURL
    });
    console.log(`🆕 Auth user created: ${email} / ${defaultPassword}`);

    // Mirror that user in Firestore
    await db.collection("users").doc(uid).set({
      email,
      displayName,
      photoURL,
      isOnline: false,
      lastSeen: admin.firestore.Timestamp.now(),
    });
    userIds.push(uid);
  }
  console.log("✅ 10 users created in Auth & Firestore.");

  // 2) Create chats
  const chatIds = [];
  for (let i = 0; i < 5; i++) {
    const count         = faker.number.int({ min: 2, max: 4 });
    const participants  = faker.helpers.uniqueArray(userIds, count);
    const isGroup       = participants.length > 2;
    const chatRef       = await db.collection("chats").add({
      participants,
      isGroup,
      name: isGroup ? faker.company.name() : "",
      createdAt: admin.firestore.Timestamp.now(),
      lastMessage: {
        text: "",
        senderId: "",
        createdAt: admin.firestore.Timestamp.now(),
      },
    });
    chatIds.push({ id: chatRef.id, participants });
  }
  console.log("✅ 5 chats created.");

  // 3) Populate messages
  for (const { id: chatId, participants } of chatIds) {
    const batch = db.batch();

    for (let j = 0; j < 20; j++) {
      const sender = faker.helpers.arrayElement(participants);
      const msgRef = db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .doc();

      batch.set(msgRef, {
        senderId: sender,
        text:     faker.lorem.sentence(),
        type:     "text",
        createdAt: admin.firestore.Timestamp.fromMillis(
          Date.now() -
            faker.number.int({ min: 0, max: 1000 * 60 * 60 * 24 })
        ),
        readBy:   faker.helpers.arrayElements(participants),
      });

      // For the final message in this batch, update lastMessage
      if (j === 19) {
        batch.update(db.collection("chats").doc(chatId), {
          lastMessage: {
            text:      faker.lorem.sentence(),
            senderId:  sender,
            createdAt: admin.firestore.Timestamp.now(),
          },
        });
      }
    }

    await batch.commit();
    console.log(`📝 20 messages seeded for chat ${chatId}`);
  }

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
