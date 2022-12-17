import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const AuthenticationLayout = lazy(() => import("../layout/AuthLayout"));
const LoginPage = lazy(() => import("../pages/authentication-pages/LoginPage"));
const RegisterPage = lazy(() =>
  import("../pages/authentication-pages/RegisterPage")
);
const AuthenticationRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AuthenticationRoute;
