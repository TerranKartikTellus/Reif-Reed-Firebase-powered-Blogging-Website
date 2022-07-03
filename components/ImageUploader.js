import {useState} from 'react'
import {auth,storage,STATE_CHANGED} from '/lib/firebase'
import Loader from './loading'

export default function ImageUploader(){
  const [uploading, setUploading] = useState(false)
  const [progress,setProgress] = useState(0);
  const [downloadUrl,setDownloadUrl] = useState(null);
  
  async function uploadFile(e){
    const file = Array.from(e.target.files)[0]
    const extension = file.type.split('/')[1] ;

    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    )
    setUploading(true);
    //start upload
    const task = ref.put(file);

    task.on(STATE_CHANGED,(snapshot)=>{
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 ).toFixed(0);

      task.then(d=>ref.getDownloadURL())
          .then(url=>{
            setDownloadUrl(url);
            setUploading(false);

          })
    });

    return(
      0
    );
  }

  return(
    <div className='px-10 bg-gray-100/30 border-2 border-gray-300 p-5 rounded'>
        {uploading && <Loader></Loader>}
        {uploading && <div>{progress} %</div>}

        {
          !uploading && 
          <div>
            <label className='space-x-10 my-5 flex flex-row items-start justify-start'>
              <div className=''>📷 Upload Image</div>
              <input type={'file'}
               onChange={uploadFile}
               accept="image/x-png,image/gif,image/jpeg"></input>
            </label>
          </div>
        }

        {downloadUrl &&
        <div className=' '>
          <div className='text-lg font-medium'>Link:</div>
          <code className=' pr-36'>{`![alt](${downloadUrl})`}</code>
        </div>
        }
    </div>
  );
}