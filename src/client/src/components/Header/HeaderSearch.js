import React from "react";
import imageLogo from "../../assets/images/logo/logo-primary.png";
const HeaderSearch = () => {
  return (
    <div className="flex items-center gap-2 w-[25%] justify-start">
      <img
        src={imageLogo}
        alt="logo"
        className="isolate w-10 cursor-pointer"
      ></img>
      <div className="relative w-[240px]">
        <input
          type="text"
          className="outline-none py-2 px-3 pl-9 rounded-3xl bg-[#f0f2f5] border border-[#f0f2f5] w-full text-sm"
          placeholder="Search on Hilu"
        />
        <svg
          className="w-5 h-5 text-slate-500 absolute top-[25%] left-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeaderSearch;
