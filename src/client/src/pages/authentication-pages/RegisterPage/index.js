import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoPrimary from "../../../assets/images/logo/logo-black.png";
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
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const handleRegister = (values, e) => {
    dispatch(authRegister(values));
  };
  useEffect(() => {
    document.title = "Sign up to Hilu";
    if (auth.user || auth.status == 200) {
      document.title = "Hilu";
      navigate("/login");
    }
  }, [auth]);
  return (
    <form
      className="bg-white p-8 rounded-sm shadow-sm flex flex-col gap-2 w-[350px] h-full"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div className="flex items-center justify-center w-full mt-2 mb-2 select-none">
        <div className="w-full flex items-stretch justify-center gap-2">
          <img src={logoPrimary} alt="" className="w-8 h-8" />
          <h1 className="text-3xl text-black">Hilu</h1>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <span className="text-xs text-textGray">
          Sign up to connect with the group for you.
        </span>
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
      <div>
        <Input
          type="text"
          placeholder="Full Name"
          name="fullName"
          control={control}
        ></Input>
        {errors.fullName && (
          <p className="text-xs text-red-400"> * {errors.fullName.message}</p>
        )}
      </div>
      <div>
        <Input
          type="text"
          placeholder="User Name"
          name="userName"
          control={control}
        ></Input>
        {errors.userName && (
          <p className="text-xs text-red-400"> * {errors.userName.message}</p>
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
        Sign up
      </button>
      <span className="mt-3 text-sm">
        Have an account?{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </span>
      </span>
      <span className="text-xxs  mt-auto text-gray-300 select-none">
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
