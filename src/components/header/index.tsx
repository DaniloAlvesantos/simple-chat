import { MessageCircle } from "lucide-react"
import { SignOut } from "../signOut";
export const Header = () => {
  return (
    <header className="p-4 flex items-center justify-center gap-4 relative w-full">
      <h2>Simple-Chat</h2>
      <MessageCircle />

      <span className="absolute right-8 top-4">
      <SignOut />
      </span>
    </header>
  );
};
