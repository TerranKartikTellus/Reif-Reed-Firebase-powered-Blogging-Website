import Link from "next/link"




export default function NotFound(){
          return(
              <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
                    <div className="w-full flex flex-row items-center justify-center space-x-5 ">
                    <div><img className="h-72 shadow-xl w-72 rounded-full object-cover" src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Felis_catus-cat_on_snow.jpg"></img></div>
                    </div>
                    <div className="text-xl">Looks like somthing went wrong</div>
                    <Link href="/"><a className="text-xl bg-gray-900 text-center flex-col flex items-center justify-center text-gray-100 px-3 py-1 transition-all duration-300 ease-in-out hover:bg-opacity-90 shadow rounded">
                              <img className="w-10 h-10 invert" src="/home.svg"></img>
                              Home
                              </a></Link>
              </div>
          );
}