import React from "react";
import { Outlet } from "react-router-dom";
const AuthenticationLayout = () => {
  return (
    <div className="bg-bgGray w-full h-screen relative">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthenticationLayout;
