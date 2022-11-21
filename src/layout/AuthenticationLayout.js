import React from "react";
import { Outlet } from "react-router-dom";
const AuthenticationLayout = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default AuthenticationLayout;
