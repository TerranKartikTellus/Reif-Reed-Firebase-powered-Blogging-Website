import Head from "/components/Head"
import Image from "next/image"
import { useContext, useState } from 'react';
import { UserContext } from '/lib/context';
import {firestore,postToJSON} from "/lib/firebase"
import Link from 'next/link'
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
    // const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore.collectionGroup('posts')
      .where('published','==',true)
      .orderBy('createdAt','desc')
      .limit(Limit)
      // .startAfter(cursor)

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
   <main className="h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
     <div className="flex border-b-2 border-gray-500 bg-[#FFCC8F] shadow-2xl drop-shadow-xl flex-row px-5 py-28 mb-10 items-center justify-center rounded  bg-[FAC213] ">
        
        <div className=" p-4 w-full flex flex-row items-center justify-center">
          <img src="/reading.png" className="translate-y-5 w-1/3"></img>
          <img src="/reading-book.png" className="w-1/3"></img>
          <img src="/studying.png" className="w-1/3 translate-y-5 "></img>
        </div>
        <div className="w-full space-y-7 text-right">
          <div className="text-6xl font-serif text-[#]">Stay curious.</div>
          <div className="text-xl  font-serif text-gray-900 pl-20">Discover stories, thinking, and expertise from writers on any topic.</div>
          <div><Link href="/enter"><a  className="hover:invert hover:translate-y-3 shadow-lg drop-shadow-lg hover:shadow-2xl duration-500 ease-in-out transition-all scale-75 tracking-widest rounded-l-full rounded-r-full p-3 bg-black text-white font-serif text-xl px-10">Start Reading</a></Link></div>
        </div>
      </div>
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
    <div className="w-full px-10 pt-16">
      
      <div className="w-[400px] b-red-700  text-3xl space-x-3 tracking-wider  scale-75 text-center text-gray-100 z-50  bg-gray-900 p-3 flex flex-row items-center justify-start">
        <div><svg className="scale-125 fill-white " width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/></svg></div>
        <div className="text-center">Trending on Reif Reed</div>
      </div>
      <div className=" px-2 bg-red-40 grid grid-flow-row grid-cols-2 ">
       
      </div>
      <div className=" px-2 bg-red-40 grid grid-flow-row grid-cols-2 ">

      {posts && posts.map(i=>(
      
        <a href={`/${i.username}/${i.slug}`} className="flex flex-row justify-around space-x-2 items-center bg-gradient-to-r from-red-00 border-b-4 border-gray-800 hover:border-b-2 transition-all ease-in-out duration-300 scale-90 hover:scale-95 to-green-200 py-2 w-[500px] my-10 px-2" key={i.uid}>
            <div className="w-100 h-150"><Image alt={i.title} src={i.img} width={100} height={150}></Image></div>
            <div className="h-full w-[400px]">
                <div className="text-gray-700 text-base italic">by {i.username}</div>
                <div className="text-2xl b-green-300 tracking-wide h-[60px]">{i.title}</div>
                <div className="text-gray-600 text-base">Published on: <strong>{new Date(i.createdAt).toUTCString() }</strong></div>
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
  const postsQuery = await firestore.collectionGroup('posts')
    .where('published','==',true)
    .orderBy('createdAt','desc')
    .limit(Limit);
  
    const posts = (await postsQuery.get()).docs.map(postToJSON);
    console.log('got: ', posts);
    return {
      props: {posts},
    }
}


