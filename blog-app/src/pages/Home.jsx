import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import BlogList from "../components/BlogList";
import About from "../components/About";
import Recent from "../components/Recent";
import axios from "axios";

function Home() {
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await axios.get("http://av-blog-app-be-vercel.app/Blogs");
      setData(response.data);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className={`min-h-screen bg-[#231e1d] text-[#b8b4b0]  w-full flex flex-col font-[Alegreya]`}>
        <Title />
        <div className="Content w-full flex justify-around p-20">
          <BlogList BlogsData={Data} />
          <div className="flex flex-col py-10 px-16 -mr-16 w-[35%]">
            <About />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
