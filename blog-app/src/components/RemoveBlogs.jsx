import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function RemoveBlogs() {
  const { user } = useContext(AuthContext);
  const [Data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);

  async function DeleteBlog(id) {
    try {
      await axios.delete(`${backendURL}/Editor/RemoveBlog/${id}`);
      setData((prevData) => prevData.filter((blog) => blog._id !== id));
      toast.success("Blog Deleted Successfully!!");
    } catch (err) {
      toast.error("Something went wrong, try again later");
      console.log("Error deleting the blog", err);
    }
  }

  async function fetchBlogs() {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/${user._id}/blogs`);
      setData(response.data.Blogs);
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="lg:p-24 sm:p-5 w-[100vw] min-h-screen text-[#b8b4b0]">
      <h1 className="font-[Montserrat] text-2xl text-white uppercase">
        Remove Blog
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
                  Title-{" "}
                  <span className="text-[#b8b4b0] normal-case">
                    {blog.Title}
                  </span>
                </h2>
                <MdDeleteForever
                  onClick={() => DeleteBlog(blog._id)}
                  className="text-red-700 text-3xl hover:scale-125 transition-all ease-in-out cursor-pointer"
                />
              </div>
              <hr className="mt-2 border-dashed" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default RemoveBlogs;
