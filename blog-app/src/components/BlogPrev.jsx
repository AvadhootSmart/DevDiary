import React, { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

function BlogPrev({ Blogs }) {
    const { Title, Preview, Date: uploadDate, _id, User } = Blogs;
    const [FDate, setFDate] = useState(uploadDate);

    function formatDate() {
        const blogDate = new Date(uploadDate);
        const FomattedDate = blogDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        setFDate(FomattedDate);
    }
    useEffect(() => {
        formatDate();
    }, []);

    return (
        <>
            {console.log(Blogs)}
            {Blogs ? (
                <div className="">
                    <p className="text-[#737170] text-l">{FDate}</p>
                    <p className="text-2xl my-2">{Title}</p>
                    <p className="my-6">{Preview}</p>

                    <Link to={`/Blog/${_id}`} className="text-[#737170] italic">
                        Read more
                    </Link>
                </div>
            ) : (
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="white"
                    ariaLabel="infinity-spin-loading"
                />
            )}
        </>
    );
}

export default BlogPrev;
