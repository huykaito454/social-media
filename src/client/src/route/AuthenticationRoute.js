import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const AuthenticationLayout = lazy(() =>
  import("../layout/AuthenticationLayout")
);
const LoginPage = lazy(() => import("../pages/authentication-pages/LoginPage"));
const RegisterPage = lazy(() =>
  import("../pages/authentication-pages/RegisterPage")
);
const AuthenticationRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout></AuthenticationLayout>}>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Route>
    </Routes>
  );
};

export default AuthenticationRoute;
