import { useState } from "react";
import AuthCheck from "/components/AuthCheck";
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import { useRouter } from "next/router";
import { firestore, serverTimestamp,auth } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import   ReactMarkdown  from "react-markdown";
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
      <div>
        <div>{post.title}</div>
        <div>id: {post.slug}</div>
        <div><PostForm postRef={postRef} defaultValues={post} preview={preview}></PostForm></div>
      </div>
    }
    </div>

  );
}

function PostForm({postRef, defaultValues, preview}){
  const {register,handleSubmit,reset,watch} = useForm({defaultValues,mode:'onChange'})
  const router = useRouter();
      
  async function updatePost({content,published}){
    
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp()
    })
    reset({content,published});
    toast.success('Post updated successfully!');
    	router.push(`/admin`)
  }

  return(
    <div>
      <form onSubmit={handleSubmit(updatePost)}>
        {
          preview && (
            <div><ReactMarkdown>{watch('content')}</ReactMarkdown></div>
          )
        }
        { !preview &&  
        <div>
          <textarea   {...register('content', {register})}></textarea>
          <fieldset>
            <input name="published" type="checkbox" {...register('published', {register})} ></input>
            <lable>Published</lable>
          </fieldset>
          <button className="" type="submit">Save Changes</button>
        </div>
        }
      </form>
    </div>
  );
}