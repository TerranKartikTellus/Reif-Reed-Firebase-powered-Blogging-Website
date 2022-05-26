import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'
import SideNav from "/components/sideNav"

import {useUserData} from "/lib/hooks.js"
import {UserContext} from "/lib/context"

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  // console.log("uSer data:   ",userData.user.displayName,userData.user.email);
return (
<UserContext.Provider value={userData}>
<main className="flex max-h-max flex-row items-start justify-start">  
  <div className="bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200   h-screen w-3/12">
    <SideNav></SideNav>
  </div>
  <div className="bg-slate-200 h-screen w-9/12">
    <Component {...pageProps} />
    <Toaster></Toaster>
  </div>
</main>
</UserContext.Provider>
);
}

export default MyApp;
