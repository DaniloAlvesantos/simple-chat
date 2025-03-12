import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteDoc, getFirestore, doc } from "firebase/firestore";
import { create } from "zustand";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

interface storeProps {
  app: FirebaseApp;
  auth: ReturnType<typeof getAuth>;
  db: ReturnType<typeof getFirestore>;
  deleteMessage: (uid: string) => void;
}

const deleteMessage = (uid: string) => {
  deleteDoc(doc(db, "messages", uid));
};

export const useStoreContext = create<storeProps>(() => ({
  app: firebaseApp,
  auth,
  db,
  deleteMessage
}));
