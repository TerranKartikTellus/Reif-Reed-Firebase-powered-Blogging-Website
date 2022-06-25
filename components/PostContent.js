import Link from "next/link";
import  ReactMarkdown  from 'react-markdown';
import gfm from 'remark-gfm'


export default function PostContent({post}){
	const createdAt = typeof post?.createdAt === 'number' ? 
		new Date(post.createdAt) :
		post.createdAt.toDate();
	
	return(
	<div className="overflow-y-scroll bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 overflow-auto h-screen  pl-7 pr-7 pt-20">
	  <div className="bg-gradientto-r from-pink-300 via-purple-300 to-indigo-400 p-5 my-10 rounded flex flex-row items-center justify-start">
	   <div className="w-10/12">
	  	<div className="text-xs">Written by  <Link href={`/${post?.username}`}><a className="underline text-black hover:text-black/90 italic text-sm">{post?.username}</a></Link> </div>
	  	<div className="text-4xl my-2">{post?.title}</div>
	  	<div className="text-base my-2 ">{post?.content}</div>
	   </div>
	  <div className="w-2/12">
	  	  <div className="w-full text-center text-xl flex flex-row items-center justify-center space-x-3"><img src="/like.svg" className="w-10 h-10"></img> <div>{post.heartCount || 0}</div> </div>
	  		<Link href="/">
				<a  className="text-center my-2 flex flex-row justify-center items-center space-x-1 hover:-translate-y-1 hover:opacity-95 transition-all duration-300 ease-in-out select-none hover:bg-gradient-to-r hover:from-slate-900 hover:via-slate-800 hover:to-gray-800 bg-gray-900 text-gray-100 rounded p-2 font-normal">
	  			<svg className="fill-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 12l2.021 12h7.959l2.02-12h-12zm11.384-5.766c-.644-2.371-2.81-4.234-5.385-4.234-2.528 0-4.663 1.801-5.349 4.106-.407 1.371-.038 3.117-1.65 3.403v1.491h14v-1.495c-1.564-.305-1.299-2.102-1.616-3.271zm-9.009 1.766c0-2.122 1.397-4 3.625-4 2.207 0 3.594 1.878 3.594 4h-7.219zm8.922-4.215l2.637-3.785 1.066.74-2.99 4.291c-.195-.446-.437-.86-.713-1.246z"/></svg>
	  			<div>Buy me a coffee</div> 
	  		</a>
			</Link>
	  </div>
	  </div>
	  <div className="p-7 rounded ">
	  	<ReactMarkdown remarkPlugins={[gfm]}  >{post?.mainContent}</ReactMarkdown>
	  	{/* <Reply></Reply> */}
			{/* <MoreFromReifReed></MoreFromReifReed> */}
			<div className="text-center my-20 font-normal text-4xl ">END</div>
	  </div>
	</div>
	);
}

function Reply(){
	return(
	<div className="scale-90  my-5 bg-gray-900/10 text-gray-900 px-6 py-5 text-center">
		<div className="w-full h-full text-xl ">Leave a Reply</div>
		<div className="w-full h-full flex flex-row items-center justify-center  "><div className="w-[123px]     text-left  text-2xl font-medium  bg-red-20">Email</div><input type='email' className="   placeholder-slate-900 outline-none focus-within:border-2 focus-within:border-purple-300 transition-all duration-300 ease-in-out text-center    bg-gray-800/10 p-2 m-2 w-full" placeholder="name@email.com"></input></div>
		<div className="w-full h-full flex flex-row items-center justify-center  "><div className="w-28  text-2xl text-left font-medium bg-red-20">Comment</div><textarea type='text'  className=" placeholder-slate-900 outline-none focus-within:border-2 focus-within:border-purple-300 transition-all duration-300 ease-in-out text-center  bg-gray-800/10 p-2 m-2 w-full h-44" placeholder="Enter your comment here"></textarea></div>
	</div>
	);
}
function MoreFromReifReed(){
	return(
		<div>
			More
		</div>
	);
}