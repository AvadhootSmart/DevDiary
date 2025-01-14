import { Link } from "react-router-dom";
import { HiViewList } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MobilePanel = () => {
    return (
        <div className="fixed bottom-0 z-50 h-20 w-full sm:bg-[#231e1d] lg:bg-neutral-900 sm:border-t flex gap-10 sm:gap-12 text-white text-2xl justify-center">
            <Link to="/Editor/ViewAll" className="flex items-center gap-4">
                <HiViewList />
            </Link>
            <Link to="/Editor/AddBlog" className="flex items-center gap-4">
                <IoMdAdd />
            </Link>
            <Link to="/" className="flex items-center gap-4">
                <FaHome />
            </Link>
            <Link to="/Editor/EditBlog" className="flex items-center gap-4">
                <MdEdit />
            </Link>
            <Link to="/Editor/RemoveBlog" className="flex items-center gap-4">
                <MdDeleteForever />
            </Link>
        </div>
    );
};

export default MobilePanel;
