import { getUserWithUsername,postToJSON,firestore } from "../../lib/firebase";

export default function PostOfUser(){
          return(
                    <main>
                              Post of user:
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
                    post = (await postRef.get())
                    path =postRef.path;

          }
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