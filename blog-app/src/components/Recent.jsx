import React from "react";

function Recent({ list }) {
  return (
    <>
      <div className="mt-14">
        <h1 className="uppercase text-xl">Recent Posts</h1>
        <div className="flex flex-col mt-5 gap-1">
          <li className="list-none underline text-l">Title</li>
        </div>
      </div>
    </>
  );
}

export default Recent;
