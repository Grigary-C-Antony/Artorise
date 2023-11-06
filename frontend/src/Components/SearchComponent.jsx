import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchComponent() {
  return (
    <div
      style={{ backgroundColor: "#33343D" }}
      className="h-2/3 w-full flex flex-col items-center justify-around p-2"
    >
      <div className="w-1/2 h-2/5 flex rounded-full justify-between pl-5 items-center bg-white bg-opacity-10">
        <input
          className="w-full mx-2 bg-transparent text-white outline-none h-full border-0 "
          placeholder="Search"
        />
        <AiOutlineSearch
          size={30}
          color="#fff"
          className="mx-4 cursor-pointer"
        />
      </div>
      <div className="flex">
        {["aigenerated", "grigary", "digitalart"]?.map((item, key) => {
          return (
            <div
              className="px-4 p-2 rounded-full bg-opacity-5 mx-2 text-white text-xs"
              style={{ backgroundColor: "#26272F" }}
              key={key}
            >
              #{item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchComponent;
