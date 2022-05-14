import Logo from "/components/Logo"
import Link from "next/link";

export default function SideNav(){
      const user = {
            photoUrl: "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg"
      };
      const username = null;

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
                      username &&
                      <div className="mt-20">
                            <Link href={`/{username}`} >
                              <a className="flex flex-col mx-auto ">
                                  <img className="w-32 h-32 mx-auto bg-red-400 rounded-full shadow-lg" src={user?.photoUrl}></img>
                                  <div className="capitalize text-2xl text-gray-700 mt-5 font-normal tracking-widest text-center ">{username}</div>
                              </a>
                            </Link>
                      </div>
                }
      </div>
      <div className=" mb-10">
                    {
                          username && 
                          <div className="w-full h-full">
                                <div>
                                      <Link href="/admin">
                                            <a >
                                                  <div className="transition-all duration-300 ease-in-out hover:scale-100 scale-95 text-xl tracking-wide rounded p-2 space-x-2 bg-gray-900 text-gray-100 flex flex-row ">
                                                        <div><svg className="fill-gray-100" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z"/></svg></div>
                                                        <div className="font-thin tracking-wider">Write</div>
                                                  </div>
                                            </a>
                                      </Link>
                                </div>
                          </div>
                    }
                    {
                      !username && 
                      <div className="space-y-4">
                            <div className="text-center text-lg">Looks like u are new here !</div>
                            <div>
                                  <Link href="/enter">
                                        <a>
                                              <div className="hover:translate-y-1 fill-gray-100 text-gray-100 hover:bg-gray-100 hover:fill-gray-900 hover:text-gray-900 hover:shadow-lg shadow-xl flex flex-row space-x-1 bg-gray-900 p-2 items-center justify-center rounded">

                                                    <div><svg className="fill-inherit " width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/></svg></div>

                                                    <div><svg className="fill-inherit " width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/></svg></div>

                                                    <div className="text-inherit text-xl font-thin tracking-wider">Log In</div>
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
