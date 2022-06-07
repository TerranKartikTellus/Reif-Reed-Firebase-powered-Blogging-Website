import Loading from "/components/loading"
import Head from "/components/Head"
import { useContext } from 'react';
import { UserContext } from '/lib/context';

export default function Home() {
  const {user,username} = useContext(UserContext);
      if(user && username){
            window.location.replace(`/${username}`);
      }
  return (
   <main className="">
     <Head title="Reif Reed" description="Get your favourite reads only on Reif Reed"></Head>
     hello
   </main>
  )
}
   