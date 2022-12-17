import React from "react";
import { Outlet } from "react-router-dom";
import imageAuth from "../../assets/images/Ellipse.png";
import imageLogo from "../../assets/images/logo/logo-primary.png";

const AuthenticationLayout = () => {
  return (
    <div className="w-full h-[100vh] relative overflow-hidden select-non">
      <img
        src={imageAuth}
        alt="bg"
        className="pointer-events-none absolute bottom-[-100px] left-0 right-0 isolate"
      ></img>
      <img
        src={imageLogo}
        alt="logo"
        className="absolute top-0 left-0 isolate w-10 mt-2 ml-3 cursor-pointer"
      ></img>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthenticationLayout;
