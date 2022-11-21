import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const AuthenticationLayout = lazy(() =>
  import("../layout/AuthenticationLayout")
);
const LoginPage = lazy(() => import("../pages/authentication-pages/LoginPage"));
const AuthenticationRoute = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<AuthenticationLayout></AuthenticationLayout>}
      >
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Route>
    </Routes>
  );
};

export default AuthenticationRoute;