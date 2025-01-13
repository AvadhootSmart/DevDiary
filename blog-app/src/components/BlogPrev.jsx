import React, { useState, useEffect } from "react";
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
      <div>
        <p className="text-[#737170] text-l">{FDate}</p>
        <p className="text-2xl my-2 line-clamp-2 w-full">{Title}</p>
        <p className="my-6 line-clamp-5">{Preview}</p>

        <Link to={`/Blog/${_id}`} className="text-[#737170] italic">
          Read more
        </Link>
      </div>
    </>
  );
}

export default BlogPrev;
