import Head from "/components/Head"
import Image from "next/image"
import { useContext, useState } from 'react';
import { UserContext } from '/lib/context';
import {firestore,postToJSON} from "/lib/firebase"

export default function Home(props) {
  const {user,username} = useContext(UserContext);
      if(user && !username){
            window.location.replace(`/enter`);
      }
     
  const [posts,setPosts] = useState(props.posts);

  const [loading,setLoading] = useState(false);
  const [postEnd,setPostEnd] = useState(false);

  async function getMorePosts(){
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore.collectionGroup('posts')
      .where('published','==',true)
      .orderBy('createdAt','desc')
      .startAfter(cursor)
      .limit(Limit);

    const newPosts = (await query.get()).docs.map( postToJSON );
    console.log('new post: ',newPosts);
    if(newPosts){
    setPosts(posts.concat(newPosts));
    setLoading(false);
    }
    if(newPosts.length < Limit){
      setPostEnd(true);
    }
  }
  
  return (
   <main className="h-screen overflow-y-scroll overflow-x-hidden">
     <Head title="Reif Reed" description="Get your favourite reads only on Reif Reed"></Head>
       <div className="overflow-y-scroll ">

      {!posts && <div className="p-10 text-2xl">No Posts Forund !</div>}
      
      {posts  && <PostFeed  posts={posts}></PostFeed>}
      {!loading && !postEnd && posts.length>0 && <button className="bg-red-00 ml-10 bg-gray-300 px-2 py-1 hover:tracking-wider hover:scale-105 transition-all duration-200 ease-in-out" onClick={getMorePosts}>More...</button> }
      {<Loading show={loading}></Loading>}
      {postEnd && <div className="mr-10 text-lg underline text-right ">No more posts found</div>}
      {!posts && !top2 && <div>No posts found</div>}
      
       </div>
   </main>
  )
}
function Loading({show}){
  return(
    <>
    {show && 
    <div className="fixed top-20 right-20 select-none">
      <div className="absolute text-gray-900 bg-gray-900 w-[30px] h-[30px] rounded  animate-spin-slow">.</div>
      <div className="h-[10px]"></div>
      <div className="absolute text-gray-800 bg-gray-800  -left-3 w-[20px]  h-[20px] rounded  animate-spin-rev">.</div>
      <div className="h-[10px]"></div>
      <div className="absolute text-gray-700 bg-gray-700  -left-5 w-[10px]  h-[10px] rounded  animate-spin-rev">.</div>
    
    </div>}
    </>
  );
}
function PostFeed({posts}){

  
  return (
    <div className="w-full pl-10 pt-16">
      <div className=" w-auto b-red-700 text-3xl tracking-wider absolute top-5 text-gray-100 z-50  bg-gray-900 p-3">Recent Feeds</div>
      <div className=" px-2 bg-red-40 grid grid-flow-row grid-cols-2 ">1
       
      </div>
      <div className=" px-2 bg-red-40 grid grid-flow-row grid-cols-2 ">

      {posts && posts.map(i=>(
        <a href={`/${i.uid}`} className="flex flex-row justify-around space-x-2 items-center bg-gradient-to-r from-red-00 border-b-4 border-gray-800 hover:border-b-2 transition-all ease-in-out duration-300 scale-90 hover:scale-95 to-green-200 py-2 w-[500px] my-10 px-2" key={i.uid}>
            <div className="w-100 h-150"><Image alt={i.title} src={i.img} width={100} height={150}></Image></div>
            <div className="h-full w-[400px]">
                <div className="text-gray-700 text-base italic">by {i.username}</div>
                <div className="text-2xl b-green-300 tracking-wide h-[60px]">{i.title}</div>
                <div className="text-gray-500 text-base">Published on: {i.createdAt}</div>
                <div className="flex flex-row items-center justify-end">
                    <div>
                      <div>
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.748 10.667l.918.598v6.219l-1.225 1.184h-4.636l-1.672-1.668h-2.133v-5c2.484-.003 4.053-2.505 5.459-6.667h1.207v.527l-.666 2.064v2.743h2.748zm6.252-5.667v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 5.542l-1.855-1.209h-1.812v-1.166l.667-2.064v-2.103h-3.498c-1.439 4.246-2.834 6.661-4.502 6.666v-.666h-5v9h5l.005-.667h1.662l1.671 1.667h5.64l2.022-1.95v-7.508z"/></svg>
                      </div>
                      <div>{i.heartCount}</div>
                    </div>
                </div>
            </div>
        </a>
      ))}
      </div>
    </div>
  );
}
const Limit = 10;
export async function getServerSideProps(context){
  const postsQuery = firestore.collectionGroup('posts')
    .where('published','==',true)
    .orderBy('createdAt','desc')
    .limit(Limit);

    const posts = (await postsQuery.get()).docs.map(postToJSON);
    console.log('got: ',posts);
    return {
      props: {posts},
    }
}
   