import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.authReducer.status);
    console.log(authStatus);
    
    useEffect(() => {
        appwriteService
          .getallPost()
          .then((posts) => {
            if (posts) {
              setPosts(posts.documents);    
            }
          })
      }, []);
    
    if (authStatus == false) {
        return (
            <div className="w-full py-8 ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if  (authStatus == true && posts.length===0) {
        return (
            <div className="w-full py-8 ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                              Click <Link to="add-post" className='italic'>Add Post</Link> to continue . . . 
                            </h1>
                            
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap '>
                    { posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full h-auto sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default Home