import React from "react";
import BlogPrev from "./BlogPrev";

function BlogList({ BlogsData }) {
  if (BlogsData.length == 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-center text-2xl">You have no blogs available</h1>
      </div>
    );
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
