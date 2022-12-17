import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authLogin } from "../../../sagas/auth/auth-slice";
import Input from "../../../components/Input";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { user } = useSelector((state) => state.auth);
  const handleLogin = (values, e) => {
    e.preventDefault();
    dispatch(authLogin(values));
  };
  useEffect(() => {
    document.title = "Log in to Hilu";
    if (user) {
      navigate("/");
    }
    return () => {
      document.title = "Hilu";
    };
  }, [user]);

  return (
    <form
      className="absolute bg-white p-6 sm:p-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm flex flex-col gap-y-4 items-center min-w-[350px] sm:min-w-[555px]"
      onSubmit={handleSubmit(handleLogin)}
    >
      <span className="text-2xl font-semibold mb-5">Welcome Back!</span>
      <p className="text-sm text-text2 mb-3">Sign in with email</p>
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          name="email"
          control={control}
        ></Input>
        {errors.email && (
          <p className="text-xs text-red-400 mt-1"> * {errors.email.message}</p>
        )}
      </div>
      <div className="relative w-full flex flex-col gap-y-2">
        <label htmlFor="password" className="label">
          Password
        </label>
        <Input
          type={isShowPassword ? "text" : "password"}
          placeholder="Enter Password"
          name="password"
          control={control}
        ></Input>
        {isShowPassword ? (
          <i
            className="fas fa-eye cursor-pointer text-sm text-gray-500 absolute top-[58%] right-6"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        ) : (
          <i
            className="fas fa-eye-slash cursor-pointer text-sm text-gray-500 absolute top-[58%] right-6"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        )}
        {errors.password && (
          <p className="text-xs text-red-400"> * {errors.password.message}</p>
        )}
      </div>
      <span className="text-primary2 w-full text-end cursor-pointer text-sm">
        Forgot password
      </span>
      <button className="button-auth" type="submit">
        Log In
      </button>
      <span className="text-sm mt-3">
        Don't have an account?{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </span>
      </span>
      <span className="text-xs mt-auto text-gray-300 select-none">
        © 2022 Hilu from Hyu
      </span>
    </form>
  );
};
export default LoginPage;
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .matches(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Must have at least 1 character",
      })
      .required("Please enter your password"),
  })
  .required();
