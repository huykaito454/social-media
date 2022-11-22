import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoPrimary from "../../assets/images/logo/logo-black.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { handleAuthRegister } from "../../actions/authAction";
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
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const handleRegister = (values, e) => {
    dispatch(handleAuthRegister(values));
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
      className="bg-white p-8 rounded-sm shadow-sm flex flex-col gap-2 w-[320px] h-full"
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
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-3xs text-red-400"> * {errors.fullName.message}</p>
        )}
      </div>
      <div>
        <input
          className="input text-xs"
          type="text"
          placeholder="User Name"
          {...register("userName")}
        />
        {errors.userName && (
          <p className="text-3xs text-red-400"> * {errors.userName.message}</p>
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
      <button className="button" type="submit" disabled={isSubmitting}>
        Sign up
      </button>
      <span className="text-xs mt-3">
        Have an account?{" "}
        <span className="text-primary cursor-pointer">Log in</span>
      </span>
      <span className="text-xxs  mt-auto text-gray-300 select-none">
        © 2022 Hilu from Hyu
      </span>
    </form>
  );
};
export default RegisterPage;
