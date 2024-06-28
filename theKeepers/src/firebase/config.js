// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  sendPasswordResetEmail  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOzVy2azggvtQboBgLtspvaV2tdyaBqkg",
  authDomain: "thekeepers2-e1005.firebaseapp.com",
  projectId: "thekeepers2-e1005",
  storageBucket: "thekeepers2-e1005.appspot.com",
  messagingSenderId: "1040602743546",
  appId: "1:1040602743546:web:36fc3c2a9c761ba09bff43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app); //database

export { authentication, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getStorage,  sendPasswordResetEmail  };
