"use client";
import React from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import { useWindowWidth } from "@/lib/useWindowWidth";

export default function Search() {
  const width = useWindowWidth();
  return (
    <div className="navbar flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4 bg-white">
      <Logo />
      {width > 640 ? <SearchInput /> : null}
    </div>
  );
}
