import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlogContent({ content }) {
  const { Title, Description, Date: uploadDate } = content;
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
      <div className="lg:w-[45%]">
        <p className="text-[#737170] text-l">{FDate}</p>
        <p className="text-2xl my-2">{Title}</p>
        <p className="my-6">{Description}</p>

        <Link to={`/`} className="text-white underline italic">
          Go Back
        </Link>
      </div>
    </>
  );
}

export default BlogContent;
