import Link from "next/link";
import { useState } from "react";
import Head from "/components/Head"

export default function Setting(){
          const [subMenu,setSubMenu] = useState(<ChangePassword></ChangePassword>);
          return(
               <main className="pl-14 flex flex-row pt-14 h-full">
                 <Head title="Setting | Reif Reeds" description="Get your favourite reads only on Reif Reed"></Head>
                <div className="fixed  right-10">
                <img className="w-44 h-44 fixed top-64 right-5 -rotate-12 right-5" src="/people.svg"></img>
                </div>
                <div className="w-2/6">
                 <div className="text-4xl">Setting</div>
                 <div className="px-2 pt-3">
                   <div className="flex flex-col text-left">
                      <button  onClick={()=>setSubMenu(<ChangePassword></ChangePassword>)}       className="text-xl hover:opacity-95 text-left hover:border-gray-900 transition-all duration-300 ease-in-out px-2 py-1 hover:border-l-2 ">Change Password</button>
                      <button  onClick={()=>setSubMenu(<EmailNotification></EmailNotification>)} className="text-xl hover:opacity-95 text-left hover:border-gray-900 transition-all duration-300 ease-in-out px-2 py-1 hover:border-l-2 ">Email Notification</button>
                      <button  onClick={()=>setSubMenu(<PrivacySecutity></PrivacySecutity>)}     className="text-xl hover:opacity-95 text-left hover:border-gray-900 transition-all duration-300 ease-in-out px-2 py-1 hover:border-l-2 ">Privacy and Security</button>
                      <button  onClick={()=>setSubMenu(<EditProfile></EditProfile>)}             className="text-xl hover:opacity-95 text-left hover:border-gray-900 transition-all duration-300 ease-in-out px-2 py-1 hover:border-l-2 ">Edit Profile</button>
                      <button  onClick={()=>setSubMenu(<Help></Help>)}                           className="text-xl hover:opacity-95 text-left hover:border-gray-900 transition-all duration-300 ease-in-out px-2 py-1 hover:border-l-2 ">Help</button>
                   </div>
                 </div>
               </div>
               <div className="h-min  bg-gray-100 shadow-2xl  p-10  transition-all duration-300 ease-in-out">
                                        {subMenu}
               </div>
               </main>
          );
}
function ChangePassword(){
  const [currentPass, setCurrentPass] = useState(null);
  const [NewPass1, setNewPass1] = useState("");
  const [NewPass2, setNewPass2] = useState("");
  const [count1,setCount1] = useState(0);
  const [count2,setCount2] = useState(0);
  
  function Submit(){
    if(NewPass1==NewPass2){
      if( isCurrentPassCorrect ){
        if(NewPass1!=currentPass){
          console.log("Now Change PassWord");
        }else{
          console.log("Current pass and new pass are same");
        }
      }else{
        console.log('Incnpm run devurrect Current pass');
      }
    }else{
      console.log('New pass dont match');
    }
  }
          return(
                    <div className="">
                        d
                    </div>
          );
}
function EmailNotification(){
          return(
                    <div className="pl-3 pt-5 border-t-2 border-gray-800">
                    <div className="text-2xl pl-1 pt-2">Email Notification</div>
                    
                    </div>
          );
}
function PrivacySecutity(){
          return(
                    <div className="pl-3 pt-5 border-t-2 border-gray-800">
                    <div className="text-2xl pl-1 pt-2">Privacy and Security</div>
                    
                    </div>
          );
}
function EditProfile(){
          return(
                    <div className="pl-3 pt-5 border-t-2 border-gray-800">
                    <div className="text-2xl pl-1 pt-2">Edit Profile</div>
                    
                    </div>
          );
}
function Help(){
          return(
                    <div className="pl-3 pt-5 border-t-2 border-gray-800">
                    <div className="text-2xl pl-1 pt-2">Help</div>
                   
                    </div>
          );
}