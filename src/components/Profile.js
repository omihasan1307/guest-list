import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div className=" grid grid-cols-2 gap-2 text-white rounded">
        <NavLink
          to="info"
          className={({ isActive }) =>
            isActive ? "bg-purple-800 " : "bg-slate-800 "
          }
        >
          <button className="w-full my-3 rounded">Information</button>
        </NavLink>
        <NavLink
          to="pictures"
          className={({ isActive }) =>
            isActive ? "bg-purple-800 " : "bg-slate-800 "
          }
        >
          <button className="w-full my-3 rounded">Picture</button>
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
