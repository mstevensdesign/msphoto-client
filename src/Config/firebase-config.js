// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxkWknbDp2NlMKCK2q_wu_W8CFnDDV_EU",
  authDomain: "mikestevensphoto-c810c.firebaseapp.com",
  projectId: "mikestevensphoto-c810c",
  storageBucket: "mikestevensphoto-c810c.appspot.com",
  messagingSenderId: "194616223957",
  appId: "1:194616223957:web:d6b19c2378dcf3a9e7da5c",
  measurementId: "G-M83DZW51J7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Functions To Export
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
