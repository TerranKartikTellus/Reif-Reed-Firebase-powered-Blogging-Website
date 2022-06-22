import { getUserWithUsername,postToJSON,firestore } from "../../lib/firebase";
import PostContent from '/components/PostContent' 
import { useDocumentData } from 'react-firebase-hooks/firestore';


export default function PostOfUser(props){
  const postRef = firestore.doc(props.path);          
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;

  return(
  <main className="w-full flex flex-row items-center justify-start h-full">
    <div className="w-10/12 clear-left mx-3 my-4 bg-gray-200 px-10 py-10">
    <PostContent post={post}></PostContent>
    </div>
    <div className="w-2/12 text-center text-xl flex flex-row items-center justify-center space-x-3"><img src="/like.svg" className="w-10 h-10"></img> <div>{post.heartCount || 0}</div> </div>
    
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