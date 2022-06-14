import Head from "/components/Head"
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

    const newPosts = (await query.get()).docs.map( (doc)=>doc.data() );

    setPosts(posts.concat(newPosts));
    setLoading(false);
    if(newPosts.length < Limit){
      setPostEnd(true);
    }
  }
  return (
   <main className="">
     <Head title="Reif Reed" description="Get your favourite reads only on Reif Reed"></Head>
     
      {!posts && <div className="p-10 text-2xl">No Posts Forund !</div>}
      {posts && <PostFeed posts={posts}></PostFeed>}
      {!loading && !postEnd && <button onClick={getMorePosts}>More...</button> }
      {<Loading show={loading}></Loading>}
      {postEnd && <div>No more posts found</div>}
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
      <div className="w-full text-3xl tracking-wider ">Recent Feeds</div>
      {posts.map(i=>(
        <div className="" key={i.title}>
            {i.title}
        </div>
      ))}
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
    return {
      props: {posts},
    }
}
   