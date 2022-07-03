import { getUserWithUsername,postToJSON,firestore } from "../../lib/firebase";
import PostContent from '/components/PostContent' 
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Head from "/components/Head"
      

export default function PostOfUser(props){
  const postRef = firestore.doc(props.path);          
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;

  return(
  <main className="w-full flex flex-row items-start overflow-y-hidden justify-start h-full">
    <Head title={post?.title} cardTitle={post?.title} image={post?.img} description={post?.content}></Head>

    <div className=" clear-left  bg-gray-200 overflow-y-scroll overflow-auto ">
    <PostContent postRef={postRef} post={post}></PostContent>
    </div>
  </main>
          );
}

export async function getStaticProps({params}){
          const {username,slug} = params;
          const userDoc = await getUserWithUsername(username);
          let post,path;
          if(userDoc){
            const postRef = userDoc.ref.collection('posts').doc(slug); 
            // (await postsQuery.get()).docs.map(postToJSON);
            post = postToJSON(await postRef.get())
            path =postRef.path;
            
          }
          console.log('--> ',path,'==>',post);
          return {
                    props: {path,post},
                    revalidate: (60*60*1000)
          };

}
export async function getStaticPaths(){
          const snapshot = await firestore.collectionGroup('posts').get();
          const paths = snapshot.docs.map(
            doc=>{
                  const {slug,username} = doc.data();
                  return{
                    params: {username,slug}
                  };
           }
          )
          return {
                    paths,
                    fallback: 'blocking'
          }
          
}