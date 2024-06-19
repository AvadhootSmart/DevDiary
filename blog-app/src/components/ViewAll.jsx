import React, { useEffect, useState } from "react";
import axios from "axios";
function ViewAll() {
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get("https://av-blog-app-fs.vercel.app/Blogs");
      setData(response.data);
    }
    fetchBlogs();
  }, []);


  return (
    <>
      <div className="ml-[20vw] w-full min-h-screen p-24 text-[#b8b4b0]">
        <h1 className="font-[Montserrat] text-2xl text-white uppercase">All Blogs</h1>
        <hr className="mt-4 border-2 rounded"/>
        {Data.map((blog) => (
          <div className="text-lg" key={blog._id}>
            <h2 className="mt-10"><span className="font-bold uppercase text-white">Title-</span> {blog.Title}</h2>
            <p className="mt-4"><span className="font-bold uppercase text-white">Content-</span>{blog.Preview}</p>
            <p className="mt-3"><span className="font-bold uppercase text-white">Date-</span>{blog.Date}</p>
            <hr className="mt-2 border-dashed" />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewAll;
