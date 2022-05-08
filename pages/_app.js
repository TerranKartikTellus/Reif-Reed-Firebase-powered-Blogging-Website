import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'
import SideNav from "/components/sideNav"

function MyApp({ Component, pageProps }) {
  return (

<main className="flex max-h-max flex-row items-start justify-start">  
  <div className="bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200   h-screen w-3/12">
    <SideNav></SideNav>
  </div>
  <div className="bg-slate-200 h-screen w-9/12">
    <Component {...pageProps} />
    <Toaster></Toaster>
  </div>
</main>

);
}

export default MyApp;
