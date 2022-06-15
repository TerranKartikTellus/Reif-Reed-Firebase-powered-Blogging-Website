import Link from "next/link"
import Image from "next/image"

import { useContext } from "react";
import { UserContext } from "/lib/context";
import Head from "/components/Head"
import { getUserWithUsername,postToJSON } from "/lib/firebase";
export async function getServerSideProps({query}){
     const {username} = query;
     let user = null;
     let posts = null;
     const userDoc = await getUserWithUsername(username);
     
     if(userDoc){
          user = userDoc.data();
          const postsQuery = userDoc.ref.collection('posts').where('published','==',true).orderBy('createdAt','desc').limit(10);
          posts =(await postsQuery.get()).docs.map(postToJSON);
         
     }
     return {
          props: {user,posts},
     };
}

export default function User({posts}){
          const {user , username} = useContext(UserContext);
          console.log(posts);
 
          return(
                    <main className="h-screen overflow-y-hidden ">
                         <Head title={`${username} | Posts`} description="Get your favourite reads only on Reif Reed"></Head>
     
                              {/* <Nav username={username}></Nav> */}
                              <Body posts={posts}></Body>
                    </main>
          );
}
function Body({posts,admin='admin'}){
      
     return (
                    <div className="h-full ">
                         {posts ? <Posts posts={posts}></Posts> : <AddPost></AddPost>} 
                    </div>
          );
}
function Posts({posts,admin}){
     return(
          <div className="pt-20 pl-10 h-full">
               <div className="text-2xl mb-3">Recent Posts</div>
               <div className="pl-4 pr-10 snap-y snap-mandatory  w-full flex flex-col items-start justify-start space-y-2 overflow-y-scroll  h-screen ">
               {posts.map(
                    post=>(
                         <Link key={post.slug} href={`/${post.username}/${post.slug}`} >
                          <a className="h-[170px] hover:px-10 snap-start space-x-3 flex flex-row items-center justify-around  transition-all duration-300 ease-in-out bg-gradient-to-r font-normal  from-emerald-400 to-blue-200 rounded p-6 w-full ">
                               <div className=" h-full  rounded"><Image className="rounded " width='100px' height='150px'  src={`${post.img}`} alt={post.img}></Image></div>
                               <div className="w-11/12 h-full">
                                 <div className="">by {post.username}</div>
                                 <div className=" tracking-widest text-2xl">{post.title}</div>
                               <div className="">{post.createdAt}</div>
                              </div>
                                 
                               <div className=" space-x-2 flex flex-row items-center justify-around">
                                  <div className="mr-5">
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.748 10.667l.918.598v6.219l-1.225 1.184h-4.636l-1.672-1.668h-2.133v-5c2.484-.003 4.053-2.505 5.459-6.667h1.207v.527l-.666 2.064v2.743h2.748zm6.252-5.667v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 5.542l-1.855-1.209h-1.812v-1.166l.667-2.064v-2.103h-3.498c-1.439 4.246-2.834 6.661-4.502 6.666v-.666h-5v9h5l.005-.667h1.662l1.671 1.667h5.64l2.022-1.95v-7.508z"/></svg>
                                    {post.heartCount}
                                  </div>
                                 <a href={`/edit/${post.slug}`} className="group"><svg className="w-7 h-7 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24.001 8.534l-11.103 11.218-5.898 1.248 1.361-5.784 11.104-11.216 4.536 4.534zm-24 10.466l-.001 2h5v-2h-4.999z"/></svg>
                                 <div  className="group-hover:opacity-90  opacity-0 transition-all text-base duration-300 ease-in-out">Edit</div>
                                 </a>
                               </div>
                          </a>
                          </Link>
                    )
               )}
               </div>
          </div>
     );
}

function AddPost(){
     return(
          <div className="flex flex-col items-center justify-center h-full ">
               <div className="flex flex-row items-center justify-between">

               <div className="text-3xl tracking-wide">Opps, Looks like<br></br> we have to work together <br></br>to add your thoughts to internet !</div>
               <div><svg className="w-32 fill-gray-900 h-32 -rotate-12" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.731 2 1.631 2h5.712z"/></svg></div>
               
               </div>
               
               <Link href="/"><a className="p-3 bg-gray-900 text-gray-100 text-xl hover:bg-gray-200 px-16 translate-y-4 hover:text-gray-900 duration-300 transition-all ease-in-out">Write</a></Link>
          </div>
     );
}