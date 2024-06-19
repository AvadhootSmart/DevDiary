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
    }),
      gsap.fromTo(
        ".Left",
        {
          duration: 0.8,
          x: -200,
        },
        { x: 0 }
      ),
      gsap.fromTo(
        ".Right",
        {
          x: 200,
        },
        {
          x: 0,
          duration: 0.8,
        }
      );
  });
  return (
    <>
      <div className="flex justify-around text-[#b8b4b0] w-full mt-[20vh] items-center">
        <div className="Left">
          <Line />
        </div>
        <h2 className="Heading text-4xl font-[Alegreya] uppercase">Av Blogs</h2>
        <div className="Right">
          <Line />
        </div>
      </div>
    </>
  );
}

export default Title;
