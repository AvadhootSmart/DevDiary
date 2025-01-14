import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlogContent({ content }) {
    const { Title, Content, Date: uploadDate } = content;
    const [FDate, setFDate] = useState(uploadDate);

    function formatDate() {
        const blogDate = new Date(uploadDate);
        const formattedDate = blogDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        setFDate(formattedDate);
    }

    useEffect(() => {
        if (content) {
            formatDate();
            console.log(Content);
        }
    }, [content]);

    return (
        <>
            <div className="lg:w-[45%]">
                <p className="text-[#737170] text-l">{FDate}</p>
                <p className="text-2xl my-2 underline">{Title}</p>
                <div className="content my-10 space-y-4">
                    {Content &&
                        Content?.blocks?.map((block) => {
                            switch (block.type) {
                                case "header":
                                    return (
                                        <h1
                                            key={block.id}
                                            className={`text-${block.data.level}xl font-bold`}
                                        >
                                            {block.data.text}
                                        </h1>
                                    );
                                case "paragraph":
                                    return <p key={block.id}>{block.data.text}</p>;
                                // case "list":
                                //     return (
                                //         <ul
                                //             key={block.id}
                                //             className={
                                //                 block.data.style === "ordered"
                                //                     ? "list-decimal"
                                //                     : "list-disc"
                                //             }
                                //         >
                                //             {block.data.items.map((item, idx) => (
                                //                 <li key={idx}>{item}</li>
                                //             ))}
                                //         </ul>
                                //     );
                                case "table":
                                    return (
                                        <table
                                            key={block.id}
                                            className="table-auto border-collapse border border-gray-300 my-4"
                                        >
                                            <tbody>
                                                {block.data.content.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td
                                                                key={cellIndex}
                                                                className="border border-gray-300 px-2 py-1"
                                                            >
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                // case "quote":
                                //     return (
                                //         <blockquote
                                //             key={block.id}
                                //             className="border-l-4 border-gray-400 pl-4 italic my-4"
                                //         >
                                //             {block.data.text}
                                //             <footer className="text-sm text-gray-500">
                                //                 {block.data.caption}
                                //             </footer>
                                //         </blockquote>
                                //     );
                                case "code":
                                    return (
                                        <pre
                                            key={block.id}
                                            className="bg-gray-900 text-white p-4 rounded-lg my-4 "
                                        >
                                            <code>{block.data.code}</code>
                                        </pre>
                                    );
                                case "delimiter":
                                    return <hr key={block.id} className="my-4 border-gray-300" />;
                                default:
                                    return null;
                            }
                        })}
                </div>
                <Link to={`/`} className="text-white underline italic">
                    Go Back
                </Link>
            </div>
        </>
    );
}

export default BlogContent;
