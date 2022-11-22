import React, { useEffect } from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

const UserLayout = lazy(() => import("../layout/UserLayout"));
const HomePage = lazy(() => import("../pages/user-pages/HomePage"));
const UserRouter = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <Routes>
      <Route path="/" element={<UserLayout></UserLayout>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
