import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogOut } from "../../../sagas/auth/auth-slice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authLogOut());
    navigate("/login");
  };
  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default HomePage;
