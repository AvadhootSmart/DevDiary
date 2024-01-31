import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Recent from "./Recent";
import Line from "./Line";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex z-10 flex-col">
        <div className="copyright flex justify-between items-center px-10 h-[10vh] bg-[#111117] text-white">
          <p>Copyright&copy; 2023, All rights reserved </p>
          <FaGithub className="text-3xl" />
          <Link to="/Admin/ViewAll">Manage Blogs[Admins Only]</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
