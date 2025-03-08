import { useStoreContext } from "@/store/store";
import { MessageType } from "@/types/messages";

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { auth } = useStoreContext();
  const { text, uid, avatarUrl } = props.message;
  const isCurrentUser = uid === auth.currentUser?.uid;

  return (
    <div
      className={`${
        isCurrentUser ? "items-end flex-row-reverse" : "items-start"
      } flex gap-2 relative my-4`}
    >
      <img
        className="aspect-square rounded-full size-12 object-cover"
        src={avatarUrl}
      />
      <p className="bg-white/10 p-2 rounded">{text}</p>
    </div>
  );
};
