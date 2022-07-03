import {firestore,auth,increment} from "/lib/firebase";
import {useDocument} from 'react-firebase-hooks/firestore';

export default function HeartButton({postRef}){
  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  async function removeHeart(){
    const batch = firestore.batch();

    batch.update(postRef, {heartCount: increment(-1) })
    batch.delete(heartRef);

    await batch.commit();
    
  }

  async function addHeart(){
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, {heartCount: increment(1) })
    batch.set(heartRef , {uid})
    await batch.commit();
  }
  return  heartDoc?.exists ? (<button className="text-center w-full my-2 grayscale " onClick={removeHeart}> 💔 Unheart</button>) : (<button className=" grayscale text-center w-full my-2" onClick={addHeart}>💖 Heart</button>);
}