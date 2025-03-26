import { useStoreContext } from "@/store/store";
import { MessageType } from "@/types/messages";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { auth, deleteMessage } = useStoreContext();
  const { text, uid, avatarUrl, createdAt, name } = props.message;
  const isCurrentUser = uid === auth.currentUser?.uid;
  const nickname = name?.split(" ")[0] ?? name;

  return (
    <div
      className={`${
        isCurrentUser ? "items-end flex-row-reverse" : "items-start"
      } flex gap-2 my-4`}
    >
      <img
        className="aspect-square rounded-full size-12 object-cover"
        src={avatarUrl}
      />
      <span 
        className="bg-white/10 p-1.5 rounded relative"
        onDoubleClick={() => deleteMessage(uid)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="flex flex-col gap-2">
                {!isCurrentUser ? (
                  <p className="text-xs font-bold text-left -mt-4">
                    {nickname}
                  </p>
                ) : null}
                <p
                  className={`p-1 ${
                    isCurrentUser ? "text-right" : "text-left"
                  }`}
                >
                  {text}
                </p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-[0.625rem] font-semibold">
                {createdAt.toDate().toLocaleDateString("pt-BR", {
                  month: "numeric",
                  year: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </div>
  );
};
