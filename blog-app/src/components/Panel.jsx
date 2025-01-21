imaaport React from "react";
import { Link } from "react-router-dom";

import { HiViewList } from "react-icons/hi";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { MdEdit, MdOutlineFormatColorFill } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Panel() {
    return (
        <>
            <div className="lg:w-[20vw] z-0 h-screen fixed bg-[#111117] text-white">
                <div className="p-10 text-xl uppercase font-[Montserrat] font-light">
                    Admin Panel
                    <div className="mt-14 text-lg">
                        <Link to="/Editor/ViewAll" className="flex items-center gap-4">
                            <HiViewList /> View All
                        </Link>
                    </div>
                    <div className="mt-14 text-lg">
                        <Link to="/Editor/AddBlog" className="flex items-center gap-4">
                            <IoMdAdd /> Create Blog
                        </Link>
                    </div>
                    <div className="mt-14 text-lg">
                        <Link to="/Editor/RemoveBlog" className="flex items-center gap-4">
                            <MdDeleteForever /> Delete Blog
                        </Link>
                    </div>
                    <div className="mt-14 text-lg">
                        <Link to="/Editor/EditBlog" className="flex items-center gap-4">
                            <MdEdit /> Edit Blog
                        </Link>
                    </div>
                    <div className="mt-14 text-lg">
                        <Link to="/" className="flex items-center gap-4">
                            <FaHome /> Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Panel;
