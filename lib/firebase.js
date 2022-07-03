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
export const fromMillis = firebase.firestore.Timestamp.fromMillis; //tells firestore to save timestamp on a document on server
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED; // for progress of file upload

// Convert firestore Document to JSON
// @param {DocumentSnapshot} doc

export async function getUserWithUsername(username){

     const usersRef =  firestore.collection('users');
     const query = usersRef.where('username','==',username).limit(1);
     const userDoc = (await query.get()).docs[0];
     
     return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0
  };
}