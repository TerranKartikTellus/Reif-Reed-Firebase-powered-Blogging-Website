import {auth,googleAuthProvider} from "/lib/firebase";
import { useCallback, useEffect, useState } from "react";
import Head from "/components/Head"

import LoadingA from "/components/loadingA"
import { useContext } from "react";
import { UserContext } from "/lib/context";
import {firestore} from "/lib/firebase"
import debounce from "lodash.debounce";

export default function EnterPage(){
      const {user,username} = useContext(UserContext);
      if(user && username){
            window.location.replace(`/${username}`);
      }
          return(
                    <main className=" flex flex-col mx-auto item-center justify-center  h-full">
                              <Head title="Login | Reif Reed" description="Log In with Google | Get your favourite reads only on Reif Reed"></Head>
                              
                              <div className="">
                              {
                                        !user && <SignIn></SignIn>
                              }
                              </div>
                              {
                                        user && !username && <UserNameForm></UserNameForm>
                              }
                              <div className="flex flex-col item-start justify-start  h-full">
                              {
                                    user && username && <SignOutPage></SignOutPage>
                              }
                              </div>
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
           <div className="mx-auto py-5">
               <div className="font-thin text-4xl tracking-wider mx-auto select-none">Lets go with</div>
            </div>
           <div className="mx-auto">{message}</div>
           <button className="select-none mx-auto text-2xl scale-90 fill-gray-100 text-gray-100 hover:scale-95 hover:fill-slate-900 hover:bg-gray-100 hover:text-gray-900 tracking-widest flex flex-row justify-center items-center p-3 transition-all duration-300 ease-in-out bg-gray-900 shadow-xl hover:shadow-2xl w-3/12 " 
           onClick={signInWithGoogle}>
                     <div className="fill-inherit"><svg className="fill-inherit h-16 w-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8.667 16.667c-2.581 0-4.667-2.087-4.667-4.667s2.086-4.667 4.667-4.667c1.26 0 2.313.46 3.127 1.22l-1.267 1.22c-.347-.333-.954-.72-1.86-.72-1.593 0-2.893 1.32-2.893 2.947s1.3 2.947 2.893 2.947c1.847 0 2.54-1.327 2.647-2.013h-2.647v-1.6h4.406c.041.233.074.467.074.773 0 2.666-1.787 4.56-4.48 4.56zm11.333-4h-2v2h-1.333v-2h-2v-1.333h2v-2h1.333v2h2v1.333z"/></svg></div>
                     <div className="px-3 text-inherit" >Google</div>
           </button>
 </div>
 );
}
function SignOutPage(){
          return(
                 <div className="flex flex-col items-end justify-end">
                   <div className=" pt-5 pr-5">
                     <button className="py-3 px-4 hover:px-3 transition-all duration-300 ease-in-out scale-95 fill-gray-100  rounded  bg-gray-900 text-gray-100 text-lg tracking-wider flex flex-row items-center justify-center" onClick={()=>{ auth.signOut() }}>
                      <div><svg className="fill-inherit mr-2 w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/></svg></div>
                      <div className="font-normal tracking-wide text-lg">Sign Out</div>
                     </button>
                   </div>
                   <div></div>
                 </div>
                    
          );
}
function UserNameForm(){
      const [message , setMessage] = useState(<InitialMsg></InitialMsg>);
      const [loading , setLoading] = useState(false);
      const [input , setInput] = useState("");
      const [isValid , setIsValid] = useState("");
      const {user,username} = useContext(UserContext);
      
      useEffect(()=>{
            checkUsername(input);
      },[input]);

      const checkUsername = useCallback(
            debounce(async (username)=>{
            if(username.length >= 3){
                  const ref = firestore.doc(`usernames/${username}`);
                  const {exists} = await ref.get();
                  console.log("check made");
                  setIsValid(!exists);
                  setLoading(false);
            }
      },500),[]
      );
      

      function onChange(e){
            const val = e.target.value.toLowerCase();
            const regExp = /^(?=[a-zA-Z0-9._]{3,18}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

            if(val.length < 3){
                  setInput(val);
                  setIsValid(false);
                  setLoading(false);
            }
            if(regExp.test(val)){
                  setInput(val);
                  setIsValid(true);
                  setLoading(true);
            }
      }
      async function onSubmit(e){
            e.preventDefault();
            const userDoc = firestore.doc(`users/${user.uid}`);
            const usernameDoc = firestore.doc(`usernames/${input}`);

            const batch = firestore.batch();
            batch.set(userDoc, { username: input, 
                        photoUrl: user.photoURL,
                        displayName: user.displayName  
            });
            batch.set(usernameDoc,{uid: user.uid });
            await batch.commit();

      }
          return(
                <form onSubmit={onSubmit}>

                    <div className=" grid grid-cols-1 transition-all duration-300 ease-in-out mx-auto w-4/12">
                              <div> <img className="w-[150px] mx-auto" src="/man.svg"></img> </div>
                              <div className="text-4xl tracking-wider mx-auto font-normal">Username </div>
                              <div className="flex flex-row justify-center item-center scale-75 text-lg w-[340px] mx-auto tracking-wider font-sans capitalize ">
                                    <input value={input} onChange={onChange} placeholder="between 3 to 18 characters" className="pt-32 w-full bg-transparent p-1  text-center bg-opacity-40 tracking-wider text-gray-600 outline-none border-gray-900 border-b-2" type={"text"} required></input>
                                    <div className="group flex flex-row justify-center item-center  ">
                                          <div className=" pt-28 flex flex-row justify-center item-center "><svg className="hover:fill-green-600 w-9 h-9" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" fillRule="nonzero"/></svg></div>
                                          <div className="group-hover:opacity-100 group-hover:translate-x-32 duration-300 ease-in-out transition-all opacity-0 absolute w-56 translate-x-24 translate-y- "><div className="bg-gray-900 text-gray-100 p-2 rounded tracking-wide"><strong className="tracking-wider text-lg mb-3">Debounce</strong><br></br>Once the user stops entering input, a call is made to the server to check if it"s available. Minimizing number of reads to database.   </div></div>
                                    </div>
                              </div>
                              <div className="mx-auto ">{message}</div>
                              
                              <div className=" mx-auto w-28 h-[20px]">
                                    <span className="text-transparent ">.</span>
                              { isValid && 
                                    <button type="submit" onClick={onSubmit} disabled={!isValid} className="mx-auto p-2  pl-9">
                                      <img className="mx-auto w-7 hover:translate-x-2 transition-all duration-200 ease-in-out" src="/rightArrow.svg"></img>
                                    </button>
                              }
                              {
                                !isValid &&
                                    <div className="mx-auto"><LoadingA></LoadingA></div>
                              }
                              
                              </div>
                              
                              <div className="bg-red-500 text-gray-100 absolute bottom-10 right-10 p-5 rounded">
                                    <div>message : {message}</div>
                                    <div>loading : {loading ? "true" : "false"}</div>
                                    <div>input : {input}</div>
                                    <div>isValid : {isValid ? "true" : "false"}</div>
                              </div>
                    </div>
                </form>
          );
}
function InitialMsg(){
      return(<h5 className="text-sm my-1 ml-1 text-right font-sans tracking-wide"></h5>)
}