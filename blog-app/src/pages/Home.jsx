import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import BlogList from "../components/BlogList";
import axios from "axios";
import Auth from "../components/Auth";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Home() {
    const [Data, setData] = useState([{}]);

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const response = await axios.get(`${backendURL}/blogs`, {
                    withCredentials: true,
                });
                setData(response.data);
            } catch (err) {
                console.log("Error fetching blogs", err);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [user]);

    return (
        <>
            <div className="min-h-screen bg-[#231e1d] text-[#b8b4b0]  w-full flex flex-col font-[Alegreya]">
                <Title title="Dev Diary" />
                <div className="Content w-full flex lg:flex-row sm:flex-col lg:justify-around sm:justify-normal lg:p-20 sm:p-5">
                    {loading ? (
                        <InfinitySpin
                            visible={true}
                            width="200"
                            color="white"
                            ariaLabel="infinity-spin-loading"
                        />
                    ) : (
                        <BlogList BlogsData={Data} />
                    )}
                    <div className="Content flex flex-col ">
                        {/* <About /> */}
                        {user ? (
                            <div className="flex gap-4 mt-10">
                                <div className="border-2 border-white rounded-md w-fit p-4">
                                    <Link to={"/Profile"}>Profile</Link>
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

export default Home;
