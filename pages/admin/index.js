import kebabCase from "lodash.kebabcase";
import { useState,useContext } from "react";
import { useRouter } from 'next/router'
import {UserContext} from "/lib/context"
import Link from "next/link";
import toast from "react-hot-toast";
import { firestore, serverTimestamp,auth } from "/lib/firebase";
import AuthCheck from "/components/AuthCheck";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Admin(){

  return(
    <main className="h-full">
		<AuthCheck>
		 <div className="flex h-full flex-row item-center justify-start ">
			<div className="w-8/12 h-full bg-red-400"><PostList ></PostList></div>
			<div className="w-4/12 h-full bg-red-00"><CreateNewPost title={null}></CreateNewPost></div>
		 </div>
    </AuthCheck>
		</main>
  );
}



function CreateNewPost({placeholderTitle="The Changing World Order"}){
	const [title,setTitle] = useState('');
	const router = useRouter();
	const {username} = useContext(UserContext);

	const slug = encodeURI(kebabCase(title));

	const isValid = title.length > 3 && title.length < 100;
	
 
	async function createPost(e){
		e.preventDefault();
		const uid = auth.currentUser.uid;
		const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
		const data = {
			title,
			slug,
			uid,
			username,
			published: false,
			content: '#Hello World !',
			mainContent: '#Hello World !',
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			heartCount: Math.floor((Math.random() * 302) + 655)
		};
		await ref.set(data);
		toast.success('Post created!');
		router.push(`/admin/${slug}`)

		return 0;
	}
	return(
	 	
		<main className=" scale-90 hover:scale-95 transition-all duration-300 text-center ease-in-out shadow-sm hover:shadow-xl font-normal group text-gray-100 mt-20 mx-3 rounded px-5 py-4   bg-gradient-to-r from-fuchsia-600 to-pink-600">
			<div className="tracking-wider text-2xl font-normal text-gray-50 mb-4">Add New Post</div>
	    <form onSubmit={createPost}>
			<div     className="  text-xs   bg-transparent text-gray-200 translate-y-4 w-full g-red-400">Title</div>
				<input value={title} onChange={ e=>setTitle(e.target.value) }  className="hover:shadow transition-all duration-300 ease-in-out font-normal  capitalize pl-3 pt-5 placeholder-gray-200 bg-transparent hover:bg-gray-100/10 w-full outline-none p-2 tracking-wide text-gray-100 text-lg"></input>
				<div className=" text-xs pl-3 tracking-wide">Characters 3 > <strong className="font-medium text-lg">{title.length}</strong> >100</div>
				<div className="flex flex-row item-center justify-center mt-5  rounded ">
					<button disabled={!isValid} className="shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out pl-3 bg-transpart text-xl bg-gray-100/30 rounded-full px-3 py-3 hover:bg-gray-100/40 ">
						<img src="/pen.svg" className="w-9 h-9"></img>
					</button>
				</div>
				</form>
		</main> 
	
	);
}


function PostList(){
	const ref = firestore.collection('users')
											 .doc(auth.currentUser.uid)
											 .collection('posts')
											 .orderBy('createdAt')
  // const query = ref;
	const [querySnapshot] = useCollection(ref);
	const posts = querySnapshot?.docs.map( (doc)=>doc.data() );
	console.log('-----',posts);
	return(
          <List posts={posts} admin></List>
     );
}
function List({posts,admin}){
	return(
		<div className="pt-20 pl-10 h-full">
               <div className="text-2xl mb-3">Recent Posts</div>
               <div className="pl-4 pr-10 snap-y snap-mandatory  w-full flex flex-col items-start justify-start space-y-2 overflow-y-scroll  h-screen ">
               {posts.map(
                    post=>(
                         <Link key={post.slug} href={`/${post.username}/${post.slug}`} >
                          <a className="overflow-hidden h-[200px] group hover:h-[280px] group  snap-start space-x-3 flex flex-row items-center justify-start  transition-all duration-1000 ease-in-out  shadow-lg rounded  w-full bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-indigo-400/30">
                               <img src={post.img} className="rounded-l group-hover:opacity-95  object-center w-2/12 object-cover w-full h-full"></img>
                               <div className="w-8/12 h-full group pt-5">
                                 <div className="">by {post.username}</div>
                                 <div className=" tracking-widest text-3xl ">{post.title}</div>
                                 
                                 <div className="w-[650px] bg-red-5 pt-5 group-hover:opacity-100 opacity-0  group-hover:translate-y-0 translate-y-10 transition-all duration-1000 ease-in-out absolute group-hover:relative -skew-x-12 scale-110 group-hover:scale-100 group-hover:skew-x-0">{post.content}</div>
                                 <div className="text-xs group-hover:skew-x-12 skew-x-0 mt-14 group-hover:mt-7 transition-all duration-1000 ease-in-out">Posted on:    <strong>{new Date(post.createdAt).toUTCString()}</strong></div>
                                 <div className="text-xs group-hover:skew-x-12 skew-x-0 ">Last Updated :<strong>{new Date(post.updatedAt).toUTCString()}</strong></div>
                              
                              </div>
                                 
                               <div className=" space-x-2 grid grid-cols-2 ">
                                  
                                  <div className=" hover:opacity-90">
                                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.748 10.667l.918.598v6.219l-1.225 1.184h-4.636l-1.672-1.668h-2.133v-5c2.484-.003 4.053-2.505 5.459-6.667h1.207v.527l-.666 2.064v2.743h2.748zm6.252-5.667v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-4 5.542l-1.855-1.209h-1.812v-1.166l.667-2.064v-2.103h-3.498c-1.439 4.246-2.834 6.661-4.502 6.666v-.666h-5v9h5l.005-.667h1.662l1.671 1.667h5.64l2.022-1.95v-7.508z"/></svg>
                                    {post.heartCount}
                                  </div>
                                 
                                 {/* <a href={`/edit/${post.slug}`} className="group hover:opacity-90">
                                   <img src="/share.svg" className="w-7 h-7"></img>
                                 <div  className="group-hover:opacity-90  opacity-0 transition-all text-base duration-300 ease-in-out">Share</div>
                                 </a>
                                 
                                 <div className=" hover:opacity-90">
                                    <img src="/eye.svg" className="w-7 h-7"></img>
                                  {post.heartCount/2*10}
                                </div> */}

                                 <a href={`/admin/${post.slug}`} className="group hover:opacity-90"><svg className="w-7 h-7 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24.001 8.534l-11.103 11.218-5.898 1.248 1.361-5.784 11.104-11.216 4.536 4.534zm-24 10.466l-.001 2h5v-2h-4.999z"/></svg>
                                 <div  className="group-hover:opacity-90  opacity-0 transition-all text-base duration-300 ease-in-out">Edit</div>
                                 </a>

                                 {/* <a href={`/edit/${post.slug}`} className="group hover:opacity-90">
                                   <img src="/eye.svg" className="w-7 h-7"></img>
                                 <div  className="group-hover:opacity-90  opacity-0 transition-all text-base duration-300 ease-in-out">Views</div>
                                 </a> */}
                                 

                               </div>
                          </a>
                          </Link>
                    )
               )}
               </div>
          </div>
	);
}