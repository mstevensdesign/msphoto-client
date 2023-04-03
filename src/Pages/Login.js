import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { useState } from "react";
import Button from "react-bootstrap/Button";

import firebaseApp from "../Config/firebase-config";
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in");
    } else {
      console.log("User is signed out");
    }
  });

  return (
    <div>
      <Button onClick={signInWithGoogle} disabled={loading}>
        {loading ? "Loading..." : "Sign in with Google"}
      </Button>
    </div>
  );
};

export default Login;
