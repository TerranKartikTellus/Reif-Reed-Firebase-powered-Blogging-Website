import {auth,googleAuthProvider} from '/lib/firebase';
import { useState } from 'react';
import Head from "/components/Head"

export default function EnterPage(){
         const user = null;
         const username = null;

          return(
                    <main className=" flex flex-col mx-auto item-center justify-center  h-full">
                              <Head title="Login | Reif Reed" description="Log In with Google | Get your favourite reads only on Reif Reed"></Head>
                              <div className='mx-auto py-5'>
                                        <div className='font-thin text-4xl tracking-wider mx-auto select-none'>Lets go with</div>
                              </div>
                              <div className="">
                              {
                                        !user && <SignIn></SignIn>
                              }
                              </div>
                              {
                                        user && !username && <UserNameForm></UserNameForm>
                              }
                              {
                                        user && username && <SignOut></SignOut>
                              }
                    </main>
          );
}

function SignIn(){
const [message, setMessage] = useState("");

const signInWithGoogle = async () => {
await auth.signInWithPopup(googleAuthProvider)
    .then((response)=>{
          setMessage("Success");
          console.log(message," is message");
    })
    .catch((e)=>{
          setMessage("Fail");
    });          
};

return(
 <div className="w-full  flex flex-col  mx-auto item-center justify-center">
           <div className='mx-auto'>{message}</div>
           <button className="mx-auto text-2xl scale-90 fill-gray-100 text-gray-100 hover:scale-95 hover:fill-slate-900 hover:bg-gray-100 hover:text-gray-900 tracking-widest flex flex-row justify-center items-center p-3 transition-all duration-200 ease-in-out bg-gray-900 shadow-xl hover:shadow-2xl w-3/12 " 
           onClick={signInWithGoogle}>
                     <div className="fill-inherit"><svg className="fill-inherit h-16 w-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8.667 16.667c-2.581 0-4.667-2.087-4.667-4.667s2.086-4.667 4.667-4.667c1.26 0 2.313.46 3.127 1.22l-1.267 1.22c-.347-.333-.954-.72-1.86-.72-1.593 0-2.893 1.32-2.893 2.947s1.3 2.947 2.893 2.947c1.847 0 2.54-1.327 2.647-2.013h-2.647v-1.6h4.406c.041.233.074.467.074.773 0 2.666-1.787 4.56-4.48 4.56zm11.333-4h-2v2h-1.333v-2h-2v-1.333h2v-2h1.333v2h2v1.333z"/></svg></div>
                     <div className="px-3 text-inherit" >Google</div>
           </button>
 </div>
 );
}
function SignOut(){
          return(
                    
                      <button className='p-3 bg-gray-900 text-gray-100 text-lg tracking-wider' onClick={()=>{ auth.signOut() }}>
                       
                              Sign Out
                       
                     </button>
                    
          );
}
function UserNameForm(){
          return(
                    <div>
                              User Name Form
                    </div>
          );
}
