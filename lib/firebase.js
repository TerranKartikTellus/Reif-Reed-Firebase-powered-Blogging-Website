import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsYeY6gckvw4WJh08r4S4RCGaZjIrbwmk",
  authDomain: "terrankartiktellusfirebase.firebaseapp.com",
  projectId: "terrankartiktellusfirebase",
  storageBucket: "terrankartiktellusfirebase.appspot.com",
  messagingSenderId: "747642442573",
  appId: "1:747642442573:web:256159ceeb1e8635215d04",
  measurementId: "G-NFLNPW6ZDZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();