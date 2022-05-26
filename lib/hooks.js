import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth, firestore} from "/lib/firebase";

export function useUserData(){
  const [user] = useAuthState(auth);
  const [username,setUsername] = useState(null);
  useEffect(()=>{
   let unsubscribe;
   if(user){
     const ref = firestore.collection('users').doc(user.uid);
     ref.onSnapshot((doc)=>{
         setUsername(doc.data()?.username);
     });
   }else{
     setUsername(null);
   }
   return unsubscribe;
   }, 
   [ user ]);
   return {user,username}
}