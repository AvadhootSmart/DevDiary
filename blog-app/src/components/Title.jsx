import React from "react";
import Line from "./Line";
function Title() {
  return (
    <>
      <div className="flex justify-around text-[#b8b4b0] w-full mt-[20vh] items-center">
        <Line />
        <h2 className="text-4xl font-[Alegreya] uppercase">Av Blogs</h2>
        <Line />
      </div>
    </>
  );
}

export default Title;
