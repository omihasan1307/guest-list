import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faUser,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../img/logo.png";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  const isActiveColor = "text-violet-800 font-bold";
  const isNotActiveColor = "text-zinc-100";

  return (
    <div className="grid lg:grid-cols-5">
      <div className="custom-bg lg:col-span-1 bg-gradient-to-b from-cyan-500 to-blue-500 p-5 text-white">
        <div className="grid grid-cols-1 content-between nested-custom-bg">
          <div>
            <div className="rounded-full overflow-hidden w-24 mx-auto">
              {!loading && <img src={user?.photoURL} alt="" />}
            </div>
            <h1 className="text-center text-2xl font-bold my-2">
              {loading ? <p></p> : user?.displayName}
            </h1>
            <hr className="mb-3" />
            <NavLink
              to="profile/info"
              className={({ isActive }) =>
                isActive ? isActiveColor : isNotActiveColor
              }
            >
              <div className="px-5 text-xl my-3">
                <FontAwesomeIcon icon={faUser} className="mr-3" />{" "}
                <span>Profile</span>
              </div>
            </NavLink>

            <NavLink
              to="inviteGuest"
              className={({ isActive }) =>
                isActive ? isActiveColor : isNotActiveColor
              }
            >
              <div className="px-5 text-xl my-3">
                <FontAwesomeIcon icon={faList} className="mr-3" />{" "}
                <span>Invite Guest</span>
              </div>
            </NavLink>
            <NavLink
              to="entryGuest"
              className={({ isActive }) =>
                isActive ? isActiveColor : isNotActiveColor
              }
            >
              <div className="px-5 text-xl my-3">
                <FontAwesomeIcon icon={faUserGroup} className="mr-3" />{" "}
                <span>Entry Guest</span>
              </div>
            </NavLink>
            <NavLink
              to="cost"
              className={({ isActive }) =>
                isActive ? isActiveColor : isNotActiveColor
              }
            >
              <div className="px-5 text-xl my-3">
                <FontAwesomeIcon icon={faWallet} className="mr-3" />{" "}
                <span>Cost</span>
              </div>
            </NavLink>
          </div>
          <div className="hidden lg:block">
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
      <div className="custom-bg lg:col-span-4 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
