import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
const UserLayout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
export default UserLayout;
