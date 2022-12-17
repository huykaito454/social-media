import React from "react";
import { Dropdown, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogOut } from "../../sagas/auth/auth-slice";

const HeaderMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authLogOut());
    navigate("/");
  };
  const handleNavigateProfile = () => {
    navigate(`/profile/${user.id}`);
  };
  return (
    <div className="flex items-center justify-end gap-2 w-[25%]">
      <div className=" bg-grayCard isolate w-10 h-10 cursor-pointer border border-grayCard rounded-full transition-all f-center hover:bg-gray-300 active:scale-95">
        <i className="fab fa-facebook-messenger text-lg"></i>
      </div>
      <div className=" bg-grayCard isolate w-10 h-10 cursor-pointer border border-grayCard rounded-full transition-all f-center hover:bg-gray-300 active:scale-95">
        <i className="fas fa-heart text-lg"></i>
      </div>
      <Dropdown
        label={
          <div className="border w-10 h-10 border-grayCard bg-white  rounded-full f-center overflow-hidden">
            <img src={user.avatar} className="w-full object-cover"></img>
          </div>
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Item
          className="hover:bg-grayCardHover cursor-pointer transition-all px-2 rounded-lg mx-2"
          onClick={() => {
            handleNavigateProfile();
          }}
        >
          <div className="cursor-pointer">
            <div className="f-center gap-2">
              <Avatar
                alt="User settings"
                size="sm"
                img={user.avatar}
                rounded={true}
              />
              <span className="font-medium">{user.fullName}</span>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleLogout();
          }}
        >
          <HeaderMenuItem icon={"logout"} text={"Sign out"}></HeaderMenuItem>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const HeaderMenuItem = ({ icon, text }) => {
  return (
    <div className="f-center gap-4 px-2 rounded-lg">
      <div className=" bg-grayCard isolate w-9 h-9 cursor-pointer border border-grayCard rounded-full transition-all f-center">
        <span className="material-symbols-rounded text-lg">{icon}</span>
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default HeaderMenu;
