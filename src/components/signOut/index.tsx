import { useStoreContext } from "@/store/store";
import { Button } from "../ui/button";

export const SignOut = () => {
  const { auth } = useStoreContext();

  return (
    auth.currentUser && (
      <Button
        variant="destructive"
        className="rounded-full cursor-pointer"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    )
  );
};
