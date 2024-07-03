import React from "react";
import BlogPrev from "./BlogPrev";

function BlogList({ BlogsData }) {
    if (!BlogsData) {
        return <h1>No blogs available</h1>;
    }
    return (
        <>
            <div className="flex text-[#b8b4b0] w-[45%]  flex-col gap-10">
                {BlogsData.map((Blog) => (
                    <BlogPrev key={Blog._id} Blogs={Blog} />
                ))}
            </div>
        </>
    );
}

export default BlogList;
