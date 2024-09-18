import React from 'react'
import appwriteService from '../appwrite/config';
import {Link} from 'react-router-dom';



function PostCard({$id,title,featuredImage}) {
  return (
     <Link to={`/post/${$id}`}>
         <div className='w-full h-full relative bg-zinc-500 rounded-lg border border-slate-950 p-2 shadow-md shadow-gray-500'>
            <div className='w-full h-fit  mb-4 pb-4 '>
    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  className='rounded-lg border border-zinc-600 text-amber-50 flex flex-wrap justify-center items-center' />

            </div>
             <h2
            className='absolute inset-x-0 bottom-0 text-2xl font-bold text-amber-50 p-2 pb-2 ' >
              {title}
              </h2>
            </div>
    </Link>
  )
}

export default PostCard