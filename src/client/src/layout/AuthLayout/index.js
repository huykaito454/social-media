import React from "react";
import { Outlet } from "react-router-dom";
import imageAuth from "../../assets/images/logo-auth.png";
const AuthenticationLayout = () => {
  return (
    <div className="bg-primary2 w-full h-screen relative">
      <div className="absolute top-0 right-1/3 translate-x-1/2 w-[500px]">
        <img src={imageAuth} alt="" />
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthenticationLayout;
