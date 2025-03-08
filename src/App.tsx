import { useAuthState } from "react-firebase-hooks/auth";
import { useStoreContext } from "./store/store";
import { SignIn } from "./components/signIn";
import { ChatRoom } from "./components/chatRoom";

function App() {
  const { auth } = useStoreContext();
  const [user] = useAuthState(auth);
  
  return (
    <div className="flex flex-col items-center justify-center">
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

export default App;
