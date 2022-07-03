import Logo from "/components/Logo"
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";

import LoadingA from "/components/loadingA"
export default function SideNav(){
      const {user , username} = useContext(UserContext);
        console.log("user data:   ",user);
        console.log("username data:   ",username);
        
      // const userEmail = userData.user.email;
          return (
<div className="flex flex-col items-center justify-between h-full">
      <div className="">
                <div className="mt-10">
                      <Link href="/">
                       <a>
                         <Logo></Logo>        
                       </a>
                      </Link>
                </div>
                
                {
                      user && username &&
                      <div className="mt-20">
                            <Link href={`/${username}`} >
                              <a className="hover:contrast-125 transition-all duration-300 ease-in-out scale-90 flex flex-row items-center justify-center ">
                                  <div>
                                  <img className="border-2 hover:border-4 transition-all duration-300 ease-in-out ring-2 ring-gray-900 w-20 h-20 mx-auto bg-transparent rounded-full shadow-lg" src={`${user.photoURL}`}></img>
                                  {/* <div className="w-20 translate-y-1 h-[2px] bg-gray-900"></div> */}
                                  </div>
                                  <div className="mx-1">
                                        <div className="capitalize text-2xl text-gray-700 mt-5 font-normal tracking-widest text-center ">{user.displayName}</div>
                                        <div className=" text-base text-gray-600 mt-1 font-normal tracking-widest text-center italic  ">@{username}</div>
                                  </div>
                              </a>
                            </Link>
                            <div className="flex flex-row px-2 pt-5 items-center justify-around">
                                  <Link href={`/${username}/followers`}><a>
                                  <div className="flex flex-col items-center justify-center text-center">
                                        <div><strong>210k</strong></div>
                                        <div>Followers</div>
                                  </div>
                                  </a></Link>
                                  <div className="flex flex-col items-center justify-center text-center">
                                        <div><strong>10k</strong></div>
                                        <div>Likes</div>
                                  </div>
                                  <div className="flex flex-col items-center justify-center text-center">
                                        <div><strong>220</strong></div>
                                        <div>Posts</div>
                                  </div>
                            </div>
                            <div className="px-10 text-sm text-gray-700 pt-6 font-medium tracking-wide text-ellipsis">Author & illustrator. My latest books : MONSTROUS: THE LORE, GORE, & SCIENCE, and THEY LOST THEIR HEADS. </div>
                            
                              
                      </div>
                }
      </div>
      <div className=" mb-10">
                    {
                          user && username && 
                          <div className="w-full h-full flex flex-row items-center justify-center">
                                {/* <div className="">
                                      <Link href="/admin">
                                            <a >
                                                  <div className="transition-all duration-300 ease-in-out hover:px-4 scale-95 text-xl tracking-wide rounded p-2 px-5 space-x-2 bg-gray-900 text-gray-100 flex flex-row ">
                                                        <div><svg className="fill-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.021 10.688c1.208.172 2.51 1.312 2.979 1.781v-10.514c0-1.08.92-1.955 2-1.955s2 .875 2 1.955v6.058c0 .784.814.885.919.103.216-1.604 2.519-1.817 2.693.399.043.546.726.655.866.027.326-1.444 2.501-1.458 2.758.758.066.579.796.696.848.034.051-.67.281-.934.607-.934 1.098 0 2.309 2.019 2.309 4.41 0 4.295-3 4.306-3 11.19h-10c-.332-3.942-3.462-7.431-6.271-10.241-.488-.488-.729-1.052-.729-1.564 0-.93.759-1.688 2.021-1.507z"/></svg></div>
                                                        <div className="font-thin tracking-wider">Write</div>
                                                  </div>
                                            </a>
                                      </Link>
                                </div> */}
                                <div>
                                    <Nav username={username}></Nav>
                                </div>
                          </div>
                    }
                    {
                          !username && user && 
                          <div className="">
                             <div></div>
                             <div className="flex space-x-2 flex-row justify-center items-center">
                                <div className="text-xl tracking-wide">Looking for a Username</div>
                                <div className=""><LoadingA></LoadingA></div>
                             </div>
                          </div>
                    }
                    {
                      !username && !user &&
                      <div className="space-y-4">
                            <div className="text-center text-lg">Looks like u are new here !</div>
                            <div>
                                  <Link href="/enter">
                                        <a>
                                              <div className="select-none hover:translate-y-1 fill-gray-100 text-gray-100 hover:bg-gray-100 hover:fill-gray-900 hover:text-gray-900 hover:shadow-lg shadow-xl flex flex-row space-x-1 bg-gray-900 p-2 items-center justify-center rounded transition-all duration-300 ease-in-out">

                                                    <div><svg className="fill-inherit " width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/></svg></div>

                                                    {/* <div><svg className="fill-inherit " width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/></svg></div> */}

                                                    <div className="select-none text-inherit text-xl font-normal tracking-wider">Log In</div>
                                              </div>
                                        </a>
                                  </Link>
                            </div>
                      </div>
                }

                    
      </div>
      
</div>
          );
}
function Nav({username}){
 
          return (
                    <div className=" flex flex-row px-3 items-center justify-between py-5">
                             
                             
                              <div className="rounded-xl scale-95 invert bg-gray-100 shadow h-10 w-56 flex flex-row items-center justify-center">
                                        
                                        <Link href={`/${username}`}><a className="flex bg-gray-50 opacity-90 hover:opacity-100  flex-row hover:bg-gray-200 w-full h-full rounded-l-lg  transition-all duration-300 ease-in-out items-center justify-center space-x-1">
                                        
                                                  <div><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 22v-16h14v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-5.362zm16-7.614v-10.386h-18v20h8.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-4v-1h4v1zm6-4h-10v1h10v-1zm0-3h-10v1h10v-1zm1-7h-17v19h-2v-21h19v2z"/></svg></div>
                                                  <div className=" text-lg tracking-wide font-medium ">Posts</div>
                                        
                                        </a></Link>
                                        
                                        <Link href={`/${username}/setting`}><a className="flex  opacity-90 hover:opacity-100 bg-gray-50 flex-row hover:bg-gray-200 w-full h-full group rounded-r-lg  transition-all duration-300 ease-in-out items-center justify-center space-x-1">
                                                 <svg className="group-hover:rotate-90 duration-300 ease-in-out transition-all w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 13.306v-2.612l-2.452-.614c-.081-.407-.188-.805-.318-1.192l1.815-1.756-1.306-2.263-2.432.695c-.272-.309-.562-.599-.871-.871l.695-2.432-2.263-1.306-1.756 1.815c-.387-.13-.785-.237-1.192-.318l-.614-2.452h-2.612l-.614 2.452c-.407.081-.805.188-1.192.319l-1.757-1.816-2.262 1.306.695 2.433c-.309.271-.599.562-.871.87l-2.432-.695-1.306 2.262 1.815 1.757c-.13.387-.237.785-.318 1.192l-2.452.614v2.612l2.452.614c.082.407.188.805.318 1.192l-1.815 1.756 1.306 2.263 2.432-.695c.272.308.562.599.871.871l-.695 2.432 2.263 1.306 1.756-1.816c.387.131.785.237 1.192.319l.614 2.452h2.612l.614-2.452c.407-.082.805-.188 1.192-.319l1.756 1.816 2.263-1.306-.695-2.432c.309-.272.599-.563.871-.871l2.432.695 1.306-2.263-1.815-1.756c.131-.387.237-.785.318-1.192l2.452-.614zm-12 2.694c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
                                                  <div className=" text-lg tracking-wide font-medium ">Setting</div>
                                        
                                        </a></Link>

                              </div>
                              <div>
                                    {/* <div>{pathname}</div> */}
                              </div>
                    </div>
          );
}