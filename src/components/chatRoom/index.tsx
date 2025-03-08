import { useStoreContext } from "@/store/store";
import {
  collection,
  query,
  orderBy,
  limit,
  Query,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { Send } from "lucide-react";
import { useRef, FormEvent } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Header } from "../header";
import { MessageType } from "@/types/messages";
import { ChatMessage } from "../chatMessage";

export function ChatRoom() {
  const { db } = useStoreContext();
  const messagesRef = collection(db, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData<MessageType>(
    messageQuery as Query<MessageType>
  );

  return (
    <>
      <Header />
      <section className="flex flex-col gap-4 w-full p-8">
        <main className="pb-6">
          {messages?.length ? (
            messages.map((message) => (
              <ChatMessage key={message.uid} message={message} />
            ))
          ) : (
            <EmptyMessages />
          )}
        </main>

        <TextMessageArea />
      </section>
    </>
  );
}

const TextMessageArea = () => {
  const { auth, db } = useStoreContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (!inputRef.current) return;
    if (!scrollRef.current) return;

    const data: MessageType = {
      avatarUrl: auth.currentUser.photoURL ?? "",
      text: inputRef.current.value,
      createdAt: Timestamp.now(),
      uid: auth.currentUser.uid,
    };

    addDoc(collection(db, "messages"), data);

    inputRef.current.value = "";
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full fixed bottom-0 left-0 p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 px-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 outline-0 border border-foreground/20 rounded-full px-4"
          max={500}
          min={1}
          required
          ref={inputRef}
        />
        <button
          type="submit"
          className="cursor-pointer hover:bg-zinc-400/20 transition-colors duration-300 text-white p-2 rounded"
        >
          <Send />
        </button>
      </form>
      <div ref={scrollRef}></div>
    </footer>
  );
};

const EmptyMessages = () => {
  return (
    <p className="text-center text-muted-foreground">
      Parece não há mensagens... : (
    </p>
  );
};
