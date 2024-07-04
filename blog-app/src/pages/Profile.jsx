import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import BlogList from "../components/BlogList";
import About from "../components/About";
import axios from "axios";
import gsap from "gsap";
import Auth from "../components/Auth";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const backendURL ="http://av-blog-app-be.vercel.app"

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [Data, setData] = useState([{}]);

    async function fetchBlogs() {
        const response = await axios.get(`${backendURL}/${user._id}/blogs`)
        setData(response.data.Blogs);
    }
    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <>
            <div>
                <div className="min-h-screen bg-[#231e1d] text-[#b8b4b0]  w-full flex flex-col font-[Alegreya]">
                    <Title title={`${user.Username} Blogs`} />
                    <div className="Content w-full flex justify-around p-20">
                        <BlogList BlogsData={Data} />
                        <div className="Content flex flex-col py-10 px-16 -mr-16 w-[35%]">
                            <About />
                            {user ? (
                                <div className="flex gap-4 mt-10">
                                    <div className="border-2 border-white rounded-md w-fit p-4">
                                        <Link to={"/"}>All Blogs</Link>
                                    </div>
                                    <div className="border-2 border-white rounded-md w-fit p-4">
                                        <Link to="/Editor/ViewAll">Manage Blogs</Link>
                                    </div>
                                </div>
                            ) : (
                                <Auth />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
