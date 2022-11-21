import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthLogin } from "../../actions/authAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleLogin = () => {
    dispatch(handleAuthLogin());
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <span>{JSON.stringify(user)}</span>
    </div>
  );
};

export default LoginPage;
