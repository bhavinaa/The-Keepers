// Import the functions you need from the SDKs you need
//import Firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCOzVy2azggvtQboBgLtspvaV2tdyaBqkg",
  authDomain: "thekeepers2-e1005.firebaseapp.com",
  projectId: "thekeepers2-e1005",
  storageBucket: "thekeepers2-e1005.appspot.com",
  messagingSenderId: "1040602743546",
  appId: "1:1040602743546:web:36fc3c2a9c761ba09bff43"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export { firebase, authentication };
