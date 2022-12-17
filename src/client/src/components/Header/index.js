import React from "react";
import { useSelector } from "react-redux";
import HeaderMenu from "./HeaderMenu";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { menu } from "./menu-data";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const menuNav = menu;
  return (
    <div className="w-full fixed top-0 bg-white py-2 px-3 flex items-center justify-between shadow">
      <HeaderSearch></HeaderSearch>
      <HeaderNav menu={menuNav}></HeaderNav>
      <HeaderMenu user={user}></HeaderMenu>
    </div>
  );
};

export default Header;
