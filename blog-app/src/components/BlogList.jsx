import BlogPrev from "./BlogPrev";

function BlogList({ BlogsData }) {
    if (BlogsData.length == 0) {
        return (
            <div className="flex lg:w-[45%] sm:w-full lg:justify-center sm:justify-normal">
                <h1 className="text-center text-2xl">You have no blogs available..</h1>
            </div>
        );
    }
    return (
        <>
            <div className="flex text-[#b8b4b0] lg:w-[45%] sm:w-full flex-col gap-10">
                {BlogsData.map((Blog) => (
                    <BlogPrev key={Blog._id} Blogs={Blog} />
                ))}
            </div>
        </>
    );
}

export default BlogList;
