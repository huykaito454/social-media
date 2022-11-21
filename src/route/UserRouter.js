import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UserLayout = lazy(() => import("../layout/UserLayout"));
const HomePage = lazy(() => import("../pages/user-pages/HomePage"));
const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout></UserLayout>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
