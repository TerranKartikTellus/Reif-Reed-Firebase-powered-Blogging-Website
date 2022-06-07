import Link from "next/link";
import { useState } from "react";

export default function Setting(){
          const [subMenu,setSubMenu] = useState(<ChangePassword></ChangePassword>);
          return(
               <main className="pl-14 flex flex-row pt-14 h-full">
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
               <div className=" w-4/6">
                                        {subMenu}
               </div>
               </main>
          );
}
function ChangePassword(){
          return(
                    <div className="pl-3 pt-5">
                    <div>Change Password</div>
                    </div>
          );
}
function EmailNotification(){
          return(
                    <div className="pl-3 pt-5">
                              <div>EmailNotification</div>
                    </div>
          );
}
function PrivacySecutity(){
          return(
                    <div className="pl-3 pt-5">
                              <div>PrivacySecutity</div>
                    </div>
          );
}
function EditProfile(){
          return(
                    <div className="pl-3 pt-5">
                              <div>Edit Profile</div>
                    </div>
          );
}
function Help(){
          return(
                    <div className="pl-3 pt-5">
                              <div>Help</div>
                    </div>
          );
}