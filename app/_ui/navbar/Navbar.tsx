"use client";
import React from "react";
import Search from "./Search";
import MainNav from "./MainNav";

export default function Navbar() {
  return (
    <div className="z-40">
      <Search />
      <MainNav />
    </div>
  );
}
