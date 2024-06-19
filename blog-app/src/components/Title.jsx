import React from "react";
import Line from "./Line";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function Title() {
  useGSAP(() => {
    gsap.from(".Heading", {
      duration: 0.9,
      opacity: 0,
      y: 100,
    });
  });
  return (
    <>
      <div className="flex justify-around text-[#b8b4b0] w-full mt-[20vh] items-center">
        <Line />
        <h2 className="Heading text-4xl font-[Alegreya] uppercase">Av Blogs</h2>
        <Line />
      </div>
    </>
  );
}

export default Title;
