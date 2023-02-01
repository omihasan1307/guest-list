import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { auth } from "../firebase.init";

const RequiredAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading flex justify-center items-center">
        <DotLoader color="#3b82f6" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default RequiredAuth;
