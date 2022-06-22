import Link from "next/link";
import  ReactMarkdown  from "react-markdown";


export default function PostContent({post}){
	const createdAt = typeof post?.createdAt === 'number' ? 
		new Date(post.createdAt) :
		post.createdAt.toDate();
	
	return(
		<div>
			<div className="text-xs">Written by  <Link href={`/${post?.username}`}><a className="underline text-black hover:text-black/90 italics text-sm">{post?.username}</a></Link> </div>
			<div className="text-4xl my-2">{post?.title}</div>
			<ReactMarkdown>{post?.content}</ReactMarkdown>
		</div>
	);
}