import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../firebase.init";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <div className="flex justify-between  ">
        <h1 className="text-2xl ">
          Hello,{" "}
          <span className="text-purple-800 font-semibold ">
            {!loading && user?.displayName}
          </span>
        </h1>
        <div className="text-xl">
          <NavLink
            to="info"
            className={({ isActive }) =>
              isActive ? "text-purple-800" : "text-slate-800"
            }
          >
            <button className="mx-2">Information</button>
          </NavLink>
          <NavLink
            to="pictures"
            className={({ isActive }) =>
              isActive ? "text-purple-800 " : "text-slate-800 "
            }
          >
            <button className="mx-2">Picture</button>
          </NavLink>

          <button className="mx-2 hover:text-rose-600">Log Out</button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
