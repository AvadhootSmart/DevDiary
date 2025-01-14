import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function ViewAll() {
    const { user } = useContext(AuthContext);
    const [Data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);

    async function fetchBlogs() {
        setLoading(true);
        try {
            const response = await axios.get(`${backendURL}/${user._id}/blogs`);
            setData(response.data.Blogs);
        } catch (err) {
            console.log("Error in fetching blogs!", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="lg:w-full sm:w-[100vw] min-h-screen lg:p-24 sm:p-5 sm:mb-20 text-[#b8b4b0]">
                <h1 className="font-[Montserrat] text-2xl text-white uppercase">
                    All Blogs
                </h1>
                <hr className="mt-4 border-2 rounded" />
                {loading ? (
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="white"
                        ariaLabel="infinity-spin-loading"
                    />
                ) : (
                    <>
                        {Data.length === 0 && (
                            <h1 className="text-center text-2xl mt-10 font-[Montserrat] whitespace-nowrap">
                                 No blogs available
                            </h1>
                        )}
                        {Data.map((blog) => (
                            <div className="text-lg" key={blog._id}>
                                <h2 className="mt-10">
                                    <span className="font-bold uppercase text-white">Title -</span>{" "}
                                    {blog.Title}
                                </h2>
                                <p className="mt-4">
                                    <span className="font-bold uppercase text-white">
                                        Preview -
                                    </span>
                                    {blog.Preview}
                                </p>
                                <p className="mt-3">
                                    <span className="font-bold uppercase text-white">Date - </span>
                                    {blog.Date}
                                </p>
                                <hr className="mt-2 border-dashed" />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default ViewAll;
