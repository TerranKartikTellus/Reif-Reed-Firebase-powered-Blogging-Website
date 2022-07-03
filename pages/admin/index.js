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
			{/* <div className="w-8/12 h-full bg-red-400"><PostList ></PostList></div> */}
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
				<div className=" text-xs pl-3 tracking-wide">Characters <strong className="font-medium text-lg">{title.length}</strong> / 100</div>
				<div className="flex flex-row item-center justify-center mt-5  rounded ">
					<button disabled={!isValid} className="shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out pl-3 bg-transpart text-xl bg-gray-100/30 rounded-full px-3 py-3 hover:bg-gray-100/40 ">
						<img src="/pen.svg" className="w-9 h-9"></img>
					</button>
				</div>
				</form>
		</main> 
	
	);
}

