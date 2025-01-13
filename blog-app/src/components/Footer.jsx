import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="flex z-10 flex-col">
                <div className="copyright flex justify-between items-center lg:px-10 sm:px-5 h-[10vh] bg-[#111117] text-white">
                    <p className="sm:text-sm">
                        DevDiary&copy; 2023, All rights reserved{" "}
                    </p>
                    <Link to="https://github.com/AvadhootSmart/Av_Blog-App_FS">
                        <FaGithub className="lg:text-3xl sm:text-lg hover:scale-110 transition" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Footer;
