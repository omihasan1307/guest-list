import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { auth } from "../firebase.init";
import profile from "../img/profile.webp";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="grid grid-cols-5 ">
      <div className="custom-bg col-span-1 bg-slate-900 p-5 text-white">
        <div className="rounded-full overflow-hidden w-3/6 mx-auto">
          <img src={profile} alt="" />
        </div>
        <h1 className="text-center text-2xl font-bold my-2">
          {loading ? <p></p> : user?.displayName}
        </h1>
        <hr className="mb-3" />
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "bg-purple-800 py-2 hover:bg-purple-800 hover:shadow-md"
              : "bg-gray-600 py-2 hover:bg-purple-800 hover:shadow-md"
          }
        >
          <button className="w-full my-3">Profile</button>
        </NavLink>

        <NavLink
          to="inviteGuest"
          className={({ isActive }) =>
            isActive
              ? "bg-purple-800 py-2  hover:bg-purple-800 hover:shadow-md"
              : "bg-gray-600 py-2 hover:bg-purple-800 hover:shadow-md"
          }
        >
          <button className="w-full my-3">Invite Guest</button>
        </NavLink>
        <NavLink
          to="entryGuest"
          className={({ isActive }) =>
            isActive
              ? "bg-purple-800 py-2 hover:bg-purple-800 hover:shadow-md"
              : "bg-gray-600 py-2 hover:bg-purple-800 hover:shadow-md"
          }
        >
          <button className="w-full my-3">Entry Guest</button>
        </NavLink>
        <NavLink
          to="cost"
          className={({ isActive }) =>
            isActive
              ? "bg-purple-800 py-2 hover:bg-purple-800 hover:shadow-md"
              : "bg-gray-600 py-2 hover:bg-purple-800 hover:shadow-md"
          }
        >
          <button className="w-full my-3">Cost</button>
        </NavLink>

        {/* <button className='bg-gray-600 w-full p-2 my-3 hover:bg-purple-800 hover:shadow-xl'>Log Out</button> */}
      </div>
      <div className="custom-bg col-span-4 bg-gray-300 p-8 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
