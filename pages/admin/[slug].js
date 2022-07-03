import { useState } from "react";
import AuthCheck from "/components/AuthCheck";
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import { useRouter } from "next/router";
import { firestore, serverTimestamp,auth } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown  from "react-markdown";
import Link from "next/link"

export default function EditPost(){
  return (
    <AuthCheck>
      <ManagePost></ManagePost>
    </AuthCheck>
  );
}
function ManagePost(){
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const {slug} = router.query;

  const postRef = firestore.collection('users')
  .doc(auth.currentUser.uid)
  .collection('posts')
  .doc(slug);  

  const [post] = useDocumentDataOnce(postRef);

  return(
    <div className="w-full h-full">
    {
      post && 
      <div className="p-20 w-full h-full overflow-hidden">
        <div className="text-4xl flex flex-row items-center justify-between">
          <div>{post.title}</div>
          <div className="group relative ">
            <div className="group-hover:opacity-90 w-10 h-10 group-hover:-rotate-2 transition-all duration-500 ease-in-out"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7 17.75c0-.414.336-.75.75-.75h13.5c.414 0 .75.336.75.75s-.336.75-.75.75h-13.5c-.414 0-.75-.336-.75-.75zm-5-4c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm9-4c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-7-4c0-.414.336-.75.75-.75h16.5c.414 0 .75.336.75.75s-.336.75-.75.75h-16.5c-.414 0-.75-.336-.75-.75z" fill-rule="nonzero"/></svg></div>
            <div className=" transition-all duration-500 ease-in-out group-hover:opacity-100 absolute top-10 right-0 text-center text-xl opacity-0 group-hover:translate-x-0 translate-x-36 ">
              <button className="bg-cyan-500 font-medium tracking-wide text-gray-50 hover:text-gray-100 hover:bg-cyan-500/60 transition-all duration-500 ease-in-out w-[200px]" onClick={()=>{ setPreview(!preview); }}>{preview ? 'Edit' : 'Preview'  }</button>
              <Link href={`/${post.username}/${post.slug}`}><a className="bg-green-500 ">Preview</a></Link>
            </div>
          </div>
        </div>
        <div>id: {post.slug}</div>
        <div className="mt-5  w-full h-full"><PostForm postRef={postRef} defaultValues={post} preview={preview}></PostForm></div>
      </div>
    }
    </div>

  );
}

function PostForm({postRef, defaultValues, preview}){
  const {register,handleSubmit,reset,watch , formState , errors} = useForm({defaultValues,mode:'onChange'})
  const router = useRouter();
      
  async function updatePost({content,mainContent,published}){
    
    await postRef.update({
      content,
      mainContent,
      published,
      updatedAt: serverTimestamp()
    })
    reset({content,mainContent,published});
    toast.success('Post updated successfully!');
    	router.push(`/admin`)
  }

  return(
    <div className=" w-full h-full">
      <form className=" w-full h-full" onSubmit={handleSubmit(updatePost)}>
        {
          preview && (
            <div className=" w-full h-full overflow-auto py-10 ">
              <ReactMarkdown>{watch('mainContent')}</ReactMarkdown>
              {/* <div className="text-center border-b-2 border-gray-900">_</div> */}
            </div>
          )
        }
        { !preview &&  
        <div className=" w-full h-full">
          
          <div className="relative top-10 z-50 font-medium text-xl left-10 ">Content</div>
          <textarea  className="bg-gray-50/70 w-full h-[100px]  scale-95 px-5 pt-10 pb-6 shadow-xl  rounded outline-gray-100"  {...register('content', {register})}></textarea>
          
          <div className="relative top-10 z-50 font-medium text-xl left-10">Post Content</div>
          <textarea  className="bg-gray-50/70 w-full h-[300px]  scale-95 px-5 pt-10 pb-6 shadow-xl  rounded outline-gray-100"  {...register('mainContent', {register})}></textarea>
          
          
          <fieldset className="space-x-5 w-full">
            <input name="published" type="checkbox" {...register('published', {register})} ></input>
            <lable className="mt-2">Published</lable>
          </fieldset>
          <button className="bg-green-600 w-full py-2 mt-2 text-xl rounded " type="submit">Save Changes</button>
        </div>
        }
      </form>
    </div>
  );
}