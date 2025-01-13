import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import BlogList from "../components/BlogList";
import axios from "axios";
import Auth from "../components/Auth";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [Data, setData] = useState([{}]);

    async function fetchBlogs() {
        if (!user) navigate("/");
        const response = await axios.get(`${backendURL}/${user._id}/blogs`);
        setData(response.data.Blogs);
    }
    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <>
            <div>
                <div className="min-h-screen bg-[#231e1d] text-[#b8b4b0] w-full flex flex-col font-[Alegreya]">
                    <Title title={`${user.Username} Blogs`} />
                <div className="w-full flex lg:flex-row sm:flex-col lg:justify-around sm:justify-normal lg:p-20 sm:p-5">
                        <BlogList BlogsData={Data} />
                        {user ? (
                            <div className="flex gap-4 mt-10 w-fit">
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
        </>
    );
}
