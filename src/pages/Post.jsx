import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.authReducer.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
  console.log(isAuthor);
  console.log(post);
  console.log(userData);
  
  
    useEffect(() => {
        if (slug) {
          
          appwriteService.getPost(slug).then((post) => {
            if (post) {
             
              setPost(post);
        //    console.log(post);
            }
            else 
            {
              navigate("/");
            }
          });
        } else navigate("/");
      }, [slug, navigate]);
    
      const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
          if (status) {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/");
          }
        });
      };
    return post ? (
        <div className="py-8 ">
          <div className="border border-slate-500 m-2 bg-gray-500">
            <Container>
                <div className="  object-contain flex justify-center border  border-gray-500  rounded-xl py-2 my-2  bg-gray-400">
                    <img src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl  "/>
                </div>
                <article className=" border border-gray-500 py-4 px-8 bg-gray-400 text-wrap break-words rounded-xl">
                {/* <div className=" w-full mb-6"> */}
                    <h1 className="  text-2xl font-bold text-black">{post.title}</h1>
                {/* </div> */}
                {/* <div className="browser-css text-black mb-4  "> */}
                  {parse(post.content)}
                    {/* </div> */}
                    </article>


                    <div className="w-full p-2">
                      {isAuthor && (
            <div className="right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 border border-black" className="mr-3 w-22">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500 border border-black w-22" onClick={deletePost}>
                Delete
              </Button>
            </div>
           )}
                    
                    </div>

                   
                       

                    
            </Container>
            </div>
        </div>
    ) : null;
}