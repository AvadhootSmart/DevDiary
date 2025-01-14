import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import BlogContent from "../components/BlogContent";
import About from "../components/About";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function BlogPage() {
    const [blog, setblog] = useState({});
    const { id } = useParams();

    async function fetchBlog() {
        const response = await axios.get(`${backendURL}/Blog/${id}`);
        setblog(response.data);
        console.log(typeof response.data.Date)
    }
    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="min-h-screen bg-[#231e1d] text-[#b8b4b0]  w-full flex flex-col font-[Alegreya]">
            <Title title="Dev Diary" />
            <div className="Content lg:w-full sm:w-[100vw] flex lg:justify-center sm:px-5 lg:pt-10 sm:pt-5">
                <BlogContent content={blog} />
            </div>
        </div>
    );
}

export default BlogPage;
