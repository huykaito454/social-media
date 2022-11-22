import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAuthLogin } from "../../actions/authAction";
import logoPrimary from "../../assets/images/logo/logo-black.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { user } = useSelector((state) => state.auth);
  const handleLogin = (values, e) => {
    e.preventDefault();
    dispatch(handleAuthLogin());
    if (user) {
      document.title = "Hilu";
      navigate("/");
    }
  };
  useEffect(() => {
    document.title = "Log in to Hilu";
    if (user) {
      document.title = "Hilu";
      navigate("/");
    }
  }, []);
  return (
    <form
      className="bg-white p-8 rounded-sm shadow-sm flex flex-col gap-2 w-[320px] h-full"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex items-stretch justify-center w-full gap-3 mt-2 mb-8 select-none">
        <img src={logoPrimary} alt="" className="w-8 h-8" />
        <h1 className="text-3xl text-black">Hilu</h1>
      </div>
      <div>
        <input
          className="input text-xs"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-3xs text-red-400 mt-1">
            {" "}
            * {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <input
          className="input text-xs"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-3xs text-red-400"> * {errors.password.message}</p>
        )}
      </div>
      <button
        className="w-full py-2 px-4 bg-secondary mt-2 text-white text-xs rounded-sm"
        type="submit"
        disabled={isSubmitting}
      >
        Log In
      </button>
      <span className="text-xs mt-3">
        Don't have an account?{" "}
        <span className="text-primary cursor-pointer">Sign up</span>
      </span>
      <span className="text-xxs  mt-auto text-gray-300 select-none">
        © 2022 Hilu from Hyu
      </span>
    </form>
  );
};
export default LoginPage;
