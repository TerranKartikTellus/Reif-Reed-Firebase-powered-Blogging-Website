import Link from "next/link"
import { useContext } from "react";
import { UserContext } from "/lib/context";

export async function getServerSideProps({query}){
     const {username} = query;
     
     return {
          props: {user,post},
     };
}

export default function User(){
          const {user , username} = useContext(UserContext);
          return(
                    <main className="h-full ">
                              {/* <Nav username={username}></Nav> */}
                              <Body></Body>
                    </main>
          );
}
function Body({posts,admin}){
          return (
                    <div className="h-full">
                         {posts ? <Posts posts={posts}></Posts> : <AddPost></AddPost>} 
                    </div>
          );
}
function Posts({posts,admin}){
     return(
          <div>
               {posts.map(
                    i=>(
                         <P post={i} key={i.slug} admin={admin} ></P>
                    )
               )}
          </div>
     );
}
function P({post,key,admin}){
     return(
          <div>
               <div>{post}</div>
               <div>{key}</div>
               <div>{admin}</div>
               
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