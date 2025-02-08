import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Outlet />
    </div>
  );
};

export default RootLayout;
