import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";


const backendURL = "http://localhost:5000" 

function RemoveBlogs() {
  const [Data, setData] = useState([{}]);

  async function DeleteBlog(id){
    await axios.delete(`${backendURL}/Admin/RemoveBlog/${id}`);
  };

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get(`${backendURL}/Blogs`);
      setData(response.data);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="ml-[20vw] w-full min-h-screen p-24 text-[#b8b4b0]">
        <h1 className="font-[Montserrat] text-2xl text-white uppercase">
          Remove Blog
        </h1>
        <hr className="mt-4 border-2 rounded" />
        {Data.map((blog) => (
          <div className="text-lg" key={blog._id}>
            <div className="mt-10 flex justify-between items-center">
              <h2 className="font-bold uppercase text-white">
                Title-{" "}
                <span className="text-[#b8b4b0] normal-case">{blog.Title}</span>
              </h2>
              <MdDeleteForever
                onClick={()=>DeleteBlog(blog._id)}
                className="text-red-700 text-3xl hover:scale-125 transition-all ease-in-out cursor-pointer"
              />
            </div>
            <hr className="mt-2 border-dashed" />
          </div>
        ))}
      </div>
    </>
  );
}

export default RemoveBlogs;
