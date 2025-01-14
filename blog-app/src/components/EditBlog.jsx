import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function EditBlog() {
    const { user } = useContext(AuthContext);
    const [Data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            const response = await axios.get(`${backendURL}/${user._id}/blogs`);
            setData(response.data.Blogs);
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    return (
        <>
        <div className="lg:p-24 sm:p-5 w-[100vw] min-h-screen text-[#b8b4b0]">
                <h1 className="font-[Montserrat] text-2xl text-white uppercase">
                    Edit Blogs
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
                                <div className="mt-10 flex justify-between items-center">
                                    <h2 className="font-bold uppercase text-white truncate">
                                        Title - {' '}
                                        <span className="text-[#b8b4b0] normal-case">
                                            {blog.Title}
                                        </span>
                                    </h2>
                                    <Link to={`Edit/${blog._id}`}>
                                        <MdEdit className="text-blue-700 text-3xl hover:scale-125 transition-all ease-in-out cursor-pointer" />
                                    </Link>
                                </div>
                                <hr className="mt-2 border-dashed" />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default EditBlog;
