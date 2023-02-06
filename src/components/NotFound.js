import React from "react";
import notFound from "../img/404.gif";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center notFound">
      <img src={notFound} alt="" />
    </div>
  );
};

export default NotFound;
