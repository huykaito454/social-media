import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authRegister } from "../../../sagas/auth/auth-slice";
import Input from "../../../components/Input";
const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const handleRegister = (values, e) => {
    dispatch(authRegister(values));
  };
  useEffect(() => {
    document.title = "Sign up to Hilu";
    if (auth.user) {
      navigate("/");
    }
    return () => {
      document.title = "Hilu";
    };
  }, [auth]);
  return (
    <form
      className="absolute bg-white p-6 sm:p-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm flex flex-col gap-y-4 items-center min-w-[350px] sm:min-w-[555px]"
      onSubmit={handleSubmit(handleRegister)}
    >
      <span className="text-2xl font-semibold mb-5">Sign Up!</span>
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
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="fullName" className="label">
          Full name
        </label>
        <Input
          type="text"
          placeholder="Nguyen Trong Huy"
          name="fullName"
          control={control}
        ></Input>
        {errors.fullName && (
          <p className="text-xs text-red-400"> * {errors.fullName.message}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <label htmlFor="userName" className="label">
          User Name
        </label>
        <Input
          type="text"
          placeholder="nthuy"
          name="userName"
          control={control}
        ></Input>
        {errors.userName && (
          <p className="text-xs text-red-400"> * {errors.userName.message}</p>
        )}
      </div>
      <div className="relative w-full flex flex-col gap-y-2">
        <label htmlFor="password" className="label">
          Password
        </label>
        <Input
          type={isShowPassword ? "text" : "password"}
          placeholder="Create a password"
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
      <button className="button-auth" type="submit">
        Sign up
      </button>
      <span className="mt-3 text-sm">
        Have an account?{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Log in
        </span>
      </span>
      <span className="text-xs  mt-auto text-gray-300 select-none">
        © 2022 Hilu from Hyu
      </span>
    </form>
  );
};
export default RegisterPage;
const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 characters")
      .matches(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Must have at least 1 character",
      }),
    fullName: yup
      .string()
      .required("Please enter your full name")
      .matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
        {
          message: "Must be only letters",
        }
      ),
    userName: yup
      .string()
      .required("Please enter your user name")
      .min(5, "Your user name must be at least 5 characters"),
  })
  .required();
