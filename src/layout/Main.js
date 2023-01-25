import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const Main = () => {
  return (
    <div className="px-10">
      <Navbar />
      <Outlet />
    </div>
  );
};
