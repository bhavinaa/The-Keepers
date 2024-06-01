// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6JDj0B4iQUghAF65mqbRGpWS-8-1d_1Y",
  authDomain: "fir-auth-654a5.firebaseapp.com",
  projectId: "fir-auth-654a5",
  storageBucket: "fir-auth-654a5.appspot.com",
  messagingSenderId: "418980362579",
  appId: "1:418980362579:web:e105109a21c2c16adac9a6"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };