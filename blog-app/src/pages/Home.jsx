import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import BlogList from "../components/BlogList";
import About from "../components/About";
import axios from "axios";
import gsap from "gsap";
import Auth from "../components/Auth";

const backendURL = "http://localhost:5000" ;

function Home() {
  const [Data, setData] = useState([{}]);

  useEffect(() => {
    gsap.from(".Content", {
      opacity: 0,
      y: 100,
      duration: 0.5,
      delay: 0.5,
      ease: "power1",
    });
    async function fetchBlogs() {
      const response = await axios.get(backendURL);
      setData(response.data);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      {console.log(backendURL)}
      <div className="min-h-screen bg-[#231e1d] text-[#b8b4b0]  w-full flex flex-col font-[Alegreya]">
        <Title />
        <div className="Content w-full flex justify-around p-20">
          <BlogList BlogsData={Data} />
          <div className="Content flex flex-col py-10 px-16 -mr-16 w-[35%]">
            <About />
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
