import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";

import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { app, auth, db } from "../Config/firebase-config";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      const userRef = doc(db, "cities", user.email);
      setDoc(userRef, { uid: user.uid, email: user.email }, { merge: true });

      navigate("/profile");
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

  return (
    <div>
      {user ? (
        <Button onClick={signOutUser} disabled={loading}>
          {loading ? "Loading..." : "Sign out"}
        </Button>
      ) : (
        <Button onClick={signInWithGoogle} disabled={loading}>
          {loading ? "Loading..." : "Sign in with Google"}
        </Button>
      )}
    </div>
  );
};

export default Login;
