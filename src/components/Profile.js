import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet } from "react-router-dom";
import { auth } from "../firebase.init";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  return (
    <div>
      <div className="mx-6">
        <div className="navbar">
          <div className="navbar-start w-full">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="info">Information</Link>
                </li>

                <li>
                  <Link to="pictures">Picture</Link>
                </li>
                <li>
                  <button>Sign Out</button>
                </li>
              </ul>
            </div>
            <h1 className="text-xl">
              Welcome,{" "}
              {!loading && (
                <span className="font-bold text-cyan-600">
                  {user?.displayName}
                </span>
              )}
            </h1>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal">
              <Link to="info">Information</Link>
              <Link to="pictures" className="px-4">
                Picture
              </Link>
              <button
                onClick={() => signOut()}
                className=" hover:text-rose-600 duration-300 hover:-translate-x-1 hover:duration-300"
              >
                Sign Out <FontAwesomeIcon icon={faSignOut} />
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
