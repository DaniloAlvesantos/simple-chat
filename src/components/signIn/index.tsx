import { useStoreContext } from "@/store/store";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import { Fingerprint } from "lucide-react";

export const SignIn = () => {
  const { auth } = useStoreContext();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          const user = result.user;
          if (token && user) console.log("User signed in successfully!");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage);
        console.error(credential);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button onClick={handleSignIn} className="rounded-full">
        <Fingerprint /> Sign in with google
      </Button>
    </div>
  );
};
