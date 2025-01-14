import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditorComponent from "./Editor";
import { InfinitySpin } from "react-loader-spinner";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function EditForm() {
    const { id } = useParams();
    const [title, settitle] = useState({});
    const [content, setContent] = useState({});
    const [preview, setpreview] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`${backendURL}/Blog/${id}`);
                settitle(response.data.Title);
                setContent(response.data.Content);
                setpreview(response.data.Preview);
            } catch (error) {
                console.error("Error fetching blog data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        settitle("");
        setContent({});
        setpreview("");

        try {
            const response = await axios.post(`${backendURL}/Edit/${id}`, {
                title,
                content,
                preview,
            });

            console.log("Blog Edited Successfully!!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error editing the blog", error);
        }
    };

    return (
        <div className="lg:p-24 sm:p-5 w-[100vw] min-h-screen text-[#b8b4b0]">
            <h1 className="font-[Montserrat] text-2xl text-white uppercase">
                Edit Blog
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
                <div className="mt-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <label
                                htmlFor="Title"
                                className="absolute text-lg top-0 left-0 -mt-3 ml-4 bg-[#231e1d] text-white font-[Montserrat] ]"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="Title"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                className="w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-400 bg-transparent font-[Alegreya] "
                                required
                            />
                        </div>
                        <div className="relative w-full bg-neutral-100 font-[Alegreya] rounded-md flex p-5">
                            <EditorComponent
                                initialData={content}
                                onContentChange={(data) => setContent(data)}
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="Preview"
                                className="absolute text-lg bg-[#231e1d] top-0 left-0 -mt-3 ml-4 text-white font-[Montserrat] font-extralight"
                            >
                                Preview
                            </label>
                            <textarea
                                name="Preview"
                                value={preview}
                                onChange={(e) => setpreview(e.target.value)}
                                className="w-full min-h-[20vh] px-2 py-4  border rounded-md focus:outline-none focus:border-blue-400 bg-transparent font-[Alegreya]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditForm;
