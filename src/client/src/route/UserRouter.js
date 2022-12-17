import React, { useEffect } from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

const UserLayout = lazy(() => import("../layout/UserLayout"));
const HomePage = lazy(() => import("../pages/user-pages/HomePage"));
const ProfilePage = lazy(() => import("../pages/user-pages/ProfilePage"));
const UserRouter = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    document.title = "Hilu";
  }, [user]);
  return (
    <Routes>
      <Route path="/" element={<UserLayout></UserLayout>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/profile/:id"
          element={<ProfilePage></ProfilePage>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default UserRouter;
