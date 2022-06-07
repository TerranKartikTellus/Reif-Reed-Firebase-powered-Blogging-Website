import Link from "next/link"
import { useContext } from "react";
import { UserContext } from "/lib/context";


export default function User(){
          const {user , username} = useContext(UserContext);
          return(
                    <main>
                              {/* <Nav username={username}></Nav> */}
                              <Body></Body>
                    </main>
          );
}
function Nav({username}){
          return (
                    <div className=" flex flex-row px-3 items-center justify-between py-5">
                              <div className=" flex flex-row items-center justify-center space-x-1">
                                        
                                        <Link href="/"><a className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 ease-in-out hover:bg-gray-200 shadow-lg p-3 bg-gray-50 flex flex-row items-center justify-center rounded-full">
                                        <svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M6 23h-3v-10l8.991-8.005 9.009 8.005v10h-3v-9h-12v9zm1-2h10v2h-10v-2zm0-3h10v2h-10v-2zm10-3v2h-10v-2h10zm-5-14.029l12 10.661-1.328 1.493-10.672-9.481-10.672 9.481-1.328-1.493 12-10.661z"/></svg>
                                        </a></Link>
                              </div>
                              <div className="rounded-xl scale-95 space-x-3 bg-gray-100 shadow h-12 w-56 flex flex-row items-center justify-center">
                                        
                                        <Link href={`/${username}`}><a className="flex bg-gray-50 flex-row hover:bg-gray-200 w-full h-full rounded-l-lg  transition-all duration-300 ease-in-out items-center justify-center space-x-1">
                                        
                                                  <div><svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 22v-16h14v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-5.362zm16-7.614v-10.386h-18v20h8.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-4v-1h4v1zm6-4h-10v1h10v-1zm0-3h-10v1h10v-1zm1-7h-17v19h-2v-21h19v2z"/></svg></div>
                                                  <div className=" text-xl tracking-wide">Blog</div>
                                        
                                        </a></Link>
                                        
                                        <Link href={`/${username}/setting`}><a className="flex bg-gray-50 flex-row hover:bg-gray-200 w-full h-full group rounded-r-lg  transition-all duration-300 ease-in-out items-center justify-center space-x-1">
                                                 <svg className="group-hover:rotate-90 duration-300 ease-in-out transition-all w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 13.306v-2.612l-2.452-.614c-.081-.407-.188-.805-.318-1.192l1.815-1.756-1.306-2.263-2.432.695c-.272-.309-.562-.599-.871-.871l.695-2.432-2.263-1.306-1.756 1.815c-.387-.13-.785-.237-1.192-.318l-.614-2.452h-2.612l-.614 2.452c-.407.081-.805.188-1.192.319l-1.757-1.816-2.262 1.306.695 2.433c-.309.271-.599.562-.871.87l-2.432-.695-1.306 2.262 1.815 1.757c-.13.387-.237.785-.318 1.192l-2.452.614v2.612l2.452.614c.082.407.188.805.318 1.192l-1.815 1.756 1.306 2.263 2.432-.695c.272.308.562.599.871.871l-.695 2.432 2.263 1.306 1.756-1.816c.387.131.785.237 1.192.319l.614 2.452h2.612l.614-2.452c.407-.082.805-.188 1.192-.319l1.756 1.816 2.263-1.306-.695-2.432c.309-.272.599-.563.871-.871l2.432.695 1.306-2.263-1.815-1.756c.131-.387.237-.785.318-1.192l2.452-.614zm-12 2.694c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
                                                  <div className=" text-xl tracking-wide">Setting</div>
                                        
                                        </a></Link>

                              </div>
                    </div>
          );
}
function Body(){
          return (
                    <div>
                         Body
                    </div>
          );
}