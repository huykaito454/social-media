import React from "react";
import { NavLink } from "react-router-dom";
const HeaderNav = ({ menu }) => {
  return (
    <div className="flex items-center justify-center gap-2 w-[50%]">
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            isActive
              ? "text-primary py-1 px-10 f-center"
              : " text-slate-500 py-1 px-12 f-center rounded-md hover:bg-grayCardHover transition-all"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <span className="material-symbols-rounded text-3xl cursor-pointer">
                {item.icon}
              </span>
            ) : (
              <span className="material-symbols-outlined text-3xl cursor-pointer">
                {item.icon}
              </span>
            )
          }
        </NavLink>
      ))}
    </div>
  );
};

export default HeaderNav;
