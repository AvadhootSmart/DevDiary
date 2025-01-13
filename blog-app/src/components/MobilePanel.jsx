import { Link } from "react-router-dom";
import { HiViewList } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MobilePanel = () => {
    return (
        <div className="fixed bottom-0 h-20 w-full bg-black flex gap-10 text-white text-2xl justify-center">
            <Link to="/Editor/ViewAll" className="flex items-center gap-4">
                <HiViewList />
            </Link>
            <Link to="/Editor/AddBlog" className="flex items-center gap-4">
                <IoMdAdd />
            </Link>
            <Link to="/Editor/RemoveBlog" className="flex items-center gap-4">
                <MdDeleteForever />
            </Link>
            <Link to="/Editor/EditBlog" className="flex items-center gap-4">
                <MdEdit />
            </Link>
            <Link to="/" className="flex items-center gap-4">
                <FaHome />
            </Link>
        </div>
    );
};

export default MobilePanel;
