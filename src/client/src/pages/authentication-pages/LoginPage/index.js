import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoPrimary from "../../../assets/images/logo/logo-black.png";
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
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { user } = useSelector((state) => state.auth);
  const handleLogin = (values, e) => {
    e.preventDefault();
    dispatch(authLogin(values));
  };
  useEffect(() => {
    document.title = "Log in to Hilu";
    if (user) {
      document.title = "Hilu";
      navigate("/");
    }
  }, [user]);

  return (
    <form
      className="bg-white p-8 rounded-sm shadow-sm flex flex-col gap-2 w-[350px] h-full"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex items-stretch justify-center w-full gap-3 mt-2 mb-8 select-none">
        <img src={logoPrimary} alt="" className="w-10 h-10" />
        <h1 className="text-4xl text-black">Hilu</h1>
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          control={control}
        ></Input>
        {errors.email && (
          <p className="text-xs text-red-400 mt-1"> * {errors.email.message}</p>
        )}
      </div>
      <div className="relative">
        <Input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          control={control}
        ></Input>
        {isShowPassword ? (
          <i
            className="fas fa-eye cursor-pointer text-sm text-gray-500 absolute top-1/4 right-3"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        ) : (
          <i
            className="fas fa-eye-slash cursor-pointer text-sm text-gray-500 absolute top-1/4 right-3"
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        )}
        {errors.password && (
          <p className="text-xs text-red-400"> * {errors.password.message}</p>
        )}
      </div>
      <button className="button" type="submit">
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
      <span className="text-xxs  mt-auto text-gray-300 select-none">
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
