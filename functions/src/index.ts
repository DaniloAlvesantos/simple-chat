import { onSchedule } from "firebase-functions/v2/scheduler";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

export const deleteMessages = onSchedule("every 24 hours", async () => {
  const db = getFirestore();
  const messagesRef = db.collection("messages");

  const snapshot = await messagesRef.get();
  if (snapshot.empty) {
    console.log("No messages found.");
    return;
  }

  const batch = db.batch();
  snapshot.forEach((doc) => batch.delete(doc.ref));

  await batch.commit();
  console.log("Deleted all messages from Firestore.");
});
