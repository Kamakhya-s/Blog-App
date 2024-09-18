import React , {useEffect, useState} from 'react'
import { Container,PostCard } from '../components/index'
import appwriteService from '../appwrite/config'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function AllPost() {
  
    const [post, setPost] = useState([]);

    useEffect(()=>{
      appwriteService.getallPost([]).then((posts) => {
        if (posts) {
          setPost(posts.documents)
        }
      });
    },[]);
    if (post?.length === 0) {
      return (
        <div className="flex gap-6 gap-y-10 py-6  md:grid-cols-2 lg:grid-cols-3 justify-center text-center">
          there are no post please go to{" "}
          <Link to="/add-post" className="text-underline text-black">
            Add-Post
          </Link>{" "}
          page and add some post
        </div>
      );
    }
  return (
    // <div className='w-full py-8 '>
    //     <Container>
    //        <div className='flex flex-wrap'>
    //        {posts.map((posts)=>( <div key={posts.$id} className='p-2 w-1/4'>
    //         <PostCard {...posts}  />
    //        </div> ))}
    //        </div>
    //     </Container>
    // </div>
    <div className='w-full py-8 flex flex-col '>
    <Container>
      <div className="flex flex-wrap">
        {" "}
        {post.map((post) => {
          return (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          );
        })}
      </div>
    </Container>
  </div>
  )
}

export default AllPost